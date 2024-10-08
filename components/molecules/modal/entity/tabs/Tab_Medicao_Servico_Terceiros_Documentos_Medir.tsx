/*  import { useEffect, useState } from "react";
import InputSearch from "@atoms/Input_Search";
import useMedicaoServicoTerceiros from "@hooks/useMedicaoServicoTerceiros";
import ModalStyle from "@styles/modal.module.css";
import ButtonModal from "@atoms/Button_Modal";
import InputSwitch from "@atoms/Input_Switch";
import InputSelect from "@atoms/Input_Select";
import InputText from "@atoms/Input_Text";
import InputHoursMinutes from "@atoms/Input_Hours_Minutes";
import InputMoney from "@atoms/Input_Money";
import InputTextarea from "@atoms/Input_Textarea";
import ModalSearchEmpresa from "@modal/search/Modal_Search_Empresa";
import ModalSearchFuncionarios from "@modal/search/Modal_Search_Funcionarios";
import ModalSearchSecao from "@modal/search/Modal_Search_Secao";
import ModalSearchProjeto from "@modal/search/Modal_Search_Projeto";
import formatDate from "@formats/format_Date";


export default function TabMedicaoServicoTerceirosDocumentosMedir({submit}) {

    const medicaoServicoTerceiros = useMedicaoServicoTerceiros();
    const [documentoPressed, setdocumentoPressed] = useState(false);

    function handleSubmit(event: any) {
        event.preventDefault();
        submit({
            documentos: null,
            a1Equivalente: medicaoServicoTerceiros.a1Equivalente ? medicaoServicoTerceiros.a1Equivalente[0] : null,
            valorUnitarioA1: medicaoServicoTerceiros.valorUnitarioA1 ? medicaoServicoTerceiros.valorUnitarioA1[0] : null,
        })
    }


    return (
        <>
            <form className={ModalStyle["form-grid"]} onSubmit={handleSubmit}>

                <InputSearch
                    label="Documento"
                    name="documento"
                    id="documento"
                    datacy="documento"
                    stateInput={medicaoServicoTerceiros.documento}
                    placeholder="Escolha uma opção"
                    openModal={() => setdocumentoPressed(true)}
                    gridStart="grid-start-1"
                    gridEnd="grid-end-10"
                />

                <InputText
                    label="Formato"
                    name="formato"
                    id="formato"
                    datacy="formato"
                    stateInput={medicaoServicoTerceiros.formato}
                    placeholder=""
                    gridStart="grid-start-4"
                    gridEnd="grid-end-6"
                />

                <InputText
                    label="Folhas"
                    name="folhas"
                    id="folhas"
                    datacy="folhas"
                    stateInput={medicaoServicoTerceiros.folhas}
                    placeholder=""
                    gridStart="grid-start-4"
                    gridEnd="grid-end-6"
                />

                <InputMoney
                    label="A1 Equivalente"
                    name="a1Equivalente"
                    id="a1Equivalente"
                    datacy="a1Equivalente"
                    stateInput={medicaoServicoTerceiros.a1Equivalente}
                    placeholder="00,00"
                    gridStart="grid-start-1"
                    gridEnd="grid-end-3"
                />

                <InputMoney
                    label="valorUnitarioA1"
                    name="valorUnitarioA1"
                    id="valorUnitarioA1"
                    datacy="valorUnitarioA1"
                    stateInput={medicaoServicoTerceiros.valorUnitarioA1}
                    placeholder="00,00"
                    gridStart="grid-start-1"
                    gridEnd="grid-end-3"
                />

                <InputMoney
                    label="valorItem"
                    name="valorItem"
                    id="valorItem"
                    datacy="valorItem"
                    stateInput={medicaoServicoTerceiros.valorItem}
                    placeholder="00,00"
                    gridStart="grid-start-1"
                    gridEnd="grid-end-3"
                />

                <ButtonModal
                    message="Cadastrar"
                    id="submitRegistroExtraordinario"
                    datacy="submitRegistroExtraordinario"
                    gridStart="grid-start-4"
                    gridEnd="grid-end-8"
                />
            </form>

            {documentoPressed && <ModalSearchDocumento closeModal={() => setdocumentoPressed(false)} setState={medicaoServicoTerceiros.documento[1]}/>}
        </>
    )
} */