'use client'

import { InputTextProps } from "@/types";
import InputStyle from "@styles/inputs.module.css";
import Skeleton from "@components/atoms/Skeleton";
import GridStartEndStyle from "@styles/grid_start_end.module.css";


export default function InputText({
    label,
    name,
    id,
    datacy,
    stateInput,
    minLength = null,
    maxLength = null,
    placeholder = '',
    isLoading = false,
    readOnly = false,
    gridStart = '',
    gridEnd = ''
}: InputTextProps) {

    const minLengthProp = minLength !== null ? { minLength: minLength } : {};
    const maxLengthProp = maxLength !== null ? { maxLength: maxLength } : {};

    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            {!isLoading ?
                <input
                    id={id}
                    className={`${InputStyle["input"]}`}
                    type="text"
                    name={name}
                    data-cy={datacy}
                    value={stateInput[0] ? stateInput[0] : ''}
                    placeholder={placeholder}
                    {...minLengthProp}
                    {...maxLengthProp}
                    readOnly={readOnly}
                    onChange={(e: any) => stateInput[1](e.target.value)}
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
