import { useState } from "react";
import { TextInput } from "@components/atoms/TextInput";
import styles from "@styles/container.module.css";
export default function EmprestimoEquipamento() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        width: "100%",
        padding: "10px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <div>
        <h2>Equipamentos: </h2>

        <div className={styles.container}>
          <label htmlFor="equipamento">Equipamentos</label>
          <select name="equipamento" id="equipamento">
            <option value="" selected disabled>
              Selecione{" "}
            </option>
            <option value="value1">Trena</option>
            <option value="value2">Paquímetro</option>
            <option value="value2">Sei la</option>
          </select>
          <label htmlFor="obs">Observação</label>
          <TextInput value="" onChange={() => {}} id="obs" />
        </div>
      </div>
    </div>
  );
}
