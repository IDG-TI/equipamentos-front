import { useEffect, useState } from "react";
import InputTextarea from "@atoms/Input_Textarea";
import ModalStyle from "@styles/modal.module.css";
import Modal from "@components/molecules/modal/entity/Modal";
import { ModalEntity, Periodo } from "@/types";
import InputDate from "@components/atoms/Input_Date";
import ModalSearchPeriodo from "../search/Modal_Search_Periodo";
import { use } from "chai";
import useModal from "@hooks/useModal";
import InputSearch from "@components/atoms/Input_Search";
import formatDate from "@util/formats/format_Date";
import ButtonModal from "@components/atoms/Button_Modal";

export default function ModalImportarRateioFixo({ controller }: ModalEntity) {

    const { submit, markedElement, isOpened } = controller;
    const periodo = useState<Periodo | null>(null);
    const modalSearchPeriodo = useModal((element: Periodo, _) => periodo[1](element));

    useEffect(function updateValues() {
        if (isOpened && markedElement) {

        }
    }, [markedElement])

    function handleSubmit(event: any) {
        event.preventDefault();
        if (periodo[0]) {
            submit(periodo[0].id);
        }
    }

    return (

        <>
            <Modal
                controller={controller}
                title={'Importar Rateio Fixo'}
                customModalTemplate={'modal-reprove-template'}
                body={
                    <form className={ModalStyle["form"]} onSubmit={handleSubmit}>

                        <InputSearch
                            label="Período"
                            name="periodo"
                            id="periodo"
                            datacy="input-search-periodo"
                            stateKey="inicio"
                            stateInput={periodo}
                            formatValue={(value: Periodo) => `${formatDate(value.inicio)} - ${formatDate(value.fim)}`}
                            openModal={() => modalSearchPeriodo.open()}
                        />

                        <ButtonModal
                            message={"Importar"}
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

            <ModalSearchPeriodo
                controller={modalSearchPeriodo}
            />
        </>



    )
}