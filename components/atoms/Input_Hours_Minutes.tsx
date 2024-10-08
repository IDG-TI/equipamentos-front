'use client'

import InputStyle from "@styles/inputs.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";
import InputNumber from "@atoms/Input_Number";
import { InputHoursMinutesProps } from "@/types";

export default function InputHoursMinutes({
    nameInputHoras,
    idInputHoras,
    datacyInputHoras,
    stateInputHoras,
    minNumberInputHoras = 0,
    maxNumberInputHoras = 999,
    placeholderInputHoras = '000',
    nameInputMinutos,
    idInputMinutos,
    datacyInputMinutos,
    stateInputMinutos,
    minNumberInputMinutos = 0,
    maxNumberInputMinutos = 59,
    placeholderInputMinutos = '00',
    containerGridStart = '',
    containerGridEnd= '',
    readOnly= false
}: InputHoursMinutesProps) {

    return (
        <div className={`${InputStyle["container-time"]} ${GridStartEndStyle[containerGridStart]} ${GridStartEndStyle[containerGridEnd]}`}>
            <span className={InputStyle['span-input']}>Horas</span>
            <div className={InputStyle["container-time-inputs"]}>
                <InputNumber
                    name={nameInputHoras}
                    id={idInputHoras}
                    datacy={datacyInputHoras}
                    stateInput={stateInputHoras}
                    minNumber={minNumberInputHoras}
                    maxNumber={maxNumberInputHoras}
                    placeholder={placeholderInputHoras}
                    readOnly={readOnly}
                />
                <span>:</span>
                <InputNumber
                    name={nameInputMinutos}
                    id={idInputMinutos}
                    datacy={datacyInputMinutos}
                    stateInput={stateInputMinutos}
                    minNumber={minNumberInputMinutos}
                    maxNumber={maxNumberInputMinutos}
                    placeholder={placeholderInputMinutos}
                    readOnly={readOnly}
                />
            </div>
        </div>

    )
}
