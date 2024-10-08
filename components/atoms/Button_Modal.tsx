import ModalStyle from "@styles/modal.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";
import { ButtonModalProps } from "@/types";

export default function ButtonModal({
    message = "",
    type = "submit",
    submit,
    id,
    datacy,
    gridStart = "",
    gridEnd = ""
}: ButtonModalProps) {

    const onClick = type !== "submit" ? submit: ()=> null;

    return (
        <button
            type={type}
            className={`${ModalStyle["modal-button"]} ${GridStartEndStyle[gridStart]} ${GridStartEndStyle[gridEnd]}`}
            id={id}
            data-cy={datacy}
            onClick={onClick}
        >
            {message}
        </button>
    )
}