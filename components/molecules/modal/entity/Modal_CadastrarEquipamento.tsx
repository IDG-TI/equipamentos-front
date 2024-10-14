import { TextInput } from "@components/atoms/TextInput";
import ButtonAction from "@components/atoms/Button_Action";
import { useState } from "react";
import { NumberInput } from "@components/atoms/NumberInput";
import styles from "@styles/container.module.css";
import { set } from "cypress/types/lodash";

export default function Modal_CadastrarEquipamento() {
  const [capacidade, setCapacidade] = useState("");
  const [menorValorDivisao, setMenorValorDivisao] = useState("");
  const [toleranciaEspecificada, setToleranciaEspecificada] = useState("");
  const [tolerancia, setTolerancia] = useState("");
  const [limite, setLimite] = useState("");
  const [obs, setObs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // enviar para uma API
    console.log({
      capacidade,
      menorValorDivisao,
      toleranciaEspecificada,
      tolerancia,
      limite,
      obs,
    });
    setCapacidade("");
    setMenorValorDivisao("");
    setToleranciaEspecificada("");
    setTolerancia("");
    setLimite("");
    setObs("");
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
                <label htmlFor="id">Id: </label>
                <div>
                  <TextInput
                    id="id"
                    value=""
                    readOnly={true}
                    onChange={() => {}}
                  />
                </div>

                <div>
                  <label htmlFor="tipoEquipamento">Tipo do Equipamento: </label>
                  <select id="tipoEquipamento" name="tipoEquipamento"></select>
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="capacidade">Capacidade: </label>
                  <div>
                    <TextInput
                      id="capacidade"
                      value={capacidade}
                      onChange={(e) => {
                        setCapacidade(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="menorValorDivisao">
                    Menor Valor de Divisão:{" "}
                  </label>
                  <div>
                    <TextInput
                      id="menorValorDivisao"
                      value={menorValorDivisao}
                      onChange={(e) => {
                        setMenorValorDivisao(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="tolerancia">
                    Tolerância especificada (InfoDesign):{" "}
                  </label>
                  <div>
                    <TextInput
                      id="tolerancia"
                      value={toleranciaEspecificada}
                      onChange={(e) => {
                        setToleranciaEspecificada(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="campo">Campo de tolerância: </label>
                  <div>
                    <TextInput
                      id="campo"
                      value={tolerancia}
                      onChange={(e) => {
                        setTolerancia(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lmtErro">Limite permisível de Erro: </label>
                  <div>
                    <TextInput
                      id="lmtErro"
                      value={limite}
                      onChange={(e) => {
                        setLimite(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="situacao">Situação: </label>
                <select id="situacao" name="situacao"></select>
              </div>
              <div>
                <div>
                  <label htmlFor="responsavel">Responsável: </label>
                  <select id="responsavel" name="responsavel"></select>
                </div>
                <div>
                  <label htmlFor="secao">Seção: </label>
                  <select id="secao" name="secao"></select>
                </div>
              </div>
              <div>
                <label htmlFor="observacao">Observação: </label>
                <div>
                  <TextInput
                    id="observacao"
                    value={obs}
                    onChange={(e) => {
                      setObs(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonAction
                datacy="cadastrarEquipamento"
                type="submit"
                message="Cadastrar Equipamento"
                buttonType="button-confirm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
