import { useEffect, useState } from "react";
import RelatorioStyle from "@styles/relatorio.module.css"
import TablePesquisaStyle from "@styles/table_pesquisa.module.css"
import FilterTabRecursiveView from "./Filter_Tab_Recursive_View";

interface TableColumn {
    name: string;
    turnOn: (value: string) => void;
    turnOff: (value: string) => void;
}

export default function FilterTabMultipleOptions({
    loadOptions,
    columns,
    cleanOptions,
    activeTab,
    sortOrder,
    componentDatacy
}: any) {

    const [options, setOptions] = useState([]);
    const [markedOptions, setMarkedOptions] = useState<boolean[][]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadOptions(setOptions);
    }, []);

    /**
     * @description Retorna uma matriz de booleanos com o tamanho de options e columns
     * @returns {boolean[][]}
     */
    const getNewEmptyMarkedOptions = (): boolean[][] => {
        let columnSize = columns.length;
        return options.reduce((acc: boolean[][], _: string, index: number) => {
            acc[index] = new Array(columnSize).fill(false);
            return acc;
        }, [])
    };
    useEffect(() => {
        if (cleanOptions) {
            setMarkedOptions(getNewEmptyMarkedOptions());
        }
    }, [cleanOptions]);

    useEffect(() => {
        setIsLoading(false);
        setMarkedOptions(getNewEmptyMarkedOptions());
    }, [options])


    function toggleOption(index: number, indexColumn: number,) {
        if (markedOptions[index][indexColumn]) {
            columns[indexColumn].turnOff(options[index]);
        } else {
            columns[indexColumn].turnOn(options[index]);
        }
        markedOptions[index][indexColumn] = !markedOptions[index][indexColumn];
        setMarkedOptions([...markedOptions]);
    }

    return (
        <>
            <div data-cy={componentDatacy} style={{ display: activeTab ? "block" : "none" }}>
                <table data-cy="filterTabMultipleOptionsTable" className={`${TablePesquisaStyle["table"]}`}>
                    <thead className={TablePesquisaStyle["tablehead"]}>
                        <tr>
                            <th className={TablePesquisaStyle["tablehead-cell"]}>Coluna</th>
                            {columns.map((column: TableColumn, index: number) => (
                                <th key={index} className={TablePesquisaStyle["tablehead-cell"]}>{column.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={TablePesquisaStyle["tablebody"]}>
                        {markedOptions.length > 0 && options.map((option: string, index: number) => (
                            <tr key={index} className={TablePesquisaStyle["line"]}>
                                <td key={option} className={TablePesquisaStyle["line-td"]}>
                                    {option}
                                </td>
                                {columns.map((column: TableColumn, indexColumn: number) => (
                                    <td key={indexColumn} className={TablePesquisaStyle["line-td"]}>
                                        <input data-cy="filterTabMultipleOptionsCheckbox" className={TablePesquisaStyle["input-checkbox"]} onChange={() => toggleOption(index, indexColumn)} checked={markedOptions && markedOptions[index][indexColumn]} type="checkbox" />
                                    </td>
                                ))}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

                <div className={RelatorioStyle["multiple-options-tree"]}>
                    <span className={RelatorioStyle["dashboard-span"]}>Ordenar relatório por:</span>
                    <FilterTabRecursiveView options={sortOrder} componentDatacy="filterTabComponentRecursiveView" />
                </div>
            </div>
        </>
    )
}