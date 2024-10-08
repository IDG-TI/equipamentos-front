import { RequestProps } from "@/types";

import { request as api_request } from "./api_util"


const ApiColaboradores={
    request: (requestProps: RequestProps)=> {
        return api_request("colaboradores", requestProps)
    }
}
export default ApiColaboradores;
