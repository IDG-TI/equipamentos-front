import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import PainelGestorStyle from "@styles/painel_gestor.module.css";
import { DashboardCard, Projeto } from "@/types";

export default function GraphicProjetoBar({
  dashboardCard,
}: {
  dashboardCard: DashboardCard<Projeto>;
}) {
  const { data, title, customToolTip } = dashboardCard;

  return (
    <>
      <p className={PainelGestorStyle["text-painel-gestor"]}>{title}</p>
      <ResponsiveContainer width="90%" height="90%">
        <BarChart data={data} accessibilityLayer>
          <XAxis
            dataKey="projeto_codigo"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            style={{ fontSize: "12px" }}
          />
          <YAxis />
          <Tooltip content={customToolTip} />
          <Legend iconType={"plainline"} />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="horas"
            fill="#2f385b"
            barSize={40}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
