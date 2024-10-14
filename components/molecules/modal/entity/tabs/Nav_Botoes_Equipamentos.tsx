import { Default_button } from "@components/atoms/Default_button";
import { useState } from "react";
import styles from "@styles/Nav_botoes.module.css";
export default function NabBotoesEquipamentos() {
  return (
    <nav
      style={{
        backgroundColor: "rgba(223, 220, 216, 0.651)",
        height: "auto",
        padding: "5px",
      }}
    >
      <Default_button
        className={styles.button}
        message="Editar"
        onClick={() => null}
        type="button"
      />
      <Default_button
        className={styles.button}
        message="Atualizar"
        onClick={() => null}
        type="button"
      />
      <Default_button
        className={styles.button}
        message="Excluir"
        onClick={() => null}
        type="button"
      />
      <Default_button
        className={styles.button}
        message="Adicionar Calibração"
        onClick={() => null}
        type="button"
      />
      <Default_button
        className={styles.button}
        message="Equipamentos para Calibração"
        onClick={() => null}
        type="button"
      />
    </nav>
  );
}
