import showErrorToast from "@toasts/error_toast";
import showSucessToast from "@toasts/sucess_toast_deprecated";

/**
 * Função que trata a resposta da requisição 
 * @param req: response da requisição
 * @param message: mensagem de sucesso
 * @returns Objeto de resposta da requisição
*/

export default async function handleError(req: any, message: string) {
    let status = req.status;
    let resp;

    const contentType = req.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        resp = await req.json();
    }
    if (status == 403) {
        showErrorToast("Você não tem permissão para realizar esta ação");
        return
    }
    if (status == 401) {
        location.reload();
        return;
    }
    showBadRequestError(resp, message);
    
}
function showBadRequestError(resp: any, message: string){
    let error = resp.message;
    if (error != undefined) {
        if (error instanceof Array) {
            for (var i = 0; i < error.length; i++) {
                showErrorToast(error[i]);
            }
        } else {
            showErrorToast(error);
        }
    } else {
        showErrorToast(message);
    }
}