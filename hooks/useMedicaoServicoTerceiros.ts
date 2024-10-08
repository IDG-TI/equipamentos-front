import { useEffect, useState } from "react"
import { Empresa, Secao, Periodo, Projeto, Colaborador } from "@types";
import useFetchOptions from "./useFetchOptions"
import ApiContrato from "@apis/api_contrato";
import getTimeFromHourMinutes from "@util/get_time_from_hour_minutes";
import ApiColaboradores from "@util/apis/api_colaboradores";

export default function useMedicaoServicoTerceiros(element: any) {

    const id = useState<string | null>(null);
    const empresa = useState<Empresa | null>(null);
    const corpoTecnico = useState<boolean>(true);
    const executante = useState<Empresa | null>(null);
    const colaborador = useState<Colaborador | null>(null);
    const colaboradorNome = useState<string | null>(null);
    // const executanteNome = useState<Colaborador | null>(null);
    const secao = useState<Secao | null>(null);
    const periodo = useState<Periodo | null>(null);
    const competencia = useState<string | null>(null);
    const localDeExecucao = useFetchOptions({
        getData: ApiContrato.request,
        path: "tabela/local-execucao/list",
        loadOnOpen: true,
        name: "Local de Execução"
    });
    const projetoSimplified = useState<Projeto | null>(null);
    const projetoFull = useState<Projeto | null>(null);
    const horas = useState<number | null>(null);
    const minutos = useState<number | null>(null);
    const time = useState<number | null>(null);
    const valorUnitario = useState<number | null>(null);
    const valorCalculado = useState<number | null>(null);
    const precoGlobal = useState<number | null>(null);
    const valorTotalA1 = useState<number | null>(null);
    const valorTotal = useState<number | null>(null);
    const motivoReprovacao = useState<String | null>(null);
    const observacao = useState<string | null>("");

    const centrosCusto = useState<Object[] | null>([]);
    const rateio = useState<string | null>(null);

    const documentos = useState<Object | null>(null);
    const formato = useState<string | null>("");
    const folhas = useState<number | null>(null);
    const a1Equivalente = useState<number | null>(null);
    const valorUnitarioA1 = useState<number | null>(null);
    const valorItem = useState<number | null>(null);

    useEffect(function getTime() {
        const horasValue = horas[0] ? horas[0] : 0;
        const minutosValue = minutos[0] ? minutos[0] : 0;
        time[1](getTimeFromHourMinutes(horasValue, minutosValue));
    }, [horas[0], minutos[0]])

    useEffect(function getProjetoById() {
        if (projetoSimplified[0] && Object.keys(projetoSimplified[0]).length > 0) {
            ApiContrato.request({
                path: `projeto/find/${projetoSimplified[0].id}`,
                method: "GET",
                actionName: "Listar",
                onSuccess: (data) => {
                    projetoFull[1](data);
                }
            })
        }
    }, [projetoSimplified[0]])

    useEffect(function setLocalDeExecucao() {
        if (projetoFull[0] && Object.keys(projetoFull[0]).length > 0) {
            localDeExecucao.setSelected(projetoFull[0]?.contrato?.localExecucao);
        }
    }, [projetoFull[0]])

    useEffect(function setElementValuesToStates() {
        if (element) {
            id[1](element.id);
            motivoReprovacao[1](element.motivoReprovacao);
            empresa[1](element.tomador);
            corpoTecnico[1](element.corpoTecnico);
            executante[1](element.executante);
            secao[1](element.secaoResponse);
            periodo[1](element.periodo);
            competencia[1](element.competencia);
            projetoSimplified[1](element.projeto);
            horas[1](Math.floor(element.horas));
            minutos[1](Math.round(element.horas % 1 * 60));
            time[1](element.horas);
            localDeExecucao.setSelected(element.localDeExecucao);
            valorUnitario[1](element.valorUnitario);
            valorCalculado[1](element.valorCalculado);
            precoGlobal[1](element.valor);
            valorTotalA1[1](element.valorTotalA1);
            valorTotal[1](element.valorTotal);
            observacao[1](element.observacao);
        }
    }, [element]);

    console.log("tempo:", horas[0], minutos[0], time[0]);

    function getMedicaoServicosTerceirosBody() {
        const executanteNomeValue = corpoTecnico[0] ? colaborador[0]?.codigo : colaboradorNome[0];
        return {
            id: id[0],
            motivoReprovacao: motivoReprovacao[0],
            corpoTecnico: corpoTecnico[0],
            executante: executante[0]?.id,
            executanteNome: executanteNomeValue,
            secao: secao[0]?.codigo,
            periodo: periodo[0],
            competencia: competencia[0],
            localDeExecucao: localDeExecucao.selected,
            projeto: projetoFull[0]?.id,
            horas: time[0],
            valorUnitario: valorUnitario[0],
            precoGlobal: precoGlobal[0],
            valorTotalA1: valorTotalA1[0],
            valorCalculado: valorCalculado[0],
            valorTotal: valorTotal[0],
            observacoes: observacao[0],
            centrosDeCusto: centrosCusto[0],
            documentos: [],
        }
    }

    useEffect(function getExecutanteNome() {
        if (element && element.corpoTecnico) {
            const userId = element.user;
            getColaborador(userId);
            return;
        }
        colaboradorNome[1](element?.executanteNome);
    }, [element])

    async function getColaborador(userId: string) {
        await ApiColaboradores.request({
            path: `funcionarios/find?page=0&size=1&codigo=${userId}`,
            method: "GET",
            actionName: "Listar",
            onSuccess: (data) => {
                colaborador[1](data.content[0]);
            }
        })
    }

    return {
        id,
        empresa,
        corpoTecnico,
        executante,
        colaborador,
        colaboradorNome,
        secao,
        periodo,
        competencia,
        projeto: projetoSimplified,
        localDeExecucao,
        horas,
        minutos,
        time,
        valorUnitario,
        valorCalculado,
        precoGlobal,
        valorTotalA1,
        valorTotal,
        motivoReprovacao,
        observacao,
        centrosCusto,
        rateio,
        getMedicaoServicosTerceirosBody,
    }
}