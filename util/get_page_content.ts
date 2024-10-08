import { PageResponse } from "@/types";

const isValidPageResponse = <T>(response: PageResponse<T>) => response && response.content; 
export default function getPageContent<T>( response: PageResponse<T>){
    return isValidPageResponse<T>(response)? response.content: [];
}