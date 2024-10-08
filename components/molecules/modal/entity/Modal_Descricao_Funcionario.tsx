"use client"
import { ApontamentoColaborador, ColaboradorData, ColaboradorPeriodo, DashboardCard, ModalProps, Periodo, Projeto } from "@/types";
import Modal from "./Modal";
import ModalStyle from "@styles/modal.module.css"
import { useEffect, useRef, useState } from "react";
import ApiApontamento from "@util/apis/api_apontamento";
import { Legend, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import PainelGestorStyle from '@styles/painel_gestor.module.css'
import formatDate from "@util/formats/format_Date";
import PainelGestorCard from "@components/atoms/PainelGestorCard";
import formatMoney from "@util/formats/format_Money";
import Loading from "@components/molecules/Loading";
import { Skeleton } from "@mui/material";


interface ModalDescriçãoFuncionarioProps extends ModalProps {
    periodo: Periodo;
}

const ModalDescriçãoFuncionario = ({ controller, periodo }: ModalDescriçãoFuncionarioProps) => {
    const [colaboradorSelect, setColaboradorSelect] = useState<ColaboradorPeriodo | null>(null);
    const [colaboradorData, setColaboradorData] = useState<ColaboradorData>({ atividades: Object[""], apontamentos: Object[""] } as ColaboradorData)
    const { nome, codigo } = controller.markedElement === null ? { nome: '', codigo: '' } : controller.markedElement;
    const [isLoading, setIsLoading] = useState(true);
    const [observacao, setObservacao] = useState<string | null>(null);

    const textoRef = useRef<HTMLSpanElement>(null);
    const [isTyping, setIsTyping] = useState(false);

    const totalHorasExtras = colaboradorData.apontamentos?.reduce((total, apontamento) => {
        return total + apontamento.horasExtras;
    }, 0);
    const valorHora = colaboradorData.apontamentos?.length > 0 ? colaboradorData.apontamentos[0].valorHora : 0;
    const valorTotalCLT = colaboradorData.projetos?.reduce((total, projeto) => {
        return total + projeto.valor;
    }, 0);

    const typeWriter = (element: HTMLElement, texto: string) => {
        const textoArray = texto.split('');
        element.innerHTML = '';
        textoArray.forEach((letra, i) => {
            setTimeout(() => element.innerHTML += letra, 10 * i);
        });
    };

    useEffect(function UpdateObservacao() {
        const newObservacao = colaboradorData.apontamentos?.map((item: ApontamentoColaborador) => item.observacao?.trim() ? item.observacao : "Sem Observação").join(' - ');
        setObservacao(newObservacao);
    }, [colaboradorData]);

    useEffect(() => {
        if (textoRef.current && observacao) {

            setIsTyping(true);
            typeWriter(textoRef.current, observacao);

            const typingDuration = (observacao.length || 0) * 10;
            const timeoutId = setTimeout(() => {
                setIsTyping(false);
            }, typingDuration);

            return () => {
                clearTimeout(timeoutId);
                setIsTyping(false);
            };
        }
    }, [controller, observacao]);

    useEffect(function ColaboratorInfo() {
        if (controller.markedElement) {
            setIsLoading(true);
            ApiApontamento.request({
                path: `painel-gestor/colaborador/${codigo}/${periodo?.id}`,
                method: 'GET',
                actionName: "Listar",
                name: "Colaborador",
                onSuccess: (data: any) => {
                    setIsLoading(false);
                    setColaboradorData(data)
                    setColaboradorSelect(data.colaborador[0]);
                }
            });
        }
    }, [controller.markedElement]);

    const COLORS = ['#2F385B', '#485071', '#616986', '#7A819C', '#9399B1', '#ACB2C7', '#C5CADC'];

    return (
        <Modal
            controller={controller}
            title={`RESUMO ${nome} PERÍODO INÍCIO - ${formatDate(periodo?.inicio)} - PERÍODO FIM - ${formatDate(periodo?.fim)}`}
            customModalTemplate={'modal-funcionario-template'}
            body={
                <div className={ModalStyle["container-funcionario-template"]}>
                    <PainelGestorCard
                        name="Horas Trabalhadas"
                        value={colaboradorData.horas}
                        icon="horas"
                        customClass={ModalStyle["card-information"]}
                        isLoading={isLoading}
                    />

                    <PainelGestorCard
                        name="Valor"
                        value={colaboradorData.valor === 0 ? valorTotalCLT : colaboradorData.valor}
                        icon="valorHoras"
                        format={formatMoney}
                        customClass={ModalStyle["card-example"]}
                        isLoading={isLoading}

                    />

                    <PainelGestorCard
                        name="Horas Extras"
                        value={totalHorasExtras}
                        icon="horas"
                        customClass={ModalStyle["card-hour"]}
                        isLoading={isLoading}
                    />

                    <PainelGestorCard
                        name="Valor Hora"
                        value={valorHora}
                        icon="valorHoras"
                        format={formatMoney}
                        customClass={ModalStyle["card-valuehour"]}
                        isLoading={isLoading}
                    />

                    <div className={ModalStyle["card-descricao"]}>
                        {isLoading ? (
                            <>
                                <Skeleton variant="rounded" width={200} height={30} animation="wave" />
                                <Skeleton variant="rounded" width={"100%"} height={"100%"} animation="wave" />
                            </>
                        ) : (
                            <>
                                <p className={ModalStyle["title-cards"]}>DESCRIÇÃO</p>
                                <span ref={textoRef} className={ModalStyle["text-descricao"]}></span>
                            </>
                        )}

                    </div>

                    <div className={ModalStyle["card-list-colaborator"]}>
                        {isLoading ? (
                            <>
                                <Skeleton variant="rounded" width={400} height={30} animation="wave" />
                                <Skeleton variant="rounded" width={"100%"} height={"100%"} animation="wave" />
                            </>
                        ) : (
                            <>
                                <p className={ModalStyle["title-cards"]}>APONTAMENTOS COLABORADOR</p>
                                <table className={ModalStyle["table"]}>
                                    <thead className={ModalStyle["tablehead"]}>
                                        <tr>
                                            <th className={ModalStyle["tablehead-cell"]}>Observação</th>
                                            <th className={ModalStyle["tablehead-cell"]}>Data</th>
                                            <th className={ModalStyle["tablehead-cell"]}>Horas</th>
                                            <th className={ModalStyle["tablehead-cell"]}>Hora Extra</th>
                                            <th className={ModalStyle["tablehead-cell"]}>Centro de Custo</th>
                                            <th className={ModalStyle["tablehead-cell"]}>Projeto</th>
                                        </tr>
                                    </thead>
                                    <tbody className={ModalStyle["tbody"]}>
                                        {Array.isArray(colaboradorData.apontamentos) && colaboradorData.apontamentos.map((item: ApontamentoColaborador, index: number) =>
                                            <tr key={index} className={`${ModalStyle["line"]}`}>
                                                <td className={ModalStyle["line-td"]}>
                                                    {item?.observacao?.length > 0 ? item?.observacao : "Sem Observação"}
                                                </td>
                                                <td className={ModalStyle["line-td"]}>
                                                    {formatDate(item?.data)}
                                                </td>
                                                <td className={ModalStyle["line-td"]}>
                                                    {item?.horas.toFixed(2)}
                                                </td>
                                                <td className={ModalStyle["line-td"]}>
                                                    {item?.horasExtras}
                                                </td>
                                                <td className={ModalStyle["line-td"]}>
                                                    {item?.centroCusto}
                                                </td>
                                                <td className={ModalStyle["line-td"]}>
                                                    {item.projetoCodigo}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </>
                        )}

                    </div>



                    <div className={ModalStyle["card-graphic"]}>
                        {isLoading ? (
                            <>
                                <Skeleton variant="rounded" width={400} height={30} animation="wave" />
                                <div className={ModalStyle["skeleton"]}>
                                    <Skeleton variant="circular" width={250} height={250} animation="wave" />
                                    <Skeleton variant="circular" width={250} height={250} animation="wave" />
                                </div>
                                <Skeleton variant="rounded" width={"60%"} height={100} animation="wave" />
                            </>
                        ) : (
                            <>
                                <p className={ModalStyle["title-cards"]}>
                                    ATIVIDADES E PROJETOS DO PERÍODO
                                </p >
                                <ResponsiveContainer width="90%" height="80%">
                                    <PieChart accessibilityLayer >
                                        <Pie
                                            data={colaboradorData.atividades}
                                            cx={180}
                                            cy={200}
                                            innerRadius={100}
                                            outerRadius={120}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="valor"
                                        >
                                            {colaboradorData.apontamentos?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Pie
                                            data={colaboradorData.projetos}
                                            cx={500}
                                            cy={200}
                                            innerRadius={100}
                                            outerRadius={120}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="valor"
                                        >
                                            {colaboradorData.apontamentos?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend verticalAlign="bottom" height={36} iconType="square" content={(props) => renderLegend(props, colaboradorData)} />
                                        <Tooltip content={<CustomToolTip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </>
                        )}

                    </div>
                </div >

            }
        />
    );
}

export default ModalDescriçãoFuncionario;

function CustomToolTip({ active, payload }: any) {
    if (active && payload && payload.length) {
        const { atividade_nome, projeto_codigo, colaboradores, horas, valor, mes } = payload[0].payload;

        let content, tooltipStyle, tooltipStyleText;

        if (atividade_nome) {
            content = `${atividade_nome}`
            tooltipStyle = PainelGestorStyle["custom-tooltip"]
            tooltipStyleText = PainelGestorStyle["label-tooltip"]
        } else {
            content = projeto_codigo ? projeto_codigo : `${mes.toUpperCase()}`
            tooltipStyle = PainelGestorStyle["custom-tooltip-area"]
            tooltipStyleText = PainelGestorStyle["label-tooltip-area"]
        }

        return (
            <div className={tooltipStyle}>
                <h4>{`${content}`}</h4>
                {colaboradores ? <p className={tooltipStyleText}>{`Colaboradores: ${colaboradores}`}</p> : null}
                <p className={tooltipStyleText}>{`Horas: ${horas}`}</p>
                <p className={tooltipStyleText}>{`Valor: ${formatMoney(valor)}`}</p>
            </div>
        )
    }
    return <></>;
}

const renderLegend = (props: any, colaboradorData: ColaboradorData) => {
    const { payload } = props;

    return (
        <ul style={{ display: 'flex', justifyContent: 'space-around', listStyleType: 'none', padding: 0, fontSize: "10px" }}>
            {/* Legend for activities */}
            <li>
                <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Atividades:</p>
                <ul>
                    {colaboradorData.atividades?.map((atividade, index) => (
                        <li key={`item-atividade-${index}`} style={{ color: payload[index]?.color, display: "flex", gap: "10px", alignItems: "center" }}>
                            <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: payload[index]?.color }}></div>
                            {atividade.atividade_nome}
                        </li>
                    ))}
                </ul>
            </li>

            {/* Legend for projects */}
            <li>
                <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>Projetos:</p>
                <ul>
                    {colaboradorData.projetos?.map((projeto, index) => (
                        <li key={`item-projeto-${index}`} style={{ color: payload[colaboradorData.atividades.length + index]?.color, display: "flex", gap: "10px", alignItems: "center" }}>
                            <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: payload[colaboradorData.atividades.length + index]?.color }}></div>
                            {projeto.projeto_codigo}
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
    );
};


