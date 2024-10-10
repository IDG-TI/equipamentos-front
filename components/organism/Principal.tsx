"use client";

import { useEffect, useState } from "react";
import TablePesquisaStyle from "@styles/table_pesquisa.module.css";
import TabStyle from "@styles/tabs.module.css";
import ApiApontamento from "@apis/api_apontamento";
import PrincipalStyle from "@styles/principal.module.css";
import formatDate from "@formats/format_Date";
import { getAmountInHour } from "@formats/get_Amount_In_Hours";
import { ArrowFunction } from "@/types";
import Skeleton from "@components/atoms/Skeleton";

export default function Principal() {
  const [showTableAprovacao, setShowTableAprovacao] = useState(true);
  const [showTableHoras, setShowTableHoras] = useState(true);
  const [tableSolicitacao, setTabelaSolicitacao] = useState([]);
  const [tabelaHoras, setTabelaHoras] = useState([]);
  const [isLoadingMedicao, setIsLoadingMedicao] = useState(false);
  const [isLoadingHoras, setIsLoadingHoras] = useState(false);

  useEffect(function loadPrincipalTables() {
    loadMedicoes();
    loadRegistros();
  }, []);

  function loadMedicoes() {
    setIsLoadingMedicao(true);
    loadLines(
      `aprovacao-horas/periodo`,
      (resp) => {
        setIsLoadingMedicao(false);
        setTabelaSolicitacao(resp);
      },
      () => setIsLoadingMedicao(false)
    );
  }

  function loadRegistros() {
    setIsLoadingHoras(true);
    loadLines(
      `registro-extraordinario?page=0&size=3`,
      (resp: any) => {
        setIsLoadingHoras(false);
        setTabelaHoras(resp.content);
      },
      () => setIsLoadingHoras(false)
    );
  }

  function loadLines(
    path: string,
    onSuccess: ArrowFunction,
    onError: ArrowFunction
  ) {
    ApiApontamento.request({
      path: path,
      method: "GET",
      actionName: "Atualizar",
      name: "atualizar",
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  function toggleTable(setState: Function) {
    setState((prevState: boolean) => !prevState);
  }

  return (
    <div className={PrincipalStyle["principal-container"]}>
      <div className={PrincipalStyle["container-principal-tables"]}>
        <div className={PrincipalStyle["container-text-picture"]}>
          <picture>
            <img
              className={PrincipalStyle["principal-svg"]}
              src="EqImg.svg"
              alt=""
            />
          </picture>
          <span className={PrincipalStyle["title-menssege"]}>
            Bem-vindo ao novo sistema de Equipamentos. Para sua segurança, todas
            as ações serão registradas (log).
          </span>
        </div>
      </div>
    </div>
  );
}
