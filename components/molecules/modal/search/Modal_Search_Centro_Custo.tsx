import ApiRm from "@apis/api_rm"
import ModalSearch, { buildInvalidOption, buildValidOption } from "@modal/search/Modal_Search"
import { CentroCusto, ModalSearchImplProps } from "@types";

export default function ModalSearchCentroCusto({
    controller,
    multipleSelection = false,
    selectedOptions,
    shouldValidateElement = false
}: ModalSearchImplProps<CentroCusto>) {

    function validateCentroCusto(centroCusto: CentroCusto) {
        if (shouldValidateElement) {
            if (!centroCusto) {
                return buildInvalidOption("Selecione um projeto")
            }
        }
        return buildValidOption();
    }

    return (
        <ModalSearch
            controller={controller}
            title="Pesquisa de Centro de Custo"
            filterPlaceHolder="Código do Centro de Custo"
            url={`centro-custo`}
            getData={ApiRm.request}
            apiFilter={false}
            fields={[
                { key: "codigo", label: "Código" }, { key: "descricao", label: "Descrição" }
            ]}
            filterKey="codigo"
            multipleSelection={multipleSelection}
            selectedOptions={selectedOptions}
            validateElement={validateCentroCusto}
            allowEmptySearch={true}
        />
    )
}