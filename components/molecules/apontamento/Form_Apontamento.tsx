import InputText from "@atoms/Input_Text";
import InputSearch from "@atoms/Input_Search";
import InputSelect from "@atoms/Input_Select";
import InputDate from "@atoms/Input_Date";
import InputSwitch from "@atoms/Input_Switch";
import InputHoras from "@atoms/Input_Hours";
import ApontamentoStyle from "@styles/apontamento.module.css";
import GridStartEndStyle from "@styles/grid_start_end.module.css";
import useModal from "@hooks/useModal";
import { Projeto, Secao } from "@/types";
import ModalSearchProjeto from "@modal/search/Modal_Search_Projeto";
import ModalSearchSecao from "@modal/search/Modal_Search_Secao";

export default function FormApontamento({ apontamentoInputs, day, month, year, submit }) {

    const modalSearchProjeto = useModal((projeto: Projeto, _) => apontamentoInputs.projeto[1](projeto));
    const modalSearchSecao = useModal((secao: Secao, _) => apontamentoInputs.secao[1](secao));

    const getGridStart = (start: number) => {
        if (apontamentoInputs.isSecaoJornadaEspecifica[0]) {
            start++;
        }
        return `grid-start-${start}`;
    }

    const getGridEnd = (end: number) => {
        if (apontamentoInputs.isSecaoJornadaEspecifica[0]) {
            end++;
        }
        return `grid-end-${end}`;
    }

    return (
        <>
            <form className={ApontamentoStyle["apontamento-form"]} onSubmit={submit}>
                <InputText
                    label="Nome"
                    name="nomeColaborador"
                    id="nomeColaborador"
                    datacy="nomeColaborador"
                    stateInput={apontamentoInputs.user}
                    readOnly={true}
                    gridStart="grid-start-1"
                    gridEnd="grid-end-3"
                />

                <InputSearch
                    label='Seção'
                    name="secaoApontamento"
                    id="secao"
                    datacy="secao"
                    stateKey="descricao"
                    stateInput={apontamentoInputs.secao}
                    openModal={() => modalSearchSecao.open()}
                    gridStart="grid-start-3"
                    gridEnd="grid-end-5"
                />

                <InputSearch
                    label='Projeto'
                    name="projeto"
                    id="projeto"
                    datacy="projeto"
                    stateKey="codigo"
                    stateInput={apontamentoInputs.projeto}
                    openModal={() => modalSearchProjeto.open()}
                    gridStart="grid-start-5"
                    gridEnd="grid-end-7"
                />

                <InputSelect
                    label="Atividade"
                    name="atividade"
                    id="atividade"
                    hiddenOption={true}
                    defaultOptionText="Projeto não possui seções associadas"
                    stateSelect={apontamentoInputs.atividades}
                    getContent={(item: any) => `${item.codigo} - ${item.nome}`}
                    readOnly={!apontamentoInputs.projeto[0]}
                    readOnlyText="Selecione um projeto"
                    emptyOptionsMessage="Nenhuma atividade encontrada para o projeto selecionado"
                    datacy="atividade"
                    gridStart="grid-start-7"
                    gridEnd="grid-end-9"
                />

                <InputDate
                    label='Data'
                    name="data"
                    id="data"
                    datacy="data"
                    stateInput={apontamentoInputs.date}
                    handleChange={(inputDate: string) => {
                        const date = inputDate.split("-");
                        if (date.length === 3) {
                            const [yearValue, monthValue, dayValue] = date;
                            month[1](parseInt(monthValue) - 1);
                            year[1](parseInt(yearValue));
                            day[1](dayValue);
                        }
                        day[1](null);
                    }}
                    gridStart="grid-start-9"
                    gridEnd="grid-end-10"
                />

                {apontamentoInputs.isSecaoJornadaEspecifica[0] ?
                    <>
                        <InputHoras
                            label="Hora de Entrada"
                            name="horaEntrada"
                            id="horas"
                            datacy="horas"
                            gridStart="grid-start-10"
                            stateValue={apontamentoInputs.horaEntrada}
                            gridEnd="grid-end-11"
                            handleChange={(value: string) => {
                                const [hour, minutes] = value.split(":");
                                apontamentoInputs.horaEntrada[1](parseFloat((parseInt(hour) + (parseInt(minutes) / 60)).toFixed(2)));
                                return value;
                            }}
                        />
                        <InputHoras
                            label="Hora de Saída"
                            name="horaSaída"
                            id="horas"
                            datacy="horas"
                            gridStart="grid-start-1"
                            stateValue={apontamentoInputs.horaSaida}
                            gridEnd="grid-end-2"
                            handleChange={(value: string) => {
                                const [hour, minutes] = value.split(":");
                                apontamentoInputs.horaSaida[1](parseFloat((parseInt(hour) + (parseInt(minutes) / 60)).toFixed(2)));
                                return value;
                            }}
                        />
                    </>
                    :
                    <InputHoras
                        label="Horas"
                        name="horas"
                        id="horas"
                        datacy="horas"
                        gridStart="grid-start-10"
                        stateValue={apontamentoInputs.horas}
                        gridEnd="grid-end-11"
                        handleChange={(value: string) => {
                            const [hour, minutes] = value.split(":");
                            apontamentoInputs.horas[1](parseFloat((parseInt(hour) + (parseInt(minutes) / 60)).toFixed(2)));
                            return value;
                        }}
                    />
                }

                <InputText
                    label="Observações"
                    name="observacoes"
                    id="observacoes"
                    datacy="observacoes"
                    stateInput={apontamentoInputs.observacao}
                    gridStart={getGridStart(1)}
                    gridEnd={getGridEnd(5)}
                />

                <InputSearch
                    label="Documento"
                    name="documento"
                    id="documento"
                    datacy="documento"
                    stateInput={apontamentoInputs.documento}
                    openModal={() => null}
                    gridStart={getGridStart(5)}
                    gridEnd={getGridEnd(7)}
                    readOnly={true}
                />

                <InputSwitch
                    label="LD Pendente?"
                    name="ld"
                    id="ld"
                    datacy="ld"
                    stateInput={apontamentoInputs.ld}
                    gridStart={getGridStart(7)}
                    gridEnd={getGridEnd(8)}
                />

                <div className={`${ApontamentoStyle["container-cadastro-submit"]} ${GridStartEndStyle["grid-start-9"]} ${GridStartEndStyle["grid-end-11"]}`}>
                    <button
                        type="submit"
                        data-cy="submitApontamento"
                        className={`${ApontamentoStyle["cadastro-submit-button"]}`}>
                        Cadastrar
                    </button>
                </div>

            </form>
            <ModalSearchProjeto
                controller={modalSearchProjeto}
            />

            <ModalSearchSecao
                controller={modalSearchSecao}
                shouldValidateElement={true}
            />
        </>
    )
}