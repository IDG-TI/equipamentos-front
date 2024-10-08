import ModalSearch, { buildInvalidOption, buildValidOption } from "@modal/search/Modal_Search"
import ApiRm from "@apis/api_rm"
import { Empresa, ModalSearchImplProps } from "@/types"

export default function ModalSearchEmpresa({
    controller,
    multipleSelection = false,
    selectedOptions,
    shouldValidateElement = false
}: ModalSearchImplProps<Empresa>) {

    function validateEmpresa(empresa: Empresa) {
        if (shouldValidateElement) {
            if (!empresa) {
                return buildInvalidOption("Selecione uma empresa")
            }
        }
        return buildValidOption();
    }

    return (
        <ModalSearch<Empresa>
            controller={controller}
            title="Pesquisa de Empresas"
            filterPlaceHolder="Nome da Empresa"
            url={`empresas/find`}
            getData={ApiRm.request}
            apiFilter={true}
            fields={[
                { key: "nome", label: "Nome" }, { key: "nomeFantasia", label: "Razão Social" }
            ]}
            filterKey="nome"
            multipleSelection={multipleSelection}
            allowEmptySearch={true}
            selectedOptions={selectedOptions}
            validateElement={validateEmpresa}
        />
    )
}