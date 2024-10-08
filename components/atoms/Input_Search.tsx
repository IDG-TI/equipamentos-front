'use client'

import { InputSearchProps } from "@/types";
import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";


export default function InputSearch({
    label,
    name,
    id,
    stateKey = 'nome',
    datacy,
    stateInput,
    placeholder = '',
    readOnly = false,
    openModal,
    gridStart = '',
    gridEnd = '',
    formatValue,
}: InputSearchProps) {

    function handleValue() : string{
        if(stateInput[0]){
            if(formatValue){
                return formatValue(stateInput[0])
            }
            return stateInput[0][stateKey];
        }
        return ''
    }
    const value = handleValue();
    
    // avoid digit in modal opening
    const maxLength = value?undefined:0;

    return (
        <label htmlFor={id} onClick={openModal} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            <div className={InputStyle["input-search-container"]}>
                <input
                    className={`${InputStyle["input"]} ${InputStyle["input-search"]}`}
                    type="text"
                    name={name}
                    id={id}
                    data-cy={datacy}
                    value={value}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    onChange={()=> null}
                />
                <svg
                    className={InputStyle["input-search-icon"]}
                    xmlns="http://www.w3.org/2000/svg"
                    height={20}
                    width={20}
                    viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </div>
        </label>
    )
}



