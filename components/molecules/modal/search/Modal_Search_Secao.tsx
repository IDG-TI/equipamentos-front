import ApiRm from "@apis/api_rm"
import ModalSearch, { buildInvalidOption, buildValidOption } from "@modal/search/Modal_Search"
import {ModalSearchImplProps, Secao } from "@/types"

export default function ModalSearchSecao({
    controller,
    multipleSelection = false,
    selectedOptions,
    shouldValidateElement = false
}: ModalSearchImplProps<Secao>) {

    function validateSecao(secao: Secao) {
        if (shouldValidateElement) {
            if (!secao) {
                return buildInvalidOption("Seção inválida");
            }
            if (!secao.disciplina) {
                return buildInvalidOption("Seção não possui uma disciplina");
            }
            if (!secao.filialAuxiliar) {
                return buildInvalidOption("Seção não possui uma Filial Auxiliar");
            }
            if (!secao.centroCustoGerencia) {
                return buildInvalidOption("Seção não possui centro de custo gerência");
            }
        }
        return buildValidOption();
    }

    return (
        <ModalSearch<Secao>
            controller={controller}
            title="Pesquisa de Seção"
            filterPlaceHolder="Nome da Seção"
            url={`secao/find`}
            getData={ApiRm.request}
            apiFilter={true}
            fields={[
                { key: "codigo", label: "Código" }, { key: "descricao", label: "Descrição" }
            ]}
            filterKey="nome"
            multipleSelection={multipleSelection}
            allowEmptySearch={true}
            selectedOptions={selectedOptions}
            validateElement={validateSecao}
        />
    )
}