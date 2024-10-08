import { RequestProps } from "@/types";

import { request as api_request } from "./api_util"

/** 
 * Operação com a API
 * @param execute Função executada para exibir a informação do colaborador
 * 
 * @returns Promise<any>
 * 
*/

function getData(requestProps: RequestProps) {
    return api_request("funcionarios", requestProps)
}

export default {
    getData
}