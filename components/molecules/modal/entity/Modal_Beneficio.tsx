import { useEffect, useState } from "react";
import ModalStyle from "@styles/modal.module.css";
import Modal from "@components/molecules/modal/entity/Modal";
import { ModalEntity } from "@/types";
import ButtonModal from "@components/atoms/Button_Modal";
import InputText from "@components/atoms/Input_Text";

export default function ModalBeneficio({ controller }: ModalEntity) {

    const { submit, markedElement, isOpened } = controller;
    const nome = useState<string | null>(null);

    useEffect(function updateValues() {
        if (isOpened && markedElement) {

        }
    }, [markedElement])

    function handleSubmit(event: any) {
        event.preventDefault();
        submit({
            nome: nome[0],
        });
    }

    return (

        <>
            <Modal
                controller={controller}
                title={`${markedElement ? "Editar" : "Cadastrar"} Benefício`}
                customModalTemplate={'modal-search-template'}
                body={
                    <form className={ModalStyle["form"]} onSubmit={handleSubmit}>

                        <InputText
                            label="Nome"
                            name="nome"
                            id="nome"
                            datacy="input-nome"
                            stateInput={nome}
                        />

                        <ButtonModal
                            message={`${markedElement ? "Editar" : "Cadastrar"} Benefício`}
                            id="importarRateioFixo"
                            datacy="button-importar-rateio-fixo"
                            gridStart="grid-start-4"
                            gridEnd="grid-end-8"
                        />

                    </form>
                }
            // showButtonCancel={true}
            // showButtonConfirm={true}
            // buttonConfirmMessage="Importar"
            />

        </>
    )
}