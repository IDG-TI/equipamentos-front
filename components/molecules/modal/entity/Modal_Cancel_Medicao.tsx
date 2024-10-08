import { useEffect, useState } from "react";
import InputTextarea from "@atoms/Input_Textarea";
import ModalStyle from "@styles/modal.module.css";
import Modal from "@components/molecules/modal/entity/Modal";
import { ModalEntity } from "@/types";

export default function ModalCancelMedicao({ controller }: ModalEntity) {

    const { submit, markedElement, isOpened, close } = controller;
    const motivo = useState(null);

    useEffect(function updateValues() {
        if (isOpened && markedElement) {
            motivo[1](markedElement.motivo);
        }
    }, [markedElement])

    function overrideSubmit() {
        submit(motivo[0], close);
    }

    return (

        <Modal
            controller={controller}
            title={'Cancelar Aprovação'}
            overrideSubmit={overrideSubmit}
            customModalTemplate={'modal-reprove-template'}
            body={
                <form className={ModalStyle["form"]} >
                    <InputTextarea
                        label="Motivo"
                        name="motivo"
                        id="motivo"
                        stateInput={motivo}
                        datacy="modalReproveInputTextarea"
                        placeholder="Informe o motivo da Reprovação"
                        rows={4}
                    />
                </form>
            }

            showButtonCancel={true}
            showButtonConfirm={true}
        />

    )
}