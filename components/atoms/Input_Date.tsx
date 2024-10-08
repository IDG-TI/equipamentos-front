'use client'

import { InputDateProps } from "@/types";
import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";
import { useEffect, useState } from "react";

export default function InputDate({
    label,
    name,
    id,
    datacy,
    stateInput,
    handleChange = null,
    gridStart = "",
    gridEnd = "",
    readOnly = false
}: InputDateProps) {

    // console.log("stateInput", stateInput[0]);

    // const [formattedDate, setFormattedDate] = useState(stateInput[0] ? stateInput[0].split('T')[0] : '');

    // useEffect(() => {
    //     console.log("stateInput[0]", stateInput[0]);
    //     setFormattedDate(stateInput[0] ? stateInput[0].split('T')[0] : '');
    // }, [stateInput[0]]);

    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            <input
                className={`${InputStyle["input"]}`}
                type="date"
                name={name}
                id={id}
                data-cy={datacy}
                // value={formattedDate}
                value={stateInput[0]}
                max='9999-12-31'
                readOnly={readOnly}
                onChange={(e: any) => {
                    const newValue = e.target.value;
                    console.log("newValue", newValue);
                    stateInput[1](newValue);
                    handleChange ? handleChange(newValue) : null;
                }}
            />
        </label>
    )
}
