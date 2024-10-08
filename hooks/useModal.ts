import { ModalController } from "@/types";
import { useState } from "react";
import ModalStyle from "@styles/modal.module.css"

const CLOSE_ANIMATION_TIME = 200;

/**
 * Custom hook to manage the modal state
 * @param action The action to be executed when the modal is submitted that receives the action body and the close function to automatically close the modal
 * can be option to only view modals
 */
export default function useModal(action?: (actionBody: any, close: () => void) => void): ModalController {

    const [isOpened, setIsOpened] = useState(false);
    const [markedElement, setMarkedElement] = useState<Object | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [key, setKey] = useState(0);

    function open(element = null) {
        setIsOpened(true);
        if (element) {
            setMarkedElement(element);
        }
    }

    function submit(actionBody: any) {
        if (action && action.length == 2) {
            action(actionBody, closeAndChangeKey);
        } else {
            console.log("Invalid action passed to component");
        }
    }

    function closeAndChangeKey() {
        close();
        setMarkedElement(null);
        setTimeout(()=>setKey(key+1),200+CLOSE_ANIMATION_TIME);
    }

    function close() {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpened(false);
            setMarkedElement(null);
            setIsClosing(false);
        }, CLOSE_ANIMATION_TIME)
    }

    const getOverlayClass = () => `${ModalStyle["modal-overlay"]} ${isClosing ? ModalStyle["modal--closed"] : ModalStyle["modal--opened"]}`;

    function handlePress(event: any, modalRef: any) {
        if (event.key === 'Escape') {
            close();
        }
    }

    return {
        open,
        close,
        submit,
        markedElement,
        isOpened,
        getOverlayClass,
        handlePress,
        key,
    }
} 