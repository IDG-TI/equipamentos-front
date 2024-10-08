"use client"

import ApiApontamento from '@apis/api_apontamento';
import formatDate from '@formats/format_Date';
import formatMoney from '@formats/format_Money';
import SolicitarAprovacaoStyle from "@styles/approval_request.module.css"
import { useState, useEffect } from "react";
import ButtonModal from '@atoms/Button_Modal';
import Modal from '@components/molecules/modal/entity/Modal';
import LoadingComponent from '@atoms/LoadingComponent';
import { ModalProps } from "@types";
import { getAmountInHour } from '@util/formats/get_Amount_In_Hours';

export default function ModalRequestApproval({ controller }: ModalProps) {

    const { submit, isOpened, markedElement } = controller;
    const selectedPeriodo = useState<any>({});
    const isLoading = useState<boolean>(false);

    useEffect(function getUserDataForSelectedPeriodo() {
        if (!markedElement) {
            return
        }
        isLoading[1](true)
        if (isOpened) {
            ApiApontamento.request({
                path: `periodo/user/${markedElement}`,
                method: "GET",
                actionName: "Obter",
                name: "Dados do Período",
                onSuccess: (data) => {
                    selectedPeriodo[1](data)
                    isLoading[1](false)
                },
                onError: () => { isLoading[1](false) }
            })
        }
    }, [isOpened]);

    return (
        <>
            <Modal
                controller={controller}
                title={'Informações da Medição'}
                customModalTemplate={'modal-approval-template'}
                body={
                    <>
                        <div className={`${SolicitarAprovacaoStyle["container-solicitacao"]}`}>
                            <div className={SolicitarAprovacaoStyle["container-solicitacao-info"]}>
                                <span className={SolicitarAprovacaoStyle["span-solicitacao-info"]}>Período: </span>
                                <LoadingComponent
                                    isLoading={isLoading[0]}
                                    skeletonProps={{ width: 220, height: 20 }}
                                    component={
                                        <span className={SolicitarAprovacaoStyle["span-solicitacao-value"]}>
                                            {selectedPeriodo[0].periodo ? `${formatDate(selectedPeriodo[0].periodo.inicio)} - ${formatDate(selectedPeriodo[0].periodo.fim)}` : null}
                                        </span>
                                    }
                                />
                            </div>

                            <div className={SolicitarAprovacaoStyle["container-solicitacao-info"]}>
                                <span className={SolicitarAprovacaoStyle["span-solicitacao-info"]}>Total Horas: </span>
                                <LoadingComponent
                                    isLoading={isLoading[0]}
                                    skeletonProps={{ width: 220, height: 20 }}
                                    component={
                                        <span className={SolicitarAprovacaoStyle["span-solicitacao-value"]}>
                                            {selectedPeriodo[0] ? `${getAmountInHour(selectedPeriodo[0].horas) || "00:00"}` : null}
                                        </span>
                                    }
                                />
                            </div>

                            <div className={SolicitarAprovacaoStyle["container-solicitacao-info"]}>
                                <span className={SolicitarAprovacaoStyle["span-solicitacao-info"]}>Valor Hora: </span>
                                <LoadingComponent
                                    isLoading={isLoading[0]}
                                    skeletonProps={{ width: 220, height: 20 }}
                                    component={
                                        <span className={SolicitarAprovacaoStyle["span-solicitacao-value"]}>
                                            {selectedPeriodo[0] ? `${formatMoney(selectedPeriodo[0].valorHora) || "R$ 0,00"}` : null}
                                        </span>
                                    }
                                />
                            </div>

                            <div className={SolicitarAprovacaoStyle["container-solicitacao-info"]}>
                                <span className={SolicitarAprovacaoStyle["span-solicitacao-info"]}>Valor Total: </span>
                                <LoadingComponent
                                    isLoading={isLoading[0]}
                                    skeletonProps={{ width: 220, height: 20 }}
                                    component={
                                        <span className={SolicitarAprovacaoStyle["span-solicitacao-value"]}>
                                            {selectedPeriodo[0] ? `${formatMoney(selectedPeriodo[0].valor) || "R$ 0,00"}` : null}
                                        </span>
                                    }
                                />
                            </div>

                            <div className={SolicitarAprovacaoStyle["container-solicitacao-info"]}>
                                <span className={SolicitarAprovacaoStyle["span-solicitacao-info"]}>Apr. Primário: </span>
                                <LoadingComponent
                                    isLoading={isLoading[0]}
                                    skeletonProps={{ width: 220, height: 20 }}
                                    component={
                                        <span className={SolicitarAprovacaoStyle["span-solicitacao-value"]}>
                                            {selectedPeriodo[0] ? `${selectedPeriodo[0].aprovadorPrimario || "-"}` : null}
                                        </span>
                                    }
                                />
                            </div>

                            <div className={SolicitarAprovacaoStyle["container-solicitacao-info"]}>
                                <span className={SolicitarAprovacaoStyle["span-solicitacao-info"]}>Apr. Secundário: </span>
                                <LoadingComponent
                                    isLoading={isLoading[0]}
                                    skeletonProps={{ width: 220, height: 20 }}
                                    component={
                                        <span className={SolicitarAprovacaoStyle["span-solicitacao-value"]}>
                                            {selectedPeriodo[0] ? `${selectedPeriodo[0].aprovadorSecundario || "-"}` : null}
                                        </span>
                                    }
                                />
                            </div>
                        </div>

                        <ButtonModal
                            message="Solicitar Aprovação"
                            type='button'
                            submit={submit}
                            id="buttonSolicitarAprovacao"
                            datacy="buttonAproveRequestModal"
                        />
                    </>
                }
            />
        </>
    );
};