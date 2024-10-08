'use client'

import { InputFieldProps } from "@/types";
import InputStyle from '@/styles/inputs.module.css';
import GridStartEndStyle from "@styles/grid_start_end.module.css";

export default function InputSwitch({
    label,
    name,
    id,
    datacy,
    stateInput,
    gridStart = '',
    gridEnd = '',
    customClass = '',
    readOnly = false
}: InputFieldProps) {


    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]} ${customClass}`}>
            {label ?? null}
            <input
                className={`${InputStyle["input-switch"]}`}
                type="checkbox"
                name={name}
                id={id}
                data-cy={datacy}
                checked={stateInput[0]}
                onChange={(e: any) => stateInput[1](!stateInput[0])}
                disabled={readOnly}
            />
        </label>
    )
}