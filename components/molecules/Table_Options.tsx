import { TableOption, VoidArrowFunction } from "@/types";
import showWarningToast from "@toasts/warning_toast";
import TableStyle from "@styles/table.module.css";
import icons from "@assets/Table_Option_Icons";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
export interface TableActions {
    options: TableOption[] | null;
    loadLines: () => void;
    elementSelected: Object | Object[];
    sortOptions: string[];
    sortedBy: string | null;
    setSortedBy: Function;
    showValue: [any, Dispatch<SetStateAction<any>>],
}


export default function TableOptions({ options, loadLines, elementSelected, sortOptions, sortedBy, setSortedBy, showValue }: TableActions) {

    const hiddenValueOption: TableOption | null = showValue[0] != undefined ? {
        name: `${showValue[0] ? "Ocultar" : "Exibir"} Valores`,
        action: () => showValue[1](!showValue[0]),
        type: `${showValue[0] ? "hide" : "show"}`,
        optionDatacy: "toggleViewHiddenValues",
    } : null;
    
    const buildTableOption = ({ name, action, condition, conditionIvalidMessage, type, optionDatacy }: TableOption, index?: number) => {
        const enabled = condition ? condition(elementSelected) : true;
        return (
            <li key={index}
                data-cy={optionDatacy}
                className={`${TableStyle["navbar-item"]}  ${enabled ? TableStyle["navbar-item--enabled"] : TableStyle["navbar-item--disabled"]}`}
                onClick={enabled ?
                    () => action(elementSelected)
                    :
                    () => showWarningToast(conditionIvalidMessage ?? "Opção Desabilitada")}
            >
                {name}
                {icons[type]}
            </li>
        )
    }

    return (
        <nav className={TableStyle["navbar-container"]}>
            <ul className={TableStyle["navbar-list-items"]}>
                {Array.isArray(options) && options.map(buildTableOption)}
                {hiddenValueOption ? buildTableOption(hiddenValueOption, undefined) : null}
                <li
                    className={`${TableStyle["navbar-item"]} ${TableStyle["navbar-item--enabled"]}`}
                    onClick={loadLines}
                >
                    Atualizar
                    {icons.reload}
                </li>

                {sortOptions && sortOptions.length > 0 ?
                    <li className={`${TableStyle["navbar-item"]} ${TableStyle["navbar-item--enabled"]} ${TableStyle["navbar-item--sort"]}`}>
                        <div>
                            <div className={TableStyle["order-option"]}>
                                Ordenar Por:
                                <div className={TableStyle["order-field"]} > {sortedBy != "null" ? sortedBy : "Nenhuma opção selecionada"}</div>
                            </div>
                            <div className={TableStyle["order-dropdown-container"]}>
                                <ul className={TableStyle["order-dropdown-content"]}>
                                    {Array.isArray(sortOptions) && sortOptions.map((item: any, index: number) => {
                                        return (
                                            <div key={index} className={TableStyle["order-content-item"]} onClick={() => setSortedBy(item)}>
                                                <li data-cy={`orderField${item.split(" ").join("")}`} key={index}>
                                                    {item}
                                                </li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </li> : null
                }
            </ul>
        </nav>
    )
}

