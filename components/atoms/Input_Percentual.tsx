'use client'

import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";
import { useEffect, useState } from "react";


export default function InputPercentual({
    label,
    name,
    id,
    datacy,
    stateInput,
    placeholder = '',
    isLoading = false,
    readOnly = false,
    gridStart = '',
    gridEnd = ''
}: any) {

    const [inputValue, setInputValue] = useState(stateInput[0] ? stateInput[0] : '');

    function handleChange(e: any) {
        const rawValue = (e.target.value).replace(/\D/g, '');
        const formattedValue = Number(rawValue / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        if ((parseInt(rawValue) / 100) <= 100 || rawValue === '') {
            setInputValue(formattedValue);
            stateInput[1](formattedValue.replace(/\./g, '').replace(/,/g, '.')); //Remove todos os "." e em seguida subsitui as "," por "."
        }
    }

    useEffect(function cleanInputValue() {
        if(stateInput[0] === '' || stateInput[0] === null) {
            setInputValue('');
        }
    }, [stateInput[0]])

    return (
        <label htmlFor={id} className={`${InputStyle["label"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}>
            {label ? label + ':' : null}
            <input
                id={id}
                className={`${InputStyle["input"]}`}
                type="text"
                name={name}
                data-cy={datacy}
                value={inputValue ? inputValue : ''}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={handleChange}
            />
        </label>
    )
}
