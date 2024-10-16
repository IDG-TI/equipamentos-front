import { Default_button } from "@components/atoms/Default_button";
import { useState, useEffect } from "react";
import styles from "@styles/Nav_botoes.module.css";
import ModalAdicionarCalibracao from "../Modal_Adicionar_Calibracao";
import ButtonAction from "@components/atoms/Button_Action";

export default function NabBotoesEquipamentos() {
  const [addCalibracao, setAddCalibracao] = useState(false);
  const toggleModal = () => {
    setAddCalibracao((addCalibracao) => !addCalibracao);
  };
  return (
    <div>
      <nav
        style={{
          backgroundColor: "var(--IDGBlue)",
          height: "auto",
          padding: "5px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <Default_button
            className={styles.button}
            message="Editar"
            onClick={() => null}
            type="button"
          />
        </div>
        <div>
          <Default_button
            className={styles.button}
            message="Atualizar"
            onClick={() => null}
            type="button"
          />
        </div>
        <div>
          <Default_button
            className={styles.button}
            message="Excluir"
            onClick={() => null}
            type="button"
          />
        </div>
        <div>
          <Default_button
            className={styles.button}
            message="Adicionar Calibração"
            onClick={toggleModal}
            type="button"
          />
        </div>
        <div>
          <Default_button
            className={styles.button}
            message="Equipamentos para Calibração"
            onClick={() => null}
            type="button"
          />
        </div>
      </nav>
      {addCalibracao && <ModalAdicionarCalibracao onclose={toggleModal} />}
    </div>
  );
}
