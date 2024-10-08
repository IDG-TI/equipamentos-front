import { ButtonActionProps } from "@/types";
import ButtonAction from "@atoms/Button_Action";
import SidebarStyle from "@styles/sidebar.module.css";
import React from "react";

interface FooterButtonsProps {
    buttons?: React.ReactElement | null | undefined,
    reloadFilter: Function,
    cleanFilters: Function,
}

export default function FooterButtons({
    buttons, 
    reloadFilter, 
    cleanFilters
}: FooterButtonsProps) {

    // const shouldLoadCustomButtonsAction = Array.isArray(buttons);
    const shouldNotLoadButtons = buttons === null;
    const shouldLoadCustomButtonsComponent = React.isValidElement(buttons);

    function loadButtons() {
        if (shouldLoadCustomButtonsComponent) {
            return buttons
        }
        if (shouldNotLoadButtons) {
            return null;
        }
        else {
            return <>
                <ButtonAction
                    submit={cleanFilters}
                    type="button"
                    message="Limpar"
                    datacy="sidebarContentClearButtonRegistroExtraordinario"
                    buttonType="button-clear"
                />

                <ButtonAction
                    submit={reloadFilter}
                    type="button"
                    message="Filtrar"
                    datacy="sidebarContentFilterButtonRegistroExtraordinario"
                    buttonType="button-search"
                />

            </>
        }
    }

    return (
        <div className={SidebarStyle["container-sidebar-buttons"]}>
            {loadButtons()}
        </div>
    )
}