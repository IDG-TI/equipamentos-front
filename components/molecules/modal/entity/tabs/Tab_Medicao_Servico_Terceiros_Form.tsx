"use client"

import InputText from "@atoms/Input_Text";
import InputMoney from "@atoms/Input_Money";
import { useEffect } from "react";
import InputSearch from "@atoms/Input_Search";
import InputSwitch from "@atoms/Input_Switch";
import InputSelect from "@atoms/Input_Select";
import InputTextarea from "@atoms/Input_Textarea";
import ModalStyle from "@styles/modal.module.css";
import ModalSearchSecao from "@modal/search/Modal_Search_Secao";
import InputHoursMinutes from "@atoms/Input_Hours_Minutes";
import ModalSearchEmpresa from "@modal/search/Modal_Search_Empresa";
import ModalSearchPeriodo from "@modal/search/Modal_Search_Periodo";
import ModalSearchProjeto from "@modal/search/Modal_Search_Projeto";
import getTimeFromHourMinutes from "@util/get_time_from_hour_minutes";
import ModalSearchFuncionarios from "@modal/search/Modal_Search_Funcionarios";
import useModal from "@hooks/useModal";
import { Colaborador, Empresa, Periodo, Projeto, Secao } from "@/types";
import formatDate from "@util/formats/format_Date";


export default function TabmedicaoServicoTerceirosInputsForm({ medicaoServicoTerceirosInputs, viewOnly }) {

    const MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS = {
        modalSearchEmpresa: useModal((empresa: Empresa, _) => medicaoServicoTerceirosInputs.executante[1](empresa)),
        modalSearchFuncionarios: useModal((funcionario: Colaborador, _) => medicaoServicoTerceirosInputs.colaborador[1](funcionario)),
        modalSearchSecao: useModal((secao: Secao, _) => medicaoServicoTerceirosInputs.secao[1](secao)),
        modalSearchPeriodo: useModal((periodo: Periodo, _) => medicaoServicoTerceirosInputs.periodo[1](periodo)),
        modalSearchProjeto: useModal((projeto: Projeto, _) => medicaoServicoTerceirosInputs.projeto[1](projeto)),
    }

    useEffect(function getCompetencia() {
        let [_, month, year] = new Date().toLocaleDateString().split("/");
        medicaoServicoTerceirosInputs.competencia[1](month + "/" + year);
    }, [])

    useEffect(function getTime() {
        const horas = medicaoServicoTerceirosInputs.horas[0] ? medicaoServicoTerceirosInputs.horas[0] : 0;
        const minutos = medicaoServicoTerceirosInputs.minutos[0] ? medicaoServicoTerceirosInputs.minutos[0] : 0;
        medicaoServicoTerceirosInputs.time[1](getTimeFromHourMinutes(horas, minutos));
    }, [medicaoServicoTerceirosInputs.horas[0], medicaoServicoTerceirosInputs.minutos[0]])

    useEffect(function getValorCalculado() {
        const time = medicaoServicoTerceirosInputs.time[0] ? medicaoServicoTerceirosInputs.time[0] : 0;
        const valorUnitario = medicaoServicoTerceirosInputs.valorUnitario[0] ? medicaoServicoTerceirosInputs.valorUnitario[0] : 0;
        const setValorCalculado = medicaoServicoTerceirosInputs.valorCalculado[1];
        setValorCalculado(parseFloat((time * valorUnitario).toFixed(2)));
    }, [medicaoServicoTerceirosInputs.time[0], medicaoServicoTerceirosInputs.valorUnitario[0]])

    useEffect(function getValorTotal() {
        const time = medicaoServicoTerceirosInputs.time[0] ? medicaoServicoTerceirosInputs.time[0] : 0;
        const valorUnitario = medicaoServicoTerceirosInputs.valorUnitario[0] ? medicaoServicoTerceirosInputs.valorUnitario[0] : 0;
        const precoGlobal = parseFloat(medicaoServicoTerceirosInputs.precoGlobal[0] || 0);
        const valorTotalA1 = parseFloat(medicaoServicoTerceirosInputs.valorTotalA1[0] || 0);
        const setValorTotal = medicaoServicoTerceirosInputs.valorTotal[1];
        const total = (time * valorUnitario) + precoGlobal + valorTotalA1;
        setValorTotal(parseFloat(total.toFixed(2)));
    }, [medicaoServicoTerceirosInputs.time[0], medicaoServicoTerceirosInputs.valorUnitario[0], medicaoServicoTerceirosInputs.precoGlobal[0], medicaoServicoTerceirosInputs.valorTotalA1[0]]);

    return (
        <div className={ModalStyle["modal-form-container"]}>
            <div className={ModalStyle["modal-form-content"]}>
                <form className={`${ModalStyle['form-grid']} ${ModalStyle['form-grid-tab']}`}>

                    <InputSearch
                        label="Empresa"
                        name=""
                        id=""
                        datacy="empresa"
                        stateInput={medicaoServicoTerceirosInputs.executante}
                        placeholder="Escolha uma opção"
                        openModal={viewOnly ? () => null : () => MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchEmpresa.open()}
                        gridStart="grid-start-1"
                        gridEnd="grid-end-9"
                        readOnly={viewOnly}
                    />

                    <InputSwitch
                        label="Corpo Técnico"
                        name=""
                        id=""
                        datacy="corpoTecnico"
                        stateInput={medicaoServicoTerceirosInputs.corpoTecnico}
                        gridStart="grid-start-9"
                        gridEnd="grid-end-11"
                        readOnly={viewOnly}
                    />

                    {medicaoServicoTerceirosInputs.corpoTecnico[0] ? (
                        <InputSearch
                            label="Executante"
                            name=""
                            id=""
                            datacy="executanteSearch"
                            stateInput={medicaoServicoTerceirosInputs.colaborador}
                            placeholder="Escolha uma opção"
                            openModal={viewOnly ? () => null : () => MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchFuncionarios.open()}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-6"
                            readOnly={viewOnly}
                        />
                    ) : (
                        <InputText
                            label="Executante"
                            name="executante"
                            id="executante"
                            datacy="executanteText"
                            stateInput={medicaoServicoTerceirosInputs.colaboradorNome}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-6"
                            readOnly={viewOnly}
                        />
                    )}

                    <InputSearch
                        label="Seção"
                        name=""
                        id=""
                        datacy="secao"
                        stateInput={medicaoServicoTerceirosInputs.secao}
                        stateKey="descricao"
                        placeholder="Escolha uma opção"
                        openModal={viewOnly ? () => null : () => MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchSecao.open()}
                        gridStart="grid-start-6"
                        gridEnd="grid-end-11"
                        readOnly={viewOnly}
                    />

                    <InputSearch
                        label="Período de Execução"
                        name=""
                        id=""
                        datacy="periodo"
                        stateKey="inicio"
                        stateInput={medicaoServicoTerceirosInputs.periodo}
                        placeholder="Escolha uma opção"
                        openModal={viewOnly ? () => null : () => MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchPeriodo.open()}
                        gridStart="grid-start-1"
                        readOnly={viewOnly}
                        gridEnd="grid-end-4"
                        formatValue={(value: Periodo) => formatDate(value.inicio) + " - " + formatDate(value.fim)}
                    />

                    <InputText
                        label="Competência"
                        name="competencia"
                        id="competencia"
                        datacy="competencia"
                        stateInput={medicaoServicoTerceirosInputs.competencia}
                        placeholder="MM/AAAA"
                        gridStart="grid-start-4"
                        readOnly={true}
                        gridEnd="grid-end-6"
                    />

                    <InputSelect
                        label="Local de Execução"
                        name=""
                        id=""
                        datacy=""
                        stateSelect={medicaoServicoTerceirosInputs.localDeExecucao}
                        getContent={(item: any) => `${item.sigla} - ${item.nome}`}
                        gridStart="grid-start-6"
                        readOnly={viewOnly}
                        gridEnd="grid-end-11"
                    />

                    <InputSearch
                        label="Projeto"
                        name=""
                        id=""
                        datacy=""
                        stateInput={medicaoServicoTerceirosInputs.projeto}
                        stateKey="titulo"
                        placeholder="Escolha uma opção"
                        openModal={viewOnly ? () => null : () => MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchProjeto.open()}
                        gridStart="grid-start-1"
                        readOnly={viewOnly}
                        gridEnd="grid-end-6"
                        formatValue={(value: Projeto) => value.codigo + " - " + value.titulo}
                    />

                    <InputHoursMinutes
                        nameInputHoras="timeStamp"
                        idInputHoras=""
                        datacyInputHoras=""
                        stateInputHoras={medicaoServicoTerceirosInputs.horas}
                        minNumberInputHoras={0}
                        maxNumberInputHoras={999}
                        placeholderInputHoras="000"
                        nameInputMinutos="minutos"
                        idInputMinutos=""
                        datacyInputMinutos=""
                        stateInputMinutos={medicaoServicoTerceirosInputs.minutos}
                        minNumberInputMinutos={0}
                        maxNumberInputMinutos={59}
                        placeholderInputMinutos="00"
                        containerGridStart="grid-start-6"
                        readOnly={viewOnly}
                        containerGridEnd="grid-end-11"
                    />

                    <InputMoney
                        label="Valor unitário"
                        name=""
                        id=""
                        datacy=""
                        stateInput={medicaoServicoTerceirosInputs.valorUnitario}
                        placeholder="R$ 0,00"
                        gridStart="grid-start-1"
                        readOnly={viewOnly}
                        gridEnd="grid-end-3"
                    />

                    <InputMoney
                        label="Valor calculado"
                        name=""
                        id=""
                        datacy=""
                        stateInput={medicaoServicoTerceirosInputs.valorCalculado}
                        placeholder="R$ 0,00"
                        readOnly={true}
                        gridStart="grid-start-3"
                        gridEnd="grid-end-5"
                    />

                    <InputMoney
                        label="Preço global"
                        name=""
                        id=""
                        datacy=""
                        stateInput={medicaoServicoTerceirosInputs.precoGlobal}
                        placeholder="R$ 0,00"
                        gridStart="grid-start-5"
                        readOnly={viewOnly}
                        gridEnd="grid-end-7"
                    />

                    <InputMoney
                        label="Valor total A1"
                        name=""
                        id=""
                        datacy=""
                        stateInput={medicaoServicoTerceirosInputs.valorTotalA1}
                        placeholder="R$ 0,00"
                        readOnly={true}
                        gridStart="grid-start-7"
                        gridEnd="grid-end-9"
                    />

                    <InputMoney
                        label="Valor total"
                        name=""
                        id=""
                        datacy=""
                        stateInput={medicaoServicoTerceirosInputs.valorTotal}
                        placeholder="R$ 0,00"
                        readOnly={true}
                        gridStart="grid-start-9"
                        gridEnd="grid-end-11"
                    />

                    {/* <InputText
                        label="Aprovador primário"
                        name=""
                        id=""
                        datacy=""
                        stateInput={[medicaoServicoTerceirosInputs.aprovadorPrimario[0]?.nome, () => null]}
                        gridStart="grid-start-1"
                        gridEnd="grid-end-6"
                        readOnly={true}
                    />

                    <InputText
                        label="Aprovador secundário"
                        name=""
                        id=""
                        datacy=""
                        stateInput={[medicaoServicoTerceirosInputs.aprovadorSecundario[0]?.nome, () => null]}
                        gridStart="grid-start-6"
                        gridEnd="grid-end-11"
                        readOnly={true}
                    /> */}

                    <InputTextarea
                        label="Observações"
                        name=""
                        id=""
                        datacy=""
                        stateInput={medicaoServicoTerceirosInputs.observacao}
                        gridStart="grid-start-1"
                        gridEnd="grid-end-11"
                        readOnly={viewOnly}
                    />
                </form>
            </div>

            <ModalSearchEmpresa
                controller={MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchEmpresa}
            />

            <ModalSearchFuncionarios
                controller={MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchFuncionarios}
            />

            <ModalSearchSecao
                controller={MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchSecao}
            />

            <ModalSearchPeriodo
                controller={MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchPeriodo}
            />

            <ModalSearchProjeto
                controller={MODAL_MEDICAO_SERVICO_TERCEIROS_MODALS.modalSearchProjeto}
            />

        </div>
    )
}