import { Default_button } from "@components/atoms/Default_button";
import styles from "@styles/Nav_botoes.module.css";

export default function NabBotoesTermos() {
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
            message="Atualizar"
            onClick={() => null}
            type="button"
          />
        </div>
        <div>
          <Default_button
            className={styles.button}
            message="Baixa Parcial"
            onClick={() => null}
            type="button"
          />
        </div>
        <div>
          <Default_button
            className={styles.button}
            message="Baixa Total"
            onClick={() => null}
            type="button"
          />
        </div>
        <div>
          <Default_button
            className={styles.button}
            message="Emitir Termos de compromisso"
            onClick={() => null}
            type="button"
          />
        </div>
      </nav>
    </div>
  );
}
