import { useState } from "react";
import InputSearch from "@atoms/Input_Search";
import ModalStyle from "@styles/modal.module.css";
import showErrorToast from "@toasts/error_toast";
import InputPercentual from "@atoms/Input_Percentual";
import ApontamentoStyle from "@styles/apontamento.module.css"

import showWarningToast from "@toasts/warning_toast";
import TablePesquisaStyle from "@styles/table_pesquisa.module.css";
import ModalSearchCentroCusto from "@modal/search/Modal_Search_Centro_Custo";
import useModal from "@hooks/useModal";
import ButtonAction from "@components/atoms/Button_Action";

export default function TabMedicaoServicoTerceirosCentroCusto({ medicaoServicoTerceirosInputs, viewOnly }) {


    const modalSearchCentroCusto = useModal((centroCustoSelected: any, _) => centroCusto[1](centroCustoSelected));


    const centroCusto = useState<any[] | null>(null);
    const availableRateio = useState<number>(100.00);

    function addCentroCusto() {
        if (!medicaoServicoTerceirosInputs.centrosCusto[0] || !medicaoServicoTerceirosInputs.rateio[0]) {
            showWarningToast("Preencha todos os campos");
            return
        }
        if (parseFloat(medicaoServicoTerceirosInputs.rateio[0]) > availableRateio[0]) {
            showErrorToast(`Valor do rateio disponível não pode ser maior que ${availableRateio[0].toFixed(2)}%`);
            return
        }
        medicaoServicoTerceirosInputs.centrosCusto[1]((prevCentrosCusto: any) => [...prevCentrosCusto, {
            ...centroCusto[0],
            rateio: medicaoServicoTerceirosInputs.rateio[0]
        }]);
        centroCusto[1](null);
        medicaoServicoTerceirosInputs.rateio[1](null);
        availableRateio[1](availableRateio[0] - parseFloat(medicaoServicoTerceirosInputs.rateio[0]));
    }

    return (

        <>
            <form className={ModalStyle["form-grid"]}>

                <InputSearch
                    label="Centro de Custo"
                    name=""
                    id=""
                    datacy=""
                    stateInput={centroCusto}
                    stateKey="codigo"
                    openModal={() => {
                        if (medicaoServicoTerceirosInputs.projeto[0]) {
                            modalSearchCentroCusto.open();
                            return
                        }
                        showWarningToast("Selecione um projeto para pesquisar um centro de custo");
                    }}
                    gridStart="grid-start-1"
                    gridEnd="grid-end-5"
                />

                <InputPercentual
                    label="Rateio"
                    name=""
                    id=""
                    datacy=""
                    stateInput={medicaoServicoTerceirosInputs.rateio}
                    placeholder="0,00"
                    gridStart="grid-start-5"
                    gridEnd="grid-end-8"
                />


                <ButtonAction
                    message="Adicionar"
                    type="button"
                    buttonType="button-add"
                    datacy="clearCentroCusto"
                    submit={addCentroCusto}
                />

            </form>


            <div>
                <table className={`${TablePesquisaStyle["table"]}`}>
                    <thead className={TablePesquisaStyle["tablehead"]}>
                        <tr>
                            <th className={TablePesquisaStyle["tablehead-cell"]}></th>
                            <th className={TablePesquisaStyle["tablehead-cell"]}>Código</th>
                            <th className={TablePesquisaStyle["tablehead-cell"]}>Rateio</th>
                        </tr>
                    </thead>
                    <tbody className={TablePesquisaStyle["tablebody"]}>
                        {medicaoServicoTerceirosInputs.centrosCusto[0].length > 0 && medicaoServicoTerceirosInputs.centrosCusto[0].map((element: any, index: number) => {
                            return (
                                <tr data-cy="" key={index}>
                                    <td data-cy={'deleteApontamentoButton'} className={`${TablePesquisaStyle["line-td"]} ${TablePesquisaStyle["line-td-button"]}`}>
                                        <svg onClick={() => {
                                            medicaoServicoTerceirosInputs.centrosCusto[1](medicaoServicoTerceirosInputs.centrosCusto[0].filter((_, i: number) => i !== index))
                                            availableRateio[1](availableRateio[0] + parseFloat(element.rateio))
                                        }}
                                            className={ApontamentoStyle["table-svg--delete"]} xmlns="http://www.w3.org/2000/svg" height="16" width="14"
                                            viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                    </td>
                                    <td className={`${TablePesquisaStyle["line-td"]}`}>{element.codigo}</td>
                                    <td className={`${TablePesquisaStyle["line-td"]}`}>{element.rateio + '%'}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>

            <ModalSearchCentroCusto
                controller={modalSearchCentroCusto}
            />

        </>
    )
}