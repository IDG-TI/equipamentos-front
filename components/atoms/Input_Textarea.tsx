'use client'

import { InputTextareaProps } from "@/types";
import InputStyle from '@/styles/inputs.module.css';
import GridStartEndStyle from "@styles/grid_start_end.module.css";

export default function InputTextarea({
    label,
    name,
    id,
    datacy,
    stateInput,
    placeholder = '',
    rows = 5,
    gridStart = '',
    gridEnd = '',
    readOnly=false
}: InputTextareaProps) {
    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            <textarea
                className={`${InputStyle["textarea"]}`}
                name={name}
                data-cy={datacy}
                value={stateInput[0]}
                placeholder={placeholder}
                onChange={(e: any) => stateInput[1](e.target.value)}
                rows={rows}
                readOnly={readOnly}
            />
        </label>

    )
}
