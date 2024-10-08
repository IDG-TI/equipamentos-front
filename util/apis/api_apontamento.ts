import { RequestProps } from "@/types";
import { request as api_request } from "./api_util"

function request(requestProps: RequestProps) {
    return api_request("apontamento", requestProps);
}

function updateToken(url: string, data: any, onSuccess: (response: any) => void) {
    return fetch(`api/apontamento`, {
        method: "PUT",
        headers: {
            'x-fetch-url': url
        },
    }).then((req) => {
        if (req.status == 200) {
            return req.text();
        }
        throw new Error("Erro", { cause: req });
    }).then(resp => {
        onSuccess(resp);
    })
}

export default {
    request,
    updateToken
}