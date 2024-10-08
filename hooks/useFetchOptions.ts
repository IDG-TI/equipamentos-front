import showErrorToast from "@util/toast/error_toast";
import { useEffect, useState } from "react";
import { CompareArrowFunction, ArrowFunction, UseFetchOptionsResult, RequestProps, PageResponse } from "@/types";
import getPageContent from "@util/get_page_content";

/**
 * 
 * @param getData function to load data
 * @param path  endpoint to pass to getData
 * @param loadOnOpen  defines if getData will be called on open of component(useEffect)
 * @param getFromPage  defines if the data will be paginated
 * 
*/

export interface FetchOptions {
    getData: (requestPropos: RequestProps)=> Promise<any>;
    path: string,
    loadOnOpen: boolean,
    order?: CompareArrowFunction,
    name?: string,
    getFromPage?: boolean
}

/**
 * @returns {UseFetchOptionsResult} result An T containing selected option, options list, loading state, and functions for reloading and filtering.
 * @example
 * // Usage example:
 * const { selected, setSelected, options, isLoading, reload, filter } = useFetchOptions(getData, "/api/data", true, (a,b)=>a.name.localeCompare(b.name));
 */

export default function useFetchOptions<T>({
    getData,
    path,
    loadOnOpen,
    order,
    name,
    getFromPage
}: FetchOptions): UseFetchOptionsResult<T>{

    const [options, setOptions] = useState<T[]>([]);
    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [filtredOptions, setFiltredOptions] = useState<T[]>([]);

    async function loadData(newPath: string) {
        setIsLoading(true);

        const onSuccess = (options: PageResponse<T>| T[]) => {
            let data: T[] = options as T[];
            if(getFromPage){
                data = getPageContent<T>(options as PageResponse<T>);
            }
            data = order ? data.sort(order) : data;
            setOptions(data);
            setFiltredOptions(data);
            console.log("onSuccess / setFiltredOptions chamado para o path", newPath, "foram setados", data.length, "itens, sendo eles", data);
            setIsLoading(false);
        };

        getData({
            path: newPath ?? path,
            method: "GET",
            actionName: "Listar",
            name,
            onSuccess,
            onError: () => {
                setIsLoading(false)
            },
        })
    }

    useEffect(() => {
        if (loadOnOpen) {
            loadData(path);
        }
    }, [loadOnOpen])

    function reload(newPath: string) {
        loadData(newPath);
    }

    function filter(isValid: ArrowFunction) {
        setFiltredOptions(options.filter(isValid));
    }

    return { selected, setSelected, "options": filtredOptions, isLoading, reload, filter };

}