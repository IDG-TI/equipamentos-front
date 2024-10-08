import ModalStyle from "@styles/modal.module.css"
import { ModalProps } from "@types";
import InputText from "@atoms/Input_Text";
import InputMoney from "@atoms/Input_Money";
import InputDate from "@atoms/Input_Date";
import Modal from "@components/molecules/modal/entity/Modal";
import { getAmountInHour } from "@util/formats/get_Amount_In_Hours";
import formatDate from "@util/formats/format_Date";

export default function ModalViewMedicao({ controller }: ModalProps) {

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
                            label={'Número da Medição'}
                            name={'numeroMedicao'}
                            id={'NumeroMedicao'}
                            datacy={''}
                            stateInput={[markedElement?.codigo || markedElement?.numero, () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-5"
                        />

                        <InputText
                            label={'Id do colaborador'}
                            name={'idColaboradorMedicao'}
                            id={'idColaboradorMedicao'}
                            datacy={''}
                            stateInput={[markedElement?.user || markedElement?.aprovacao?.user, () => null]}
                            readOnly={true}
                            gridStart="grid-start-5"
                            gridEnd="grid-end-6"
                        />

                        <InputText
                            label={'Colaborador'}
                            name={'colaboradorMedicao'}
                            id={'colaboradorMedicao'}
                            datacy={''}
                            stateInput={[markedElement?.nome || markedElement?.aprovacao?.nome, () => null]}
                            readOnly={true}
                            gridStart="grid-start-6"
                            gridEnd="grid-end-11"
                        />

                        <InputText
                            label={'Tomador'}
                            name={'tomadorMedicao'}
                            id={'tomadorMedicao'}
                            datacy={'tomadorMedicao'}
                            stateInput={[markedElement?.tomador?.nome, () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-5"
                        />

                        <InputText
                            label={'Executante'}
                            name={'executanteMedicao'}
                            id={'executanteMedicao'}
                            datacy={'executanteMedicao'}
                            stateInput={[markedElement?.executante?.nome, () => null]}
                            readOnly={true}
                            gridStart="grid-start-5"
                            gridEnd="grid-end-11"
                        />

                        <InputText
                            label={'Horas Apropriadadas'}
                            name={'horasApropriadasMedicao'}
                            id={'horasApropriadasMedicao'}
                            datacy={'horasApropriadasMedicao'}
                            // stateInput={[getAmountInHour(markedElement?.horas) && getAmountInHour(markedElement?.aprovacao?.horas), () => null]}
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
                            label={'Data envio'}
                            name={'dataEnvioMedicao'}
                            id={'dataEnvioMedicao'}
                            datacy={'dataEnvioMedicao'}
                            stateInput={[markedElement?.uploaded?.time?.split("T")[0], () => null]}
                            readOnly={true}
                            gridStart="grid-start-1"
                            gridEnd="grid-end-5"
                        />

                        <InputText
                            label={'Responsável envio'}
                            name={'responsavelEnvioMedicao'}
                            id={'responsavelEnvioMedicao'}
                            datacy={'responsavelEnvioMedicao'}
                            stateInput={[markedElement?.uploaded?.user, () => null]}
                            readOnly={true}
                            gridStart="grid-start-5"
                            gridEnd="grid-end-11"
                        />
                    </form>
                }
            />
        </>
    )
}
