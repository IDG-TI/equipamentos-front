import ApiApontamento from "@apis/api_apontamento"
import ModalSearch, { buildInvalidOption, buildValidOption } from "@modal/search/Modal_Search"
import formatDate from "@formats/format_Date"
import { ModalSearchImplProps, Periodo } from "@/types";

export default function ModalSearchPeriodo({
    controller,
    multipleSelection = false,
    selectedOptions,
    shouldValidateElement = false,
}: ModalSearchImplProps<Periodo>) {

    function validatePeriodo(periodo: any) {
        if (shouldValidateElement) {
            if (!periodo) {
                return buildInvalidOption("Período inválido");
            }
        }
        return buildValidOption();
    }

    return (
        <ModalSearch
            controller={controller}
            title="Pesquisa de Período"
            filterPlaceHolder="Data no período"
            url={`periodo`}
            getData={ApiApontamento.request}
            apiFilter={true}
            fields={[
                { key: "inicio", label: "Início", getter: formatDate }, { key: "fim", label: "Fim", getter: formatDate }
            ]}
            filterKey="date"
            multipleSelection={multipleSelection}
            allowEmptySearch={true}
            selectedOptions={selectedOptions}
            validateElement={validatePeriodo}
            inputType="date"
        />
    )
}