import showErrorToast from "./error_toast";
import showSucessToast from "./sucess_toast_deprecated";

/**
 * Função que trata a resposta da requisição 
 * @param req: response da requisição
 * @param message: mensagem de sucesso
 * @returns Objeto de resposta da requisição
*/

export default async function handleReq(req: any, message?: string) {
    let status = req.status;
    let resp;

    const contentType = req.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        resp = await req.json();
    }

    if ((status == 200 || status == 201 || status == 204)) {
        showSucessToast(message ?? "Operação realizada");
        return resp;
    } else if (status == 400 || status == 404) {
        let error = resp.error;
        if (error != undefined) {
            if(error instanceof Array){
                for (var i = 0; i < error.length; i++) {
                    showErrorToast(error[i]);
                }
            }else{
                showErrorToast(error);
            }
        } else {
            showErrorToast("Erro na operação, contate a TI");
        }
    }
    else if (status == 403) {
        showErrorToast("Você não tem permissão para realizar esta ação");
    }
    else if (status == 401) {
        location.reload();
    }
    else {
        showErrorToast("Erro na operação, contate a TI");
    }
}