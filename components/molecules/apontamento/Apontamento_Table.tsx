import { Apontamento } from "@/types";
import TablePesquisaStyle from "@styles/table_pesquisa.module.css"
import ModalConfirm from "../modal/entity/Modal_Confirm";
import useModal from "@hooks/useModal";
import ApiApontamento from "@util/apis/api_apontamento";
import ApontamentoStyle from "@styles/apontamento.module.css";
import formatDate from "@util/formats/format_Date";
import { getAmountInHour } from "@util/formats/get_Amount_In_Hours";
import Loading from "@molecules/Loading";

export default function ApontamentoTable({ apontamentos, setApontamentos, day, date, isApontamentosLoading }: {
    apontamentos: { [key: string]: Apontamento[] };
    setApontamentos: Function,
    day: number,
    date: string,
    isApontamentosLoading: boolean
}) {

    const modalDelete = useModal((apontamento: any, closeModal) => deleteApontamento(apontamento.id, closeModal))

    function deleteApontamento(id: any, closeModal) {
        ApiApontamento.request({
            path: `apontamento/${id}`,
            method: "DELETE",
            actionName: "Deletar",
            onSuccess: () => {
                setApontamentos({
                    ...apontamentos,
                    [day]: apontamentos[day].filter((item: any) => item.id !== id)
                });
                closeModal()
            }
        })
    }
    
    function ApontamentoSVG() {

        console.log("apontamentoTable day", day);
        console.log("apontamentoTable date", date);

        let svgSource = "Empty-amico.svg";
        let text = "SELECIONE UM DIA PARA APONTAMENTO";

        const hasApontamentoInDay = apontamentos[day] && apontamentos[day].length > 0;

        if (isApontamentosLoading[0] || hasApontamentoInDay) {
            return null;
        }
        if (day) {
            const selectedDate = new Date(date);
            const currentDate = new Date().toISOString().split('T')[0];
            console.log("apontamentoTable currentDate", currentDate);

            if (selectedDate > new Date(currentDate)) {
                svgSource = "no-data-animate.svg";
                text = `Não é permitido apontar para dias superiores a ${formatDate(currentDate)}`;
            } else if (!hasApontamentoInDay) {
                text = `Não há nenhum apontamento para a data ${formatDate(date)}`;
            } else {
                return null;
            }
        }

        return <>
            <picture className={ApontamentoStyle["picture-svg"]}>
                <img className={ApontamentoStyle["warning-svg"]} src={svgSource} alt="" />
                <span className={ApontamentoStyle["warning-text"]}>{text}</span>
            </picture>
        </>
    }
    return (
        <div className={ApontamentoStyle["container-apontamento-table"]}>
            <table className={`${TablePesquisaStyle["table"]}`}>
                <thead className={TablePesquisaStyle["tablehead"]}>
                    <tr>
                        <th className={TablePesquisaStyle["tablehead-cell"]}></th>
                        <th className={TablePesquisaStyle["tablehead-cell"]}>Data</th>
                        <th className={TablePesquisaStyle["tablehead-cell"]}>Projeto</th>
                        <th className={TablePesquisaStyle["tablehead-cell"]}>Atividade</th>
                        <th className={TablePesquisaStyle["tablehead-cell"]}>Horas</th>
                        <th className={TablePesquisaStyle["tablehead-cell"]}>Documento</th>
                        <th className={TablePesquisaStyle["tablehead-cell"]}>Observação</th>
                    </tr>
                </thead>
                <tbody className={TablePesquisaStyle["tablebody"]}>
                    {Array.isArray([day]) && apontamentos[day] ? apontamentos[day].map((apontamento: Apontamento, index: number) => (
                        <tr key={index} className={TablePesquisaStyle["line"]}>

                            <td data-cy={'deleteApontamentoButton'} className={`${TablePesquisaStyle["line-td"]} ${TablePesquisaStyle["line-td-button"]}`}>
                                <svg onClick={() => {
                                    modalDelete.open(apontamento);
                                }}
                                    className={ApontamentoStyle["table-svg--delete"]}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                            </td>

                            <td className={TablePesquisaStyle["line-td"]}>{formatDate(apontamento.data)}</td>
                            <td className={TablePesquisaStyle["line-td"]}>{apontamento.projeto.codigo} - {apontamento.projeto.nome}</td>
                            <td className={TablePesquisaStyle["line-td"]}>{`${apontamento.atividade.codigo} - ${apontamento.atividade.nome}`}</td>
                            <td className={TablePesquisaStyle["line-td"]}>{getAmountInHour(apontamento.horas)}</td>
                            <td className={TablePesquisaStyle["line-td"]}>{apontamento.documento ? apontamento.documento.codigo : "-"}</td>
                            <td className={TablePesquisaStyle["line-td"]}>{apontamento.observacao ?? '-'}</td>
                        </tr>
                    )) : null
                    }
                </tbody>
            </table>

            <Loading isLoading={isApontamentosLoading[0]} />
            <ApontamentoSVG />

            <ModalConfirm
                controller={modalDelete}
                title="Deseja deletar seu apontamento?"
            />
            
        </div>)
}

