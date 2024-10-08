import ButtonAction from "@components/atoms/Button_Action";
import SidebarStyle from "@styles/sidebar.module.css";
import cleanObjectStates from "@util/clean_object_states";

export default function customButtonSidebarRelatorioGeral({
    setActiveTab,
    genDashBoard,
    genRelatorio,
    cleanFilters,
}) {
    return (
        <>
            <div className={SidebarStyle["container-relatorioGeral-buttons"]}>

                <div className={SidebarStyle["sidebar-submit--dasboard"]}>
                    <ButtonAction
                        submit={() => {
                            setActiveTab("Dashboard");
                            genDashBoard();
                        }}
                        type="button"
                        message="Dashboard"
                        datacy="sidebarContentRelatorioGeralButtonDashboard"
                        buttonType="button-dashboard"
                    />
                </div>

                <div className={SidebarStyle["sidebar-submit--relatorio"]}>
                    <ButtonAction
                        submit={genRelatorio}
                        type="button"
                        message="Relatório"
                        datacy="sidebarContentRelatorioGeralButtonRelatorio"
                        buttonType="button-report"
                    />
                </div>

                <div className={SidebarStyle["sidebar-submit--clean"]}>
                    <ButtonAction
                        submit={cleanFilters}
                        type="button"
                        message="Limpar Filtros"
                        datacy="sidebarContentRelatorioGeralButtonClean"
                        buttonType="button-clear-dashboard"
                    />
                </div>
            </div>
        </>
    )
}