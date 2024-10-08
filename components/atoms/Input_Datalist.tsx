'use client'

import { InputDatalistProps } from "@/types";
import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";


export default function InputDatalist({
    label,
    name,
    id,
    datacy,
    stateInput,
    placeholder = '',
    readOnly = false,
    gridStart = '',
    gridEnd = '',
    list,
    dataListArray,
    dataListValue,
    dataListContent,
    formatDataListValue = null,
    formatDataListContent = null
}: InputDatalistProps) {

    return (
        <label className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}

            <input
                className={`${InputStyle["input"]}`}
                type="text"
                id={id}
                name={name}
                data-cy={datacy}
                value={stateInput[0] ? stateInput[0] : ''}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={(e: any) => stateInput[1](e.target.value)}
                list={list}
            />
            <datalist id={list}>
                {/* {dataListArray.map((dataListItem, index) => <option key={index} value={dataListItem[dataListValue]}>{dataListItem[dataListContent]}</option>)} */}
                {dataListArray.map((dataListItem, index) => <option key={index} value={formatDataListValue ? formatDataListValue(dataListItem[dataListValue]) : dataListItem[dataListValue]}>{formatDataListContent ? formatDataListContent(dataListItem[dataListContent]) : dataListItem[dataListContent]}</option>)}
            </datalist>
        </label>
    )
}
