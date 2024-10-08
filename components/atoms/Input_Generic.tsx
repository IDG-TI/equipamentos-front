'use client'

import { InputGenericProps } from "@/types";
import { useState, useEffect } from "react";
import InputStyle from "@styles/inputs.module.css";
import Skeleton from "@components/atoms/Skeleton";
import GridStartEndStyle from "@styles/grid_start_end.module.css";

export default function InputGeneric({
    label,
    name,
    id,
    datacy,
    defaultValue = '',
    minLength = null,
    maxLength = null,
    placeholder = '',
    readOnly = false,
    isLoading = false,
    handleChange,
    gridStart = "",
    gridEnd = ""
}: InputGenericProps) {

    const minLengthProp = minLength !== null ? { minLength: minLength } : {};
    const maxLengthProp = maxLength !== null ? { maxLength: maxLength } : {};

    const [value, setValue] = useState<string | number>(defaultValue);
    
    useEffect(() => {
        setValue(defaultValue);
    }, [isLoading]);
    
    useEffect(() => {
        if(String(defaultValue).split("").length === 0) {
            setValue(defaultValue);
        }
    }, [defaultValue])

    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            {!isLoading ?
                <input
                    className={`${InputStyle["input"]}`}
                    type="text"
                    name={name}
                    data-cy={datacy}
                    value={value ?? ''}
                    placeholder={placeholder}
                    {...minLengthProp}
                    {...maxLengthProp}
                    readOnly={readOnly}
                    onChange={(e: any) => setValue(handleChange(value, e.target.value))}
                />
                :
                <Skeleton
                    width={"100%"}
                    height={"100%"}
                >
                    <input className={`${InputStyle["input"]}`} />
                </Skeleton>
            }
        </label>

    )
}
