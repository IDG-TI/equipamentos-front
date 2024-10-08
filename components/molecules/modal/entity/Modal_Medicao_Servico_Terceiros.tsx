import { ModalEntity } from "@/types";
import { useEffect, useState } from "react";
import ButtonModal from "@atoms/Button_Modal";
import TabStyle from "@styles/tabs.module.css";
import ModalStyle from "@styles/modal.module.css";
import useMedicaoServicoTerceiros from "@hooks/useMedicaoServicoTerceiros";
import TabMedicaoServicoTerceirosForm from "@components/molecules/modal/entity/tabs/Tab_Medicao_Servico_Terceiros_Form";
import TabMedicaoServicoTerceirosCentroCusto from "@components/molecules/modal/entity/tabs/Tab_Medicao_Servico_Terceiros_Centro_Custo";
import Modal from "@components/molecules/modal/entity/Modal";
import ApiApontamento from "@apis/api_apontamento";


export default function ModalMedicaoServicoTerceiro({
    controller,
    viewOnly,
    setReloadFilter
}: ModalEntity) {

    const { markedElement, submit, close } = controller;
    const medicaoServicoTerceirosInputs = useMedicaoServicoTerceiros(markedElement);
    const isUpdate = markedElement != null && !viewOnly;
    const [activeTab, setActiveTab,] = useState(0);


    const tabs =
        [
            {
                title: "Principal",
                component: <TabMedicaoServicoTerceirosForm
                    medicaoServicoTerceirosInputs={medicaoServicoTerceirosInputs}
                    viewOnly={viewOnly}
                />
            },
            {
                title: "Centro de Custo",
                component: <TabMedicaoServicoTerceirosCentroCusto
                    medicaoServicoTerceirosInputs={medicaoServicoTerceirosInputs}
                    viewOnly={viewOnly}
                />
            },
            // {
            //     title: "Documentos a Medir",
            //     component: <TabMedicaoServicoTerceirosDocumentosMedir />
            // }
        ];


    const switchTab = (index: number) => {
        setActiveTab(index);
    };

    function handleSubmit(event: any) {
        event.preventDefault();
        submitMedicaoServicoTerceiros(medicaoServicoTerceirosInputs.getMedicaoServicosTerceirosBody());
    }

    function submitMedicaoServicoTerceiros(medicaoServicosTerceiros: any) {
        const method = medicaoServicosTerceiros && medicaoServicosTerceiros.id ? "PUT" : "POST";
        const medicaoServicosTerceirosBody = method === "PUT" ? { ...medicaoServicosTerceiros, id: medicaoServicosTerceiros.id } : medicaoServicosTerceiros;
        ApiApontamento.request({
            path: "medicao-terceiros",
            method: method,
            body: medicaoServicosTerceirosBody,
            actionName: "Cadastrar",
            onSuccess: () => {
                close();
                setReloadFilter(true);
            }
        })
    }

    useEffect(function getCentrosCustoMedicaoServicoTerceiros() {
        if(markedElement) {
            ApiApontamento.request({
                path: `medicao-terceiros/centros-custo/${markedElement.id}`,
                method: "GET",
                actionName: "Listar",
                onSuccess: (data) => {
                    medicaoServicoTerceirosInputs.centrosCusto[1](data);
                }
            })
        }
    }, [markedElement])

    return (
        <Modal
            overrideSubmit={() => submitMedicaoServicoTerceiros}
            controller={controller}
            title={isUpdate ? "Atualizar Medição de Serviço de Terceiros" : "Cadastrar Medição de Serviço de Terceiros"}
            customModalTemplate='modal-medicaoTerceiros-template'
            body={
                <>
                    <ul className={`${TabStyle["tab-container"]}`}>
                        {tabs.map((tab: any, index: number) => (
                            <li key={index} >
                                <div className={`${TabStyle["tab-item"]} ${index === activeTab ? TabStyle["tab-active"] : null}`}>
                                    <span className={TabStyle["tab-title"]} onClick={() => switchTab(index)}>
                                        {tab.title}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {tabs.map((tab: any, index: number) => (
                        <div className={TabStyle["container-tab-component"]} key={index} style={{ display: index === activeTab ? "block" : "none" }}>
                            {tab.component}
                        </div>
                    ))}

                    <div className={ModalStyle["button-grid"]}>
                        <ButtonModal
                            message={isUpdate ? "Atualizar" : "Cadastrar"}
                            id="submitMedicaoServicoTerceiros"
                            datacy="submitMedicaoServicoTerceiros"
                            gridStart="grid-start-4"
                            gridEnd="grid-end-8"
                            type="button"
                            submit={handleSubmit}
                        />
                    </div>
                </>
            }
        />
    )
}