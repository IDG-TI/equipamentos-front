import { useState } from "react"
import { AtividadeApontamento, Colaborador, Contrato, Projeto, Secao } from "@types";
import useModal from "./useModal";
import showWarningToast from "@toasts/warning_toast";
import ApiApontamamento from "@apis/api_apontamento";

export default function useRelatorioGeral() {


    const contrato = useState<Contrato | null>(null);
    const contratos = useState<Contrato[]>([]);
    const modalSearchContrato = useModal((contratoSelected: Contrato, _) => addModalSelectedOptionsToTable(contratoSelected, contratos, "Contrato"));

    const projeto = useState<Projeto | null>(null);
    const projetos = useState<Projeto[]>([]);
    const modalSearchProjeto = useModal((projetoSelected: Projeto, _) => addModalSelectedOptionsToTable(projetoSelected, projetos, "Projeto"));

    const secao = useState<Secao | null>(null);
    const secoes = useState<Secao[]>([]);
    const modalSearchSecao = useModal((secaoSelected: Secao, _) => addModalSelectedOptionsToTable(secaoSelected, secoes, "Seção"));

    const colaborador = useState<Colaborador | null>(null);
    const colaboradores = useState<Colaborador[]>([]);
    const modalSearchColaborador = useModal((colaboradorSelected: Colaborador, _) => addModalSelectedOptionsToTable(colaboradorSelected, colaboradores, "Colaborador"));

    const atividade = useState<AtividadeApontamento | null>(null);
    const atividades = useState<AtividadeApontamento[]>([]);
    const modalSearchAtividade = useModal((atividadeSelected: AtividadeApontamento, _) => addModalSelectedOptionsToTable(atividadeSelected, atividades, "Atividade"));

    const [fields, setFields] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string[]>([]);
    const modalConfirmGenRelatorio = useModal(genRelatorio);

    const [dasboardMarkedGroup, setDashboardMarkedGroup] = useState<string | null>(null);
    const [dashboardData, setDashboardData] = useState<any>([]);
    const [dashboardFields, setDashboardFields] = useState<string[]>([]);
    const groupByMonthState = useState<boolean>(false);

    function genRelatorio(filterObj: any) {
        ApiApontamamento.request({
            path: "apontamento/relatorio",
            method: "GET",
            actionName: "Exportar",
            name: "Relatorio Geral",
            params: { ...filterObj, fields, sortOrder },
            downloadResponse: true
        })
    }

    function noFilterAreMarked() {
        const filterObj = getFilterObj();
        return (Object.keys(filterObj).length === 0);
    }

    const dataInicio = useState<Date | null>(null);
    const dataFim = useState<Date | null>(null);

    function genDashBoard() {
        if (dasboardMarkedGroup == null) {
            showWarningToast("Selecione um campo para agrupar");
            return;
        }
        if (dashboardFields.length == 0) {
            showWarningToast("Selecione pelo menos um campo para exibir");
            return;
        }
        const filterObj = getFilterObj();
        ApiApontamamento.request({
            path: `apontamento/agrupar`,
            method: "GET",
            actionName: "Obter",
            name: "relatório",
            onSuccess: setDashboardData,
            params: { ...filterObj, group: dasboardMarkedGroup, fields: dashboardFields, groupByMonth: groupByMonthState[0] }
        })
    }

    const getFilterObj = () => {
        const filterObj = {
            atividades: atividades[0].map((atividade: AtividadeApontamento) => atividade.id),
            funcionarios: colaboradores[0].map((funcionario: Colaborador) => funcionario.codigo),
            secoes: secoes[0].map((secao: Secao) => secao.codigo),
            projeto: projetos[0].map((projeto: Projeto) => projeto.id),
            dataInicio: dataInicio[0],
            dataFim: dataFim[0]
        }
        // Remover null values & array vazios
        Object.entries(filterObj).forEach(([key, value]) => (!value || filterObj[key].length === 0) && delete filterObj[key])
        return filterObj;
    }

    function addModalSelectedOptionsToTable(element: any, destinationArray: any, name: string = "Elemento") {

        const arrayContainsElement = destinationArray[0].includes(element);
        if (arrayContainsElement) {
            showWarningToast(`${name} já adicionado`);
            return;
        }
        destinationArray[1]((prevElements: any) => [...prevElements, element]);
    }


    return {
        contrato,
        contratos,
        modalSearchContrato,
        projeto,
        projetos,
        modalSearchProjeto,
        secao,
        secoes,
        modalSearchSecao,
        colaborador,
        colaboradores,
        modalSearchColaborador,
        atividade,
        atividades,
        modalSearchAtividade,
        fields,
        setFields,
        sortOrder,
        setSortOrder,
        modalConfirmGenRelatorio,
        dasboardMarkedGroup,
        setDashboardMarkedGroup,
        dashboardData,
        genRelatorio,
        genDashBoard,
        dashboardFields,
        setDashboardFields,
        groupByMonthState,
        dataInicio,
        dataFim,
        getFilterObj,
        addModalSelectedOptionsToTable,
        noFilterAreMarked
    }
}