import { useState } from "react";
import { TextInput } from "@components/atoms/TextInput";
import styles from "@styles/container.module.css";
import ButtonAction from "@components/atoms/Button_Action";
export default function ModalNovoEmprestimo() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="heigth-100vh">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            width: "60%",
            padding: "10px",
            boxShadow: "3px 3px 10px black",
            borderRadius: "10px",
          }}
        >
          <div>
            <div className={styles.container}>
              <div>
                <label htmlFor="responsavel">Responsável: </label>
                <select id="responsavel" name="responsavel"></select>
              </div>
              <div>
                <label htmlFor="secao">Seção: </label>
                <select id="secao" name="secao"></select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ButtonAction
                datacy="cadastrarEquipamento"
                type="submit"
                message={"Cadastrar\nEquipamento"}
                buttonType="button-add"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
