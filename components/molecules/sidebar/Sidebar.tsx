import { useState } from "react"
import SidebarStyle from "@styles/sidebar.module.css"
import { SidebarProps } from "@/types";
import SidebarComponentFactory from "@util/sidebard_component_factory";
import FooterButtons from "@molecules/sidebar/Footer_Buttons";

export default function Sidebar({
    name = "Filtros",
    fields,
    reloadFilter,
    footerButtons
}: SidebarProps) {

    const [isSideBarVisible, setIsSideBarVisible] = useState(false);
    const filterInputsRendered = SidebarComponentFactory(fields ?? []);

    function cleanFilters() {
        if (!Array.isArray(fields)) {
            return;
        }
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const type = field.type;
            switch (type) {
                case "input-search":
                    field.state[1]("");
                    break;
                case "select":
                    field.stateSelect.setSelected("");
                    break;
                case "hours-minutes":
                    field.stateHour[1](null);
                    field.stateMinute[1](null);
                    break;
                case "input":
                    field.state[1]("");
                    break;
                case "custom-component":
                    break;
                default:
            }
        }
    }

    return (
        <>
            <div className={`${SidebarStyle["container-sidebar"]} ${isSideBarVisible ? SidebarStyle["container-sidebar--visible"] : ""}`}>
                <form className={SidebarStyle["sidebar-form"]}>
                    <div className={SidebarStyle["container-input"]}>
                        <h1 className={SidebarStyle["container-input-title"]}>{name}</h1>
                        {filterInputsRendered}
                    </div>

                    <FooterButtons
                        buttons={footerButtons}
                        cleanFilters={cleanFilters}
                        reloadFilter={() => reloadFilter ? reloadFilter() : null}
                    />
                </form>

                <div data-cy="sidebarActionBar" onClick={() => setIsSideBarVisible(!isSideBarVisible)} className={SidebarStyle["container-sidebar-svg"]}>
                    <svg style={{ rotate: isSideBarVisible ? "180deg" : "0deg" }} className={SidebarStyle["sidebar-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                </div>

            </div>
            <div className={SidebarStyle["sidebar-spacing"]} />
        </>
    )
}

