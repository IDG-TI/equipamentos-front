import { ButtonActionProps } from "@/types";
import ModalStyle from "@styles/modal.module.css";
import ButtonAction from "@atoms/Button_Action";
import { ModalProps } from "@types";
import useDraggableModal from "@hooks/useDraggableModal";

export default function Modal({
    title,
    buttonConfirmMessage = "Confirmar",
    controller,
    body = null,
    showButtonCancel = false,
    showButtonConfirm = false,
    showHeaderCloseSvg = true,
    customButtons,
    customModalTemplate = '',
    overrideSubmit
}: ModalProps) {

    const dragbleModal = useDraggableModal();
    const { submit, close } = controller;


    function realSubmit() {
        if (overrideSubmit) {
            overrideSubmit();
            return;
        }
        submit(controller.markedElement);
    }
    
    function handlePress(event: any) {
        if (event.key === 'Enter') {
            realSubmit();
        }
        if (event.key === 'Escape') {
            close();
        }
    }

    return (
        <>
            {controller.isOpened ?
                <div className={controller.getOverlayClass()} onKeyDown={handlePress}>
                    <div ref={dragbleModal.modalRef} className={`${ModalStyle["modal"]} ${ModalStyle[customModalTemplate]} ${dragbleModal.isDragging ? ModalStyle["modal-dragging"] : ''}`}>
                        <div
                            className={ModalStyle["modal-header-container"]}
                        >
                            <h1
                                className={ModalStyle["modal-title"]}
                                onMouseDown={dragbleModal.handleMouseDown}
                            >
                                {title}
                            </h1>
                            {showHeaderCloseSvg ?

                                <svg
                                    data-cy="closeSearchModal"
                                    onClick={controller.close}
                                    className={ModalStyle["modal-close-svg"]}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                </svg>

                                : null}
                        </div>

                        {body}

                        {showButtonCancel || showButtonConfirm ?

                            <div className={ModalStyle["confirmacao-button-container"]}>
                                {showButtonCancel &&
                                    <ButtonAction
                                        submit={() => controller.close()}
                                        type="button"
                                        message="Cancelar"
                                        datacy="modalConfirmDeclineButton"
                                        buttonType="button-reject"
                                    />
                                }

                                {showButtonConfirm &&
                                    <ButtonAction
                                        submit={() => realSubmit()}
                                        type="button"
                                        message={buttonConfirmMessage}
                                        datacy="modalConfirmAcceptButton"
                                        buttonType="button-confirm"
                                    />
                                }
                            </div>
                            : null}
                    </div>
                </div>
                : null
            }
        </>
    )
}