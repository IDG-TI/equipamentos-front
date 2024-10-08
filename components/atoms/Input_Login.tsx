"use client"

import { LoginInputProps } from "@/types"
import InputStyle from "@styles/inputs.module.css"

export default function InputLogin({
    name,
    datacy,
    placeholder,
    stateValue,
    setStateValue,
    handleSvgClick = () => null,
    type,
    icon,
    maxLength,
    
}: LoginInputProps) {

    return (
        <label className={InputStyle['loginscreen-label']}>
            <input
                name={name}
                data-cy={datacy}
                className={InputStyle["loginscreen-input"]}
                type={type}
                placeholder={placeholder}
                value={stateValue}
                onChange={(e) => setStateValue(e.target.value)}
                autoComplete="off"
                maxLength={maxLength}
            />
            <div onClick={handleSvgClick}>
                {icon}
            </div>
        </label>
    )
}