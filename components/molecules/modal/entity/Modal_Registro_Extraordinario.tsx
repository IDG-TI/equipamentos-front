import useFetchOptions from "@hooks/useFetchOptions";
import ModalStyle from "@styles/modal.module.css";
import { useEffect, useState } from "react";
import ApiApontamento from '@apis/api_apontamento';
import InputSearch from "@atoms/Input_Search";
import InputSelect from "@atoms/Input_Select";
import InputDate from "@atoms/Input_Date";
import ButtonModal from "@atoms/Button_Modal";
import InputHoursMinutes from "@atoms/Input_Hours_Minutes";
import InputText from "@atoms/Input_Text";
import Modal from "@components/molecules/modal/entity/Modal";
import useModal from "@hooks/useModal";
import { Colaborador, ModalController, ModalEntity } from "@/types";
import ModalSearchFuncionarios from "@modal/search/Modal_Search_Funcionarios";

export default function ModalRegistroExtraordinario({ controller }: ModalEntity) {

    const { markedElement, submit } = controller;
    const isUpdate = !!markedElement;

    const MODAL_REGISTRO_EXTRAORDINARIO = {
        colaborador: useState<any>({}),
        tipo: useFetchOptions({
            getData: ApiApontamento.request,
            path: "registro-extraordinario/types",
            loadOnOpen: true,
            name: "Tipos de Registro Extraordinário"
        }),
        inicio: useState<string | null>(null),
        fim: useState<string | null>(null),
        horas: useState<number | null>(null),
        minutos: useState<number | null>(null),
        time: useState<number | null>(null),
        validade: useState<string | null>(null),
        justificativa: useState<string | null>(null),
    }

    const MODAL_REGISTRO_EXTRAORDINARIO_MODALS = {
        modalSearchFuncionarios: useModal((funcionario: Colaborador, _) => MODAL_REGISTRO_EXTRAORDINARIO.colaborador[1](funcionario))
    }

    useEffect(() => {
        let valueHoras = MODAL_REGISTRO_EXTRAORDINARIO.horas[0] ? MODAL_REGISTRO_EXTRAORDINARIO.horas[0] : 0;
        let valueMinutos = MODAL_REGISTRO_EXTRAORDINARIO.minutos[0] ? (parseFloat((MODAL_REGISTRO_EXTRAORDINARIO.minutos[0] / 60).toFixed(2))) : 0;
        MODAL_REGISTRO_EXTRAORDINARIO.time[1](valueHoras + valueMinutos);
    }, [MODAL_REGISTRO_EXTRAORDINARIO.horas[0], MODAL_REGISTRO_EXTRAORDINARIO.minutos[0]]);

    function handleSubmit(event: any) {
        event.preventDefault();
        submit({
            inicio: MODAL_REGISTRO_EXTRAORDINARIO.inicio[0] ? MODAL_REGISTRO_EXTRAORDINARIO.inicio[0] : null,
            fim: MODAL_REGISTRO_EXTRAORDINARIO.fim[0] ? MODAL_REGISTRO_EXTRAORDINARIO.fim[0] : null,
            horas: MODAL_REGISTRO_EXTRAORDINARIO.time[0],
            tipo: MODAL_REGISTRO_EXTRAORDINARIO.tipo.selected ? MODAL_REGISTRO_EXTRAORDINARIO.tipo.selected : null,
            usuario: MODAL_REGISTRO_EXTRAORDINARIO.colaborador[0].codigo ? MODAL_REGISTRO_EXTRAORDINARIO.colaborador[0].codigo : null,
            validade: MODAL_REGISTRO_EXTRAORDINARIO.validade[0] ? MODAL_REGISTRO_EXTRAORDINARIO.validade[0] : null,
            justificativa: MODAL_REGISTRO_EXTRAORDINARIO.justificativa[0] ? MODAL_REGISTRO_EXTRAORDINARIO.justificativa[0] : null
        });
    }
    
    return (
        <>
            <Modal
                controller={controller}
                title={'Registro Extraordinário'}
                customModalTemplate={'modal-search-template'}
                body={
                    <form className={ModalStyle["form-grid"]} onSubmit={handleSubmit}>
                        <h1></h1>
                        <InputSearch
                            label={"Colaborador"}
                            name={"colaboradorRegistroExtraordinario"}
                            id={"inputModalColaboradorRegistroExtraordinario"}
                            datacy={"inputModalColaboradorRegistroExtraordinario"}
                            stateInput={MODAL_REGISTRO_EXTRAORDINARIO.colaborador ? MODAL_REGISTRO_EXTRAORDINARIO.colaborador : ""}
                            placeholder={"Nome do colaborador"}
                            openModal={() => MODAL_REGISTRO_EXTRAORDINARIO_MODALS.modalSearchFuncionarios.open()}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-7"
                        />

                        <InputSelect
                            label="Tipo"
                            name="tipoRegistroExtraordinario"
                            id="inputModalTipoRegistroExtraordinario"
                            datacy="inputModalTipoRegistroExtraordinario"
                            stateSelect={MODAL_REGISTRO_EXTRAORDINARIO.tipo}
                            getContent={(item: any) => item.nome}
                            gridStart="grid-start-7"
                            gridEnd="grid-end-11"
                        />

                        <InputDate
                            label="Início"
                            name="dataInicio"
                            id="inputModalDataInicioRegistroExtraordinario"
                            datacy="inputModalDataInicioRegistroExtraordinario"
                            stateInput={MODAL_REGISTRO_EXTRAORDINARIO.inicio}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-4"
                        />

                        <InputDate
                            label="Fim"
                            name="dataFim"
                            id="inputModalDataFimRegistroExtraordinario"
                            datacy="inputModalDataFimRegistroExtraordinario"
                            stateInput={MODAL_REGISTRO_EXTRAORDINARIO.fim}
                            gridStart="grid-start-4"
                            gridEnd="grid-end-7"
                        />

                        <InputHoursMinutes
                            nameInputHoras="timeStamp"
                            idInputHoras="inputModalHorasRegistroExtraordinario"
                            datacyInputHoras="inputModalHorasRegistroExtraordinario"
                            stateInputHoras={MODAL_REGISTRO_EXTRAORDINARIO.horas}
                            minNumberInputHoras={0}
                            maxNumberInputHoras={999}
                            placeholderInputHoras="000"
                            nameInputMinutos="dateTime"
                            idInputMinutos="inputModalMinutosRegistroExtraordinario"
                            datacyInputMinutos="inputModalMinutosRegistroExtraordinario"
                            stateInputMinutos={MODAL_REGISTRO_EXTRAORDINARIO.minutos}
                            minNumberInputMinutos={0}
                            maxNumberInputMinutos={59}
                            placeholderInputMinutos="00"
                            containerGridStart="grid-start-7"
                            containerGridEnd="grid-end-11"
                        />

                        <InputDate
                            label="Validade"
                            name="validade"
                            id="inputModalValidadeRegistroExtraordinario"
                            datacy="inputModalValidadeRegistroExtraordinario"
                            stateInput={MODAL_REGISTRO_EXTRAORDINARIO.validade}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-4"
                        />

                        <InputText
                            label="Justificativa"
                            name="justificativa"
                            id="inputModalJustificativaRegistroExtraordinario"
                            datacy="inputModalJustificativaRegistroExtraordinario"
                            stateInput={MODAL_REGISTRO_EXTRAORDINARIO.justificativa}
                            gridStart="grid-start-4"
                            gridEnd="grid-end-11"
                        />

                        <ButtonModal
                            message={isUpdate ? "Atualizar" : "Cadastrar"}
                            id="submitRegistroExtraordinario"
                            datacy="submitRegistroExtraordinario"
                            gridStart="grid-start-4"
                            gridEnd="grid-end-8"
                        />

                    </form>
                }
            />
            <ModalSearchFuncionarios
                controller={MODAL_REGISTRO_EXTRAORDINARIO_MODALS.modalSearchFuncionarios}
            />
        </>
    )
}