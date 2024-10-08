import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    BarChart,
    Legend,
    Bar,
    Rectangle,
} from 'recharts'
import PainelGestorStyle from '@styles/painel_gestor.module.css'
import { ValorMes, DashboardCard, GraphicAtividadeBarCard } from '@/types'


export default function GraphicValorHorasBar({ dashboardCard, graphicAtividadeBarCar }: {
    dashboardCard: DashboardCard<ValorMes>
    graphicAtividadeBarCar: GraphicAtividadeBarCard
}) {

    const { data, title, customToolTip } = dashboardCard;
    const { datakey, fill, activeFill } = graphicAtividadeBarCar;

    return (

        <>
             <p className={PainelGestorStyle["text-painel-gestor"]}>{title}</p>
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={data} accessibilityLayer>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="mes"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        style={{ fontSize: "12px" }}
                    />
                    <YAxis />
                    <Tooltip content={customToolTip} />
                    <Legend iconType={"plainline"} />
                    <Bar
                        dataKey={datakey}
                        barSize={40}
                        radius={[8, 8, 0, 0]}
                        fill={fill}
                        activeBar={<Rectangle
                            fill={activeFill}
                            stroke="white"
                        />
                        }>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}