import { useEffect, useState } from "react";
import ModalStyle from "@styles/modal.module.css"
import GridStartEndStyle from "@styles/grid_start_end.module.css"
import InputMoney from "@atoms/Input_Money";
import InputTextarea from "@atoms/Input_Textarea";
import Modal from "@components/molecules/modal/entity/Modal";
import { ModalEntity } from "@/types";

export default function ModalDiscount({
    controller,
    viewOnly,
    bodyText = null
}: ModalEntity) {

    const { submit, markedElement } = controller;

    const MODAL_DISCOUNT = {
        desconto: useState<String | null>(null),
        descontoJustificativa: useState<String | null>("")
    }

    useEffect(() => {
        if (markedElement && viewOnly) {
            MODAL_DISCOUNT.desconto[1](markedElement.desconto)
            MODAL_DISCOUNT.descontoJustificativa[1](markedElement.descontoJustificativa)
        }
    }, [markedElement]);

    function overrideSubmit() {

        if (viewOnly) {
            return;
        }

        submit({
            desconto: MODAL_DISCOUNT.desconto[0] ? MODAL_DISCOUNT.desconto[0] : 0,
            justificativa: MODAL_DISCOUNT.descontoJustificativa[0],
            medicao: markedElement.id
        });

    }

    return (
        <Modal
            controller={controller}
            title={viewOnly ? 'Observar desconto' : 'Aprovar Medição com Desconto'}
            overrideSubmit={overrideSubmit}
            customModalTemplate={'modal-reprove-template'}
            body={
                <form className={ModalStyle["form-grid"]}>
                    {bodyText && (
                        <div className={`${GridStartEndStyle["grid-start-1"]} ${GridStartEndStyle["grid-end-11"]} ${ModalStyle["body-info-text"]}`}>
                            {bodyText}
                            <p className={ModalStyle["body-info-confirm"]}>Deseja confirmar a aprovação?</p>
                        </div>
                    )}
                    <InputMoney
                        label="Desconto"
                        name="descontos"
                        id="descontos"
                        stateInput={MODAL_DISCOUNT.desconto}
                        datacy="modalDiscountInputMoney"
                        gridStart="grid-start-1"
                        gridEnd="grid-end-11"
                        readOnly={viewOnly}
                    />

                    <InputTextarea
                        label="Justificativa"
                        name="justificativas"
                        id="justificativas"
                        stateInput={MODAL_DISCOUNT.descontoJustificativa}
                        datacy="modalDiscountJustificativa"
                        gridStart="grid-start-1"
                        gridEnd="grid-end-11"
                        readOnly={viewOnly}
                    />
                </form>
            }
            showButtonConfirm={!viewOnly}
        />
    )
}