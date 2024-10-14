"use client";

import icons from "@assets/Button_Icons";
import ButtonStyle from "@styles/buttons.module.css";
import { ButtonActionProps } from "@/types";

export default function ButtonAction({
  submit,
  type = "submit",
  message = "Confirmar",
  datacy,
  buttonType,
}: ButtonActionProps) {
  const onClick: any = type !== "submit" ? submit : (event: any) => null;

  return (
    <button
      className={`${ButtonStyle["button"]} ${ButtonStyle[buttonType]}`}
      type={type}
      onClick={() => onClick()}
      data-cy={datacy}
    >
      <span className={ButtonStyle["button-text"]}>{message}</span>
      <span className={ButtonStyle["svg-container"]}>{icons[buttonType]}</span>
    </button>
  );
}
