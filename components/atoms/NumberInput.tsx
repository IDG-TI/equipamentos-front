import { NumberInputProps } from "@/types";
import styles from "@styles/inputs.module.css";
export function NumberInput({
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  type = "number",
}: NumberInputProps) {
  return (
    <input
      type={type}
      className={styles.input}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
    />
  );
}
