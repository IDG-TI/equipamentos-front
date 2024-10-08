import ApiContrato from "@apis/api_contrato"
import ModalSearch from "@modal/search/Modal_Search"
import { ModalSearchProps, ModalProps, ModalSearchImplProps, AtividadeApontamento } from "@types"

export default function ModalSearchAtividadesProjeto({
    controller,
    multipleSelection = false,
    selectedOptions
}:ModalSearchImplProps<AtividadeApontamento>) {
    return (
        <ModalSearch<AtividadeApontamento>
            controller={controller}
            title="Pesquisa de Atividade"
            filterPlaceHolder="Nome da Atividade"
            url={`tabela/atividade-apontamento-projeto/list`}
            getData={ApiContrato.request}
            apiFilter={false}
            fields={[
                { key: "codigo", label: "Código" }, { key: "nome", label: "Nome" }
            ]}
            filterKey="nome"
            multipleSelection={multipleSelection}
            allowEmptySearch={true}
            selectedOptions={selectedOptions}
        />
    )
}