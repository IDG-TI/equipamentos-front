import InputDate from "@components/atoms/Input_Date";
import { TextInput } from "@components/atoms/TextInput";
import { useState } from "react";
import styles from "@styles/container.module.css";
import ButtonAction from "@components/atoms/Button_Action";

export default function ModalAdicionarCalibracao({ onclose }) {
  const [numero, setNumero] = useState<string>("");
  const [dataCalibracao, setDataCalibracao] = useState<string>("");
  const [proximaDataCalibracao, setProximaDataCalibracao] =
    useState<string>("");
  const [laudo, setLaudo] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumero("");
    setDataCalibracao("");
    setProximaDataCalibracao("");
    setLaudo("");
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
            border: "1px solid black",
          }}
        >
          <div>
            <h2 style={{ textAlign: "center" }}>Adicionar Calibração</h2>
          </div>
          <div className={styles.container}>
            <div>
              <InputDate
                label={"Data de calibração: "}
                name={"dataCalibracao"}
                id={"dataCalibracao"}
                datacy={"dataCalibracao"}
                gridStart={"2"}
                gridEnd={"3"}
                stateInput={[dataCalibracao, setDataCalibracao]}
              />
            </div>
            <div>
              <label htmlFor="numero">Número: </label>
              <TextInput
                id="numero"
                value={numero}
                onChange={(e) => {
                  setNumero(e.target.value);
                }}
              />
            </div>
            <div>
              <InputDate
                label={"Próxima data de calibração: "}
                name={"proximadataCalibracao"}
                id={"proximadataCalibracao"}
                datacy={"proximadataCalibracao"}
                gridStart={"2"}
                gridEnd={"3"}
                stateInput={[proximaDataCalibracao, setProximaDataCalibracao]}
              />
            </div>
            <div>
              <label htmlFor="fornecedor">Fornecedor: </label>
              <select id="fornecedor" name="fornecedor"></select>
            </div>
            <div>
              <label htmlFor="laudoRes">Responsável Laudo: </label>
              <TextInput
                id={"laudoRes"}
                value={laudo}
                onChange={(e) => {
                  setLaudo(e.target.value);
                }}
              />
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
              message={"Adicionar\nCalibração"}
              buttonType="button-add"
            />
            <div>&nbsp;</div>
            <ButtonAction
              datacy="cadastrarEquipamento"
              type="button"
              message={"Cancelar"}
              buttonType="button-reject"
              submit={onclose}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
