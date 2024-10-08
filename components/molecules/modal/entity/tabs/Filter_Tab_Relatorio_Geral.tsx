import { useEffect, useState } from "react";
import RelatorioStyle from "@styles/relatorio.module.css"
import TablePesquisaStyle from "@styles/table_pesquisa.module.css"
import { FilterTab, TableColumn } from "@/types";
import InputSearch from "@atoms/Input_Search";

export default function FilterTabRelatorioGeral({
    columns,
    cleanOptions,
    activeTab,
    searchInput,
    openModal,
    modal,
    options,
    componentDatacy
    // }: FilterTab) {
}: any) {

    const [markedOptions, setMarkedOptions] = useState<boolean[]>([]);
    const {searchLabel, searchName, searchId, searchDatacy, searchState, searchPlaceholder} = searchInput;

    useEffect(() => {
        if (cleanOptions) {
            setMarkedOptions(new Array(options.length).fill(false));
        }
    }, [cleanOptions]);

    useEffect(() => {
        setMarkedOptions(new Array(options.length).fill(false));
    }, [options])

    function removeItem(index: number) {
        options[1](options[0].filter((_: any, i: number) => i !== index));
    }

    return (
        <div data-cy={componentDatacy} style={{ display: activeTab ? "block" : "none" }}>

            <form className={RelatorioStyle["filtetab-form"]}>
                <InputSearch
                    label={searchLabel}
                    name={searchName}
                    id={searchId}
                    datacy={searchDatacy}
                    stateInput={searchState}
                    placeholder={searchPlaceholder}
                    openModal={openModal}
                />
            </form>

            <div className={RelatorioStyle["table-container"]}>
                <table className={`${TablePesquisaStyle["table"]}`}>
                    <thead className={TablePesquisaStyle["tablehead"]}>
                        <tr>
                            <th className={`${TablePesquisaStyle["tablehead-cell"]} ${TablePesquisaStyle["tablehead-cell-icons"]}`}></th>
                            {columns.map((column: TableColumn, index: number) => (
                                <th key={index} className={TablePesquisaStyle["tablehead-cell"]}>{column.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={TablePesquisaStyle["tablebody"]}>
                        {options[0] ? options[0].map((option: Object, index: number) => (
                            <tr className={TablePesquisaStyle["line"]} key={index}>
                                <td
                                    className={`${TablePesquisaStyle["line-td"]} ${TablePesquisaStyle["line-td-button"]}`}>
                                    <svg
                                        data-cy="deleteFilterTabItem"
                                        onClick={() => removeItem(index)}
                                        className={`${TablePesquisaStyle["svg"]} ${TablePesquisaStyle["svg--delete"]}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                    </svg>
                                </td>
                                {columns.map((column: TableColumn, i: number) => (
                                    <td key={i} className={TablePesquisaStyle["line-td"]}>{column.getter(option)}</td>
                                ))}
                            </tr>
                        ))
                            : null}
                    </tbody>
                </table>
            </div>

            {modal}

        </div>
    )
}