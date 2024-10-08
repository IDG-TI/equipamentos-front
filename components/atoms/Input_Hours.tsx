'use client'

import { useState, useEffect } from "react";
import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";
import { InputHoursProps } from "@/types";
import { getAmountInHour } from "@formats/get_Amount_In_Hours";

export default function InputHours({
    label,
    name,
    id,
    datacy,
    readOnly = false,
    stateValue,
    handleChange = (value: string) => value,
    gridStart = "",
    gridEnd = ""
}: InputHoursProps) {

    const [value, setValue] = useState(stateValue[0] ? stateValue[0] : '00:00');
    
    useEffect(() => {
        setValue(getAmountInHour(stateValue[0]));
    }, [stateValue[0]])

    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            <input
                id={id}
                className={`${InputStyle["input"]}`}
                type="time"
                name={name}
                data-cy={datacy}
                value={value ? value : '00:00'}
                placeholder='00:00'
                readOnly={readOnly}
                onChange={(e: any) => setValue(handleChange(e.target.value))}
            />
        </label>
    )
}
