import { RequestProps } from "@/types";
import {request as api_request} from "./api_util"

function request(requestProps: RequestProps){
   return  api_request("contrato",requestProps);
}

export default {
    request,
}