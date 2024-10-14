import { TextInputProps } from "@/types";
import styles from "@styles/TextInput.module.css";
export function TextInput({
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  type = "text",
}: TextInputProps) {
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
