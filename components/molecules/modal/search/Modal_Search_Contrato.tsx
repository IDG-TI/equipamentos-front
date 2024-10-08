import { Contrato, ModalProps, ModalSearchImplProps } from "@/types";
import ApiContrato from "@apis/api_contrato"
import ModalSearch, { buildInvalidOption, buildValidOption } from "@modal/search/Modal_Search"

export default function ModalSearchContrato({
    controller,
    multipleSelection = false,
    selectedOptions,
    shouldValidateElement = false
}: ModalSearchImplProps<Contrato>) {

    function validateContrato(contrato: Contrato) {
        if (shouldValidateElement) {
            if (!contrato) {
                return buildInvalidOption("Selecione um colaborador")
            }
        }
        return buildValidOption();
    }

    return (
        <ModalSearch<Contrato>
            controller={controller}
            title="Pesquisa de Contrato"
            filterPlaceHolder="Código do Contrato"
            url={`contrato/find`}
            getData={ApiContrato.request}
            apiFilter={true}
            fields={[
                { key: "codigo", label: "Código" }, { key: "titulo", label: "Título" }
            ]}
            filterKey="codigo"
            multipleSelection={multipleSelection}
            selectedOptions={selectedOptions}
            validateElement={validateContrato}
        />
    )
}