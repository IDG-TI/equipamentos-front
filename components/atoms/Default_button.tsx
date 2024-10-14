"use client";
import icons from "@assets/Button_Icons";
import { DefaultButtonProps } from "@/types";
import ButtonStyle from "@styles/buttons.module.css";
export function Default_button({
  type = "button",
  onClick,
  message,
  className,
}: DefaultButtonProps) {
  icons;
  return (
    <button
      className={`${ButtonStyle["button"]} ${className}`}
      type={type}
      onClick={() => onClick()}
    >
      <span>{message}</span>
      <span>{}</span>
    </button>
  );
}
