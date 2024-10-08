import Modal from "@components/molecules/modal/entity/Modal";
import ModalStyle from "@styles/modal.module.css";
import InputMoney from "@components/atoms/Input_Money";
import {ModalController } from "@/types";
import InputText from "@atoms/Input_Text";

export default function ModalColaboradorPainelGestor({ controller }: { controller: ModalController }) {

    const { markedElement: colaborador } = controller;

    return (
        <>                          
            {colaborador != null ?
                <Modal
                    title={`Visualizar Colaborador`}
                    controller={controller}
                    customModalTemplate={"modal-search-template"}
                    body={
                        <form className={ModalStyle["form-grid"]}>
                            <InputText
                                label={"Colaborador"}
                                name={"colaboradorRegistroExtraordinario"}
                                id={"inputModalColaboradorRegistroExtraordinario"}
                                datacy={"inputModalColaboradorRegistroExtraordinario"}
                                stateInput={[colaborador.nome]}
                                placeholder={"Nome do colaborador"}
                                gridStart="grid-start-1"
                                gridEnd="grid-end-7"
                                readOnly
                            />
                            <InputMoney
                                label={"Valor Hora PJ"}
                                name={"colaboradorRegistroExtraordinario"}
                                id={"inputModalColaboradorRegistroExtraordinario"}
                                datacy={"inputModalColaboradorRegistroExtraordinario"}
                                stateInput={[colaborador.valorHoraPJ]}
                                placeholder={"Valor Hora PJ"}
                                gridStart="grid-start-7"
                                readOnly
                                gridEnd="grid-end-11"
                            />


                            <InputMoney
                                label={"Valor Hora CLT"}
                                name={"colaboradorRegistroExtraordinario"}
                                id={"inputModalColaboradorRegistroExtraordinario"}
                                datacy={"inputModalColaboradorRegistroExtraordinario"}
                                stateInput={[colaborador.valorHoraCLT]}
                                placeholder={"Valor Hora CLT"}
                                gridStart="grid-start-1"
                                gridEnd="grid-end-4"
                                readOnly
                            />
                            <InputMoney
                                label={"Valor Total"}
                                name={"colaboradorRegistroExtraordinario"}
                                id={"inputModalColaboradorRegistroExtraordinario"}
                                datacy={"inputModalColaboradorRegistroExtraordinario"}
                                stateInput={[colaborador.valorTotal]}
                                placeholder={"Valor total"}
                                gridStart="grid-start-4"
                                readOnly
                                gridEnd="grid-end-7"
                            />

                            <InputMoney
                                label={"Valor Bônus"}
                                name={"colaboradorRegistroExtraordinario"}
                                id={"inputModalColaboradorRegistroExtraordinario"}
                                datacy={"inputModalColaboradorRegistroExtraordinario"}
                                stateInput={[colaborador.valorBonus]}
                                placeholder={"Valor bônus"}
                                gridStart="grid-start-7"
                                readOnly
                                gridEnd="grid-end-11"
                            />
                        </form>

                    } />
                : null
            }

        </>
    )
}   
