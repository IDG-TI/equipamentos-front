import { useState, useEffect } from "react";
import useFetchOptions from "./useFetchOptions";
import ApiRm from "@apis/api_rm";
import ApiContrato from "@apis/api_contrato";
import { Projeto, Secao } from "@types";
import setUserName from "@util/set_user_name";
import ApiApontamento from "@apis/api_apontamento";

export default function useApontamento() {
  const coligada = useFetchOptions({
    getData: ApiRm.request,
    path: "coligadas",
    loadOnOpen: true,
    name: "Coligadas",
  });
  const secao = useState<Secao | null>(null);
  const projeto = useState<Projeto | null>(null);
  const projetoAtividades = useFetchOptions({
    getData: ApiContrato.request,
    path: "",
    loadOnOpen: false,
    name: "Atividades",
  });
  const atividades = useFetchOptions({
    getData: ApiContrato.request,
    path: "tabela/atividade-apontamento-projeto/list",
    loadOnOpen: true,
    name: "Atividades",
    order: (a, b) => a.sequencial - b.sequencial,
  });
  const date = useState("");
  const horas = useState<number | null>(0);
  const observacao = useState(null);
  const documento = useState("");
  const ld = useState(false);
  const user = useState("");
  const horaEntrada = useState("0");
  const horaSaida = useState("0");
  const [isLastApontamentoLoading, setIsLastApontamentoLoading] =
    useState(false);
  const isSecaoJornadaEspecifica = useState(false);

  const getBodySubmit = () => {
    return {
      projeto: projeto[0] ? projeto[0].id : null,
      observacao: observacao[0],
      data: date[0],
      secao: secao[0] ? secao[0].codigo : null,
      horaEntrada:
        secao[0] && secao[0].dadosComplementares.jornadaEspecifica
          ? horaEntrada[0]
          : null,
      horaSaida:
        secao[0] && secao[0].dadosComplementares.jornadaEspecifica
          ? horaSaida[0]
          : null,
      ld: ld[0],
      atividade: atividades.selected,
    };
  };

  useEffect(function getUsernameAndLastApontamento() {
    setIsLastApontamentoLoading(true);
    setUserName(user[1], true);
    ApiApontamento.request({
      path: "apontamento/ultimo",
      method: "GET",
      actionName: "Listar",
      onSuccess: (data) => {
        secao[1](data.secao);
        projeto[1](data.projeto);
        atividades.setSelected(data.atividade.id);
        horas[1](data.horas);
        observacao[1](data.observacao);
      },
    });
    setIsLastApontamentoLoading(false);
  }, []);

  function getSecao(codigoSecao: string) {
    ApiRm.request({
      path: `secao/find?page=0&size=1&codigo=${codigoSecao}`,
      method: "GET",
      actionName: "Listar",
      onSuccess: (data) => {
        const secaoRequest = data.content[0];
        if (secaoRequest) {
          secao[1](secaoRequest);
        }
      },
    });
  }

  function checkSecaoIsJornadaEspecifica(secao: Secao | null) {
    if (
      secao &&
      secao.dadosComplementares &&
      secao.dadosComplementares.jornadaEspecifica
    ) {
      isSecaoJornadaEspecifica[1](true);
      return;
    }
    isSecaoJornadaEspecifica[1](false);
  }

  useEffect(
    function loadProjetoAtividades() {
      if (projeto[0] && projeto[0].id) {
        projetoAtividades.reload(
          `projeto/atividade-apontamento/${projeto[0].id}`
        );
      }
    },
    [projeto[0]]
  );

  useEffect(
    function filterProjetoAtividadesInAtividadesList() {
      if (projetoAtividades.options) {
        atividades.filter((item: any) =>
          projetoAtividades.options.includes(item.id)
        );
      }
    },
    [projetoAtividades.options]
  );

  useEffect(
    function getSecaoInfo() {
      const completeSecaoData = secao[0] && secao[0].dadosComplementares;
      if (secao[0] && !completeSecaoData) {
        getSecao(secao[0].codigo);
      }
      checkSecaoIsJornadaEspecifica(secao[0]);
    },
    [secao[0]]
  );

  return {
    coligada,
    secao,
    projeto,
    atividades,
    date,
    horas,
    observacao,
    documento,
    ld,
    user,
    horaEntrada,
    horaSaida,
    isLastApontamentoLoading,
    isSecaoJornadaEspecifica,
    getBodySubmit,
  };
}
