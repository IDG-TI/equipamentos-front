import {
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    Legend,
    Rectangle,
    AreaChart,
    Label,
    Area,
} from 'recharts'
import PainelGestorStyle from '@styles/painel_gestor.module.css'
import { Atividade, DashboardCard } from '@/types'

export default function GraphicAtividadeArea({ dashboardCard }: {
    dashboardCard: DashboardCard<Atividade>
}) {

    const { data, title, customToolTip } = dashboardCard;

    return (
        <>
            <p className={PainelGestorStyle["text-painel-gestor"]}>{title}</p>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="2f385b" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2f385b" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#2f385b" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="fab06b" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fab06b" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#fab06b" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="atividade_nome"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        style={{ fontSize: "12px" }}
                    />
                    <Label value="" offset={0} position="insideBottom" />
                    <YAxis />
                    <Tooltip content={customToolTip} />
                    <Area
                        type="monotone"
                        dataKey="valor"
                        stackId="valor"
                        strokeWidth={2}
                        stroke="#2f385b"
                        fillOpacity={1}
                        fill="url(#2f385b)"
                    />
                    <Area
                        type="monotone"
                        dataKey="horas"
                        stackId="horas"
                        strokeWidth={2}
                        stroke="#fab06b"
                        fillOpacity={1}
                        fill="url(#fab06b)"
                    />
                </AreaChart>

            </ResponsiveContainer>
        </>
    )
}