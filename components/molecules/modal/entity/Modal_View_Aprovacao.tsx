import ModalStyle from "@styles/modal.module.css"
import { ModalProps } from "@types";
import InputText from "@atoms/Input_Text";
import InputHours from "@atoms/Input_Hours";
import InputMoney from "@atoms/Input_Money";
import InputDate from "@atoms/Input_Date";
import Modal from "@components/molecules/modal/entity/Modal";
import { getAmountInHour } from "@util/formats/get_Amount_In_Hours";
import formatDate from "@util/formats/format_Date";
import InputTextarea from "@components/atoms/Input_Textarea";

export default function ModalViewAprovacao({ controller }: ModalProps) {

    const { markedElement } = controller;

    return (
        <>
            <Modal
                controller={controller}
                title={'Visualizar Medição'}
                customModalTemplate={'modal-search-template'}
                body={

                    <form className={ModalStyle["form-grid"]}>

                        <InputText
                            label={'Cód. Equipe'}
                            name={'codigoEquipe'}
                            id={'codigoEquipe'}
                            datacy={''}
                            stateInput={[markedElement?.codigoEquipe, () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-3"
                        />

                        <InputText
                            label={'Id do colaborador'}
                            name={'idColaboradorMedicao'}
                            id={'idColaboradorMedicao'}
                            datacy={''}
                            stateInput={[markedElement?.user, () => null]}
                            readOnly={true}
                            gridStart="grid-start-3"
                            gridEnd="grid-end-5"
                        />

                        <InputText
                            label={'Colaborador'}
                            name={'colaboradorMedicao'}
                            id={'colaboradorMedicao'}
                            datacy={''}
                            stateInput={[markedElement?.nome, () => null]}
                            readOnly={true}
                            gridStart="grid-start-5"
                            gridEnd="grid-end-11"
                        />

                        <InputText
                            label={'Aprv. Primário'}
                            name={'aprovarPrimarioMedicao'}
                            id={'aprovarPrimarioMedicao'}
                            datacy={'aprovarPrimarioMedicao'}
                            stateInput={[markedElement?.aprovadorPrimario?.nome, () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-5"
                        />

                        <InputText
                            label={'Aprv. Secundário'}
                            name={'aprovarSecundarioMedicao'}
                            id={'aprovarSecundarioMedicao'}
                            datacy={'aprovarSecundarioMedicao'}
                            stateInput={[markedElement?.aprovadorSecundario?.nome, () => null]}
                            readOnly={true}
                            gridStart="grid-start-5"
                            gridEnd="grid-end-11"
                        />

                        <InputText
                            label={'Horas apropriadadas'}
                            name={'horasApropriadasMedicao'}
                            id={'horasApropriadasMedicao'}
                            datacy={'horasApropriadasMedicao'}
                            stateInput={[getAmountInHour(markedElement?.horas), () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-5"
                        />

                        <InputMoney
                            label={'Valor Apropriado'}
                            name={'valorMedicao'}
                            id={'valorMedicao'}
                            datacy={''}
                            stateInput={[markedElement?.valor, () => null]}
                            readOnly={true}
                            handleChange={() => null}
                            gridStart="grid-start-5"
                            gridEnd="grid-end-11"
                        />

                        <InputDate
                            label={'Data Aprv. Primária'}
                            name={'dataAprovacaoPrimaria'}
                            id={'dataAprovacaoPrimaria'}
                            datacy={'dataAprovacaoPrimaria'}
                            stateInput={[(markedElement?.dataAprovacaoPrimaria), () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-5"
                        />

                        <InputDate
                            label={'Data Aprv. Secundária'}
                            name={'dataAprovacaoSecundaria'}
                            id={'dataAprovacaoSecundaria'}
                            datacy={'dataAprovacaoSecundaria'}
                            stateInput={[(markedElement?.dataAprovacaoSecundaria), () => null]}
                            readOnly={true}
                            gridStart="grid-start-5"
                            gridEnd="grid-end-11"
                        />

                        <InputText
                            label={'Status da Aprovação'}
                            name={'statusAprovacao'}
                            id={'statusAprovacao'}
                            datacy={'statusAprovacao'}
                            stateInput={[markedElement?.status, () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-4"
                        />

                        <InputText 
                            label={'Período'}
                            name={'periodo'}
                            id={'periodo'}
                            datacy={'periodo'}
                            stateInput={[`${formatDate(markedElement?.periodo?.inicio)} - ${formatDate(markedElement?.periodo?.fim)}`, () => null]}
                            readOnly={true}
                            gridStart="grid-start-4"
                            gridEnd="grid-end-11"
                        />

                    </form>
                }
            />
        </>
    )
}
