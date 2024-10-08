import { ModalSearchImplProps, Projeto } from "@/types";
import ApiContrato from "@apis/api_contrato"
import ModalSearch, { buildInvalidOption, buildValidOption } from "@modal/search/Modal_Search"

export default function ModalSearchProjeto({
    controller,
    multipleSelection = false,
    selectedOptions,
    shouldValidateElement = false
}: ModalSearchImplProps<Projeto>) {

    function validateProjeto(projeto: Projeto) {
        if (shouldValidateElement) {
            if (!projeto) {
                return buildInvalidOption("Selecione um projeto")
            }
        }
        return buildValidOption();
    }

    return (
        <ModalSearch<Projeto>
            controller={controller}
            title="Pesquisa de Projeto"
            filterPlaceHolder="Código do Projeto"
            url={`projeto/find`}
            getData={ApiContrato.request}
            apiFilter={true}
            fields={[
                { key: "codigo", label: "Código" }, { key: "titulo", label: "Título" }
            ]}
            filterKey="codigo"
            multipleSelection={multipleSelection}
            selectedOptions={selectedOptions}
            validateElement={validateProjeto}
        />
    )
}