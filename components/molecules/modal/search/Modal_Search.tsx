import { ModalSearchProps, ModalSearchField, OptionValidation, PageResponse } from '@/types';
import { useRef, useState, useEffect } from 'react';
import ModalStyle from "@styles/modal.module.css";
import InputStyle from "@styles/inputs.module.css";
import TablePesquisaStyle from "@styles/table_pesquisa.module.css";
import showWarningToast from '@toasts/warning_toast';
import Loading from '@molecules/Loading';
import PaginationModal from '@components/molecules/modal/entity/Pagination_Modal';
import Modal from '@molecules/modal/entity/Modal';


export const buildInvalidOption = (message: string): OptionValidation<false> => {
    return { valid: false, message }
}
export const buildValidOption = (): OptionValidation<true> => {
    return { valid: true, message: null as never }
}

/**
 * 
 * @param url url da api
 * @param title titulo do modal
 * @param closeModal função para fechar o modal
 * @param filterKey chave do filtro da api
 * @param fields campos que serão exibidos na tabela
 * @param filterPlaceHolder placeholder do input de pesquisa
 * @param apiCall api a ser chamada para a requisição
 * @param apiFilter define se a api irá ou não filtrar os dados
 * @param multipleSelection habilita ou desabilita a escolha de múltiplas opções
 * @param allowEmptySearch define se a pesquisa pode ser vazia
 * @param selectedOptions define se será aplicado uma classe para os itens selecionados
 *   
 */

export default function
    ModalSeacrh<T>({
        controller,
        url,
        title,
        filterKey,
        fields,
        filterPlaceHolder,
        getData,
        apiFilter,
        multipleSelection,
        inputType = 'search',
        allowEmptySearch = false,
        selectedOptions,
        validateElement,
        customFilterOptions
    }: ModalSearchProps<T>) {

    const { close } = controller;
    const [filter, setFilter] = useState("")
    const [filtredData, setfiltredData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const filterRef: any = useRef(null);

    const paginationRef: any = useRef(null);
    const itemsPerPage = 20;

    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);

    useEffect(function activeFocusOnOpen(){
        if (filterRef.current) {
            filterRef.current.focus();
        }
    }, []);

    function handlePaginatedResponse(data: PageResponse<T>) {
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setNumberOfElements(data.numberOfElements);
        setfiltredData(data.content);
    }
    function handleNonPaginatedResponse(result: T[]) {
        setfiltredData(result
            .filter((element: any) => element[filterKey]
                .toLowerCase()
                .includes(filter.toLowerCase())
            )
        )
    }
    const optionIsValid = (element: any) => {
        return validateElement != null ? validateElement(element).valid : true;
    }

    function setInputValue(element: any) {
        if (optionIsValid(element)) {
            controller.submit(element);
            !multipleSelection ? close() : null;
            return
        }
        if (validateElement != null) {
            const warningMessage = validateElement(element).message;
            showWarningToast(warningMessage);
        }
    }

    async function filterData(newPage: number, filter: string) {
        setLoading(true);
        setfiltredData([]);
        if (filter === "" && !allowEmptySearch) {
            showWarningToast("O campo de pesquisa não pode estar vazio");
            setLoading(false);
            return;
        }
        const onSuccess = apiFilter ? handlePaginatedResponse : handleNonPaginatedResponse;
        const filterObj = getFilterObj(newPage, filter)
        await getData({
            path: url,
            actionName: "Listar",
            method: "GET",
            onSuccess: onSuccess,
            params: filterObj

        })
        setLoading(false);

    }
    function getFilterObj(newPage: number, filter: string): Object {
        const filterObject = { page: newPage, size: itemsPerPage, [filterKey]: filter };
        if (customFilterOptions) {
            customFilterOptions.forEach((filterOption) => {
                Object.assign(filterObject, filterOption.getValue())
            })
        }
        return filterObject;
    }

    return (
        <Modal
            controller={controller}
            title={title}
            customModalTemplate='modal-search-template'
            overrideSubmit={() => filterData(actualPage, filter)}
            body={
                <>
                    <div className={InputStyle["input-search-container"]}>
                        <input placeholder={filterPlaceHolder} value={filter} ref={filterRef} onChange={e => setFilter(e.target.value)} className={`${InputStyle["input"]}`} type={inputType} autoFocus={true} />
                        <button data-cy="submitSearchModal" className={ModalStyle["pesquisa-search-button"]} type="button" onClick={() => filterData(actualPage, filter)}>Pesquisar</button>
                    </div>
                    {Array.isArray(customFilterOptions) && customFilterOptions.map((filterOption, index) => {
                        const Component = ()=> filterOption.component;
                        return <Component key={index}/>
                    })}
                    <div className={TablePesquisaStyle["table-container"]}>
                        <table className={`${TablePesquisaStyle["table"]}`}>
                            <thead className={TablePesquisaStyle["tablehead"]}>
                                <tr>
                                    {fields.map((field: ModalSearchField, index: number) => {
                                        return <th key={index} className={TablePesquisaStyle["tablehead-cell"]}>{field.label}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody className={TablePesquisaStyle["tablebody"]} data-cy={"tableConsultaPeriodo"}>
                                {Array.isArray(filtredData) && filtredData.map((element: any, index: number) => (
                                    <tr
                                        data-cy="searchModalTr"
                                        key={index}
                                        className={`${TablePesquisaStyle["line"]} ${optionIsValid(element) ? "" : TablePesquisaStyle["disabled-line"]} ${Array.isArray(selectedOptions) && selectedOptions.filter((option) => option[fields[0].key] === element[fields[0].key]).length > 0 ? TablePesquisaStyle["selected-item"] : ''}`}
                                        onClick={() => setInputValue(element)}
                                    >
                                        {fields.map((field: ModalSearchField, i: number) => {
                                            return <td
                                                key={i}
                                                className={`${TablePesquisaStyle["line-td"]}`}
                                            >
                                                {field.getter ? field.getter(element[field.key]) : element[field.key]}
                                            </td>
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Loading isLoading={loading} />

                    </div>
                    {apiFilter &&
                        <PaginationModal
                            totalElements={totalElements}
                            actualPage={actualPage}
                            totalPages={totalPages}
                            setPage={(page: number) => { setActualPage(page), filterData(page, filter) }}
                            itemsPerPage={itemsPerPage}
                            numberOfElements={numberOfElements}
                            innerRef={paginationRef}
                        />
                    }
                </>
            }
        />
    )
}

