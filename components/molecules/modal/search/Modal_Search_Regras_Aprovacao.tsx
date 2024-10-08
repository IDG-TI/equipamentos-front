import ModalSearch from "@modal/search/Modal_Search"
import ApiApontamento from "@apis/api_apontamento"
import { ModalSearchImplProps, RegrasAprovacao } from "@types"
import api_apontamento from "@util/apis/api_apontamento"

export default function ModalSearchRegrasAprovacao({
    controller,
    multipleSelection = false,
    selectedOptions
}: ModalSearchImplProps<RegrasAprovacao>) {
    return (
        <ModalSearch<RegrasAprovacao>
            controller={controller}
            title="Pesquisa de Regras de Aprovação"
            filterPlaceHolder="Código"
            url={`regra-aprovacao`}
            getData={ApiApontamento.request}
            apiFilter={false}
            fields={[
                { key: "codigo", label: "Código" }, { key: "tipo", label: "Tipo Aprv." }
            ]}
            filterKey="codigo"
            multipleSelection={multipleSelection}
            allowEmptySearch={true}
            selectedOptions={selectedOptions}
        />
    )
}