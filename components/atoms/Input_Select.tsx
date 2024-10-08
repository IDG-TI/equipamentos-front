'use client'

import { SelectInputProps } from "@/types";
import Skeleton from "@components/atoms/Skeleton";
import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";

export default function InputSelect({
    label = null,
    name,
    id,
    hiddenOption = true,
    defaultOptionText = 'Escolha uma opção',
    selectIdentifier = 'id',
    selectContent = 'nome',
    getContent = null,
    readOnly = false,
    emptyOptionsMessage = "Sem opções para serem selecionadas",
    readOnlyText = "",
    stateSelect,
    datacy,
    gridStart = '',
    gridEnd = '',
}: SelectInputProps) {

    const isEmpty = !Array.isArray(stateSelect.options) || stateSelect.options.length === 0;
    const isDisabled = readOnly || isEmpty;

    const defaultOptionMessage = readOnly ? readOnlyText : isEmpty ? emptyOptionsMessage : "";

    return (

        <>
            <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`} >
                {label ? label + ':' : null}
                {!(stateSelect.isLoading) ?
                    <select
                        id={id}
                        className={`${InputStyle["select"]}`}
                        value={stateSelect.selected}
                        onChange={(e) => stateSelect.setSelected(e.target.value)}
                        name={name}
                        data-cy={datacy}
                        disabled={isDisabled}
                    >
                        {hiddenOption ? <option value="">{defaultOptionMessage}</option> : null}
                        {stateSelect && stateSelect.options.length > 0 && stateSelect.options.map((item: any, index: number) => <option key={index} value={item[selectIdentifier]}>
                            {getContent ? getContent(item) : item[selectContent]}
                        </option>)}
                    </select>
                    :
                    <Skeleton
                        width={"100%"}
                        height={"100%"}
                    >
                        <select className={`${InputStyle["select"]}`}></select>
                    </Skeleton>
                }
            </label>
        </>
    )
}
