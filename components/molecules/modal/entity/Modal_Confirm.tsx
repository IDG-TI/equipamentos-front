import { ModalConfirmProps } from "@/types";
import Modal from "@components/molecules/modal/entity/Modal";
import ModalStyle from "@styles/modal.module.css";

export default function ModalConfirm({
    buttonConfirmMessage = "Confirmar",
    title = "Deseja confirmar a sua ação?",
    controller,
    bodyText = null,
    getTitle,
    overrideSubmit,
}: ModalConfirmProps) {

    const { markedElement } = controller;
    const titleParsed = getTitle && markedElement ? getTitle(markedElement) : title;

    return (
        <div>
            <Modal
                buttonConfirmMessage={buttonConfirmMessage}
                controller={controller}
                customModalTemplate='modal-confirm-template'
                title={titleParsed}
                showHeaderCloseSvg={false}
                showButtonCancel={true}
                showButtonConfirm={true}
                body={
                    <>
                        <div className={ModalStyle["cancel-icon-container"]}>
                            <svg
                                className={ModalStyle["cancel-icon"]}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                            </svg>
                        </div>
                        {bodyText && (
                            <div className={ModalStyle["body-info-text"]}>
                                {bodyText}
                                <p className={ModalStyle["body-info-confirm"]}>Deseja confirmar a aprovação?</p>
                            </div>
                        )}
                    </>
                }
                overrideSubmit={overrideSubmit}
            />
        </div>
    )
}