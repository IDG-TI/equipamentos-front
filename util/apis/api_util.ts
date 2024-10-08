import { showLoadingToast, updateLoadingToastToSucess, killLoadingToast } from "@toasts/loading_toasts";
import showSucessToast from "@toasts/sucess_toast";
import { RequestProps } from "@/types";
import handleError from "./handle_error";
/** 
 * Propriedades que podem ser utilizadas na requisição
 * @param path Caminho relativo da requisição
 * @param method Método da requisição (GET, POST, PUT, DELETE, PATCH)
 * @param body Corpo da requisição em formato de objeto
 * @param onSuccess Função que é chamada em caso de sucesso
 * @param onError Função que é chamada em caso de erro
 * @param params Parâmetros que podem ser aplicado na url da requisição
 * @param showToastOnError Mostra um toast em caso de erro, por default é true
 * @param name Mensagem que será mostrada no toast, só é necessário passar um nome simples, pois a função já adiciona a resposta da requisição como Sucesso ou Erro
 * @param downloadResponse Se a resposta da requisição é um arquivo, por default é false
 * @param responseType Tipo da resposta, por default é json
* @returns Promise<any>
 * 
*/


export function request(apiName: string,{
    path,
    method,
    body,
    actionName,
    onSuccess,
    onError,
    params = null,
    showToastOnError = true,
    name = "dados",
    downloadResponse = false,
    sortBy = null,
    disableSuccessToast = false
}: RequestProps): Promise<any> {

    let fetchUrl = path;
    if (params) {
        fetchUrl += `?${Object.entries(params).filter(([_, value]: any) => value != null).map(([key, value]: any, index: number) => `${index === 0 ? "" : "&"}${key}=${encodeURIComponent(value)}`).join('')}`;
    }
    const reqBody: any = {
        method: method,
        headers: {
            'x-fetch-url': fetchUrl,
            'sort-field': sortBy
        },
    }
    if(sortBy){
        reqBody.headers['sort-field'] = sortBy;
    }
    if (body) {
        reqBody.body = JSON.stringify(body)
    }
    let toastID: any = null;
    if (downloadResponse) {
        toastID = showLoadingToast("Exportando " + name);
    }

    return fetch(`/api/${apiName}`, reqBody)
        .then(response => {
            if (response.status == 401) {
                location.reload()
            }
            if (!response.ok) {
                if (showToastOnError) {
                    handleError(response, `Erro ao ${actionName}  ${name}, contate a TI`);
                }
                onError ? onError() : null;
                return false;
            }
            if (downloadResponse) {
                const headers = response.headers.get('Content-Disposition');
                let fileName = `export-${actionName}.txt`;
                if (headers) {
                    fileName = headers.split("filename=")[1];
                }
                return response.blob().then((blob: any) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.download = fileName;
                    a.href = url;
                    a.target = "_blank";
                    a.click();
                    URL.revokeObjectURL(url);
                    updateLoadingToastToSucess(toastID, `${name} exportados`);
                    return true;
                })
            }
            if (method === "DELETE") {
                return true;
            }
            if (method !== "GET" && !disableSuccessToast) {
                showSucessToast(`Sucesso ao ${actionName} ${name}`)
            }
            const responseType = response.headers.get("content-type");
            return getResponseParser(responseType)(response);
        })
        .then(data => {
            if (data) {
                onSuccess ? onSuccess(data) : null;
            }
            else {
                if (downloadResponse) {
                    killLoadingToast(toastID);
                }
            }
        }).catch(_ => {
            onError ? onError() : null;
            return false;
        })
}

/**
 * Retorna um deserializador da response para o tipo desejado
 * @param type tipo da response. Ex: json ou text
 */
export const getResponseParser = (type: string | null) => {
    if (type?.includes("application/json")) {
        return (req: Response) => req.json();
    }
    switch (type) {
        case "application/json":
            return (req: Response) => req.json();
        case "text/plain":
            return (req: Response) => req.text();
        default:
            // return (req: Response)=> req.json();
            return (_: Response) => new Promise(resolve => resolve(true));
    }
}

