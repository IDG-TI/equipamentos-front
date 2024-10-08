'use client'

import { InputNumberProps } from "@/types";
import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";
import { min } from "cypress/types/lodash";

export default function InputNumber({
    label,
    name,
    id,
    datacy,
    stateInput,
    minNumber = null,
    maxNumber = null,
    placeholder = '',
    readOnly = false,
    gridStart = '',
    gridEnd = ''
}: InputNumberProps) {

    const minNumberProp = minNumber !== null ? { min: minNumber } : {};
    const maxNumberProp = maxNumber !== null ? { max: maxNumber } : {};

    function handleChange(value: string) {
        const numericValue = parseInt(value);
        if ((minNumber && numericValue < minNumber) || (maxNumber && numericValue > maxNumber)) {
            return;
        }
        stateInput[1](numericValue);
    }

    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            <input
                className={`${InputStyle["input"]}`}
                type="number"
                name={name}
                data-cy={datacy}
                value={stateInput[0] ? stateInput[0] : ''}
                placeholder={placeholder}
                {...minNumberProp}
                {...maxNumberProp}
                readOnly={readOnly}
                onChange={(e: any) => handleChange(e.target.value)}
            />
        </label>
    )
}
