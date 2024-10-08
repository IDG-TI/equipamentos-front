"use client";
import { SidebarHoursMinutesInputProps, SidebarInputSearchProps, SidebarSelectProps, SidebarTextInputProps , SidebarCustomCompont} from "@/types";
import InputDate from "@atoms/Input_Date";
import InputSearch from "@atoms/Input_Search";
import InputSelect from "@atoms/Input_Select";
import InputText from "@atoms/Input_Text";
import InputHoursMinutes from "@atoms/Input_Hours_Minutes";
import InputMoney from "@atoms/Input_Money";
import InputNumber from "@atoms/Input_Number";
import InputSwitch from "@atoms/Input_Switch";

export default function SidebarComponentFactory(fields: (SidebarInputSearchProps | SidebarSelectProps | SidebarTextInputProps | SidebarHoursMinutesInputProps| SidebarCustomCompont)[]) {

    const component = fields.map((field, index) => {
        const type = field.type;
        switch (type) {
            case "input-search":
                return <BuildInputSearch key={index} {...field}/>;
            case "select":
                return <BuildSelect key={index} {...field}/>;
            case "hours-minutes":
                return <BuildInputHoursMinute key={index} {...field}/>;
            case "input":
                return <BuildInput key={index} {...field}/>;
            case "custom-component":
                const Component = ()=>field.component;
                return <Component key={index} />;
            default:
                return null;
        }
    });

    return component;
}

function BuildInputSearch({ label, state, openModal, stateKey, formatValue}: SidebarInputSearchProps) {
    return <InputSearch
        label={label}
        name={label}
        id={label}
        stateKey={stateKey}
        formatValue={formatValue}
        datacy={label}
        stateInput={state}
        openModal={openModal}
    />
}

function BuildSelect({ stateSelect, label }: SidebarSelectProps) {
    return <InputSelect
        label={label}
        name={label}
        id={label}
        datacy={label}
        stateSelect={stateSelect}
    />
}

function BuildInputHoursMinute({ name, stateHour, stateMinute }: SidebarHoursMinutesInputProps) {
    return <InputHoursMinutes
        nameInputHoras={`filterHoras${name}`}
        idInputHoras={`idFilterHoras${name}`}
        datacyInputHoras={`filterHoras${name}`}
        stateInputHoras={stateHour}
        nameInputMinutos={`filterMinutos${name}`}
        idInputMinutos={`idFilterMinutos${name}`}
        datacyInputMinutos={`filterMinutos${name}`}
        stateInputMinutos={stateMinute}
    />
}

function BuildInput({ inputType, label, state }: SidebarTextInputProps) {

    const joinedLabel = label.split(" ").join();
    const inputProps = { label, id: `inputFilterId${joinedLabel}`, datacy: `inputFilterDataCy${joinedLabel}`, name: label, stateInput: state };

    switch (inputType) {
        case "number":
            return <InputNumber
                {...inputProps}
            />
        case "date":
            return <InputDate
                {...inputProps}
            />
        case "text":
            return <InputText
                {...inputProps}
            />
        case "money":
            return <InputMoney
                {...inputProps}
            />
        case "switch":
            return <InputSwitch
                {...inputProps}
            />
        default:
            return null;
    }

}