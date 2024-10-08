import { Colaborador, ModalController, ModalProps, ModalSearchImplProps, ModalSearchProps, Periodo, RequestProps } from "@/types"
import ApiFuncionarios from "@apis/api_funcionarios"
import InputSwitch from "@atoms/Input_Switch"
import ModalSearch, { buildValidOption, buildInvalidOption } from "@modal/search/Modal_Search"
import ModalStyle from "@styles/modal.module.css"
import { useState } from "react"



/**
 * 
 * Modal de listagem de colaboradores do RM
 * 
 * @param closeModal função para fechar o modal
 * @param setState funcao para setar o valor da pesquisa ao state correspondente
 * @param multipleSelection habilita ou desabilita a escolha de múltiplas opções
 * @param selectedOptions define se será aplicado uma classe para os itens selecionados
 * 
 */

export default function
    ModalSearchFuncionarios({
       controller,
       multipleSelection = false,
       selectedOptions,
       shouldValidateElement = false
    }: ModalSearchImplProps<Colaborador>) {

    const consultarDemitidos = useState<boolean>(false);

    function validateColaborador(funcionario: Colaborador) {
        if (shouldValidateElement) {
            if (!funcionario) {
                return buildInvalidOption("Selecione um colaborador")
            }
        }
        return buildValidOption();
    }


    return (
        <ModalSearch<Colaborador>
            controller={controller}
            title="Pesquisa de Colaborador"
            filterPlaceHolder="Nome do Colaborador"
            apiFilter={true}
            url={`funcionarios/find`}
            getData={(props: RequestProps) => ApiFuncionarios.getData(props)}
            fields={[
                { key: "codigo", label: "ID Rede" }, { key: "nome", label: "Nome" }
            ]}
            filterKey="nome"
            multipleSelection={multipleSelection}
            selectedOptions={selectedOptions}
            validateElement={validateColaborador}
            customFilterOptions={[
                {
                    component: 
                    <InputSwitch
                        label={"Pesquisar demitidos?"}
                        name={"consultarDemitidos"}
                        id={"consultarDemitidos"}
                        datacy="consultarDemitidos"
                        customClass={ModalStyle["custom-filter-label"]}
                        stateInput={consultarDemitidos}
                    />,
                    getValue: () => ({ codigoSituacaoNotEq: consultarDemitidos[0] ? null : "D" })
                }
            ]}
        />
    )
}