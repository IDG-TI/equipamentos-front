import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ApiApontamamento from "@apis/api_apontamento";
import { useState, useEffect } from "react";
import RelatorioStyle from "@styles/relatorio.module.css";
import InputSwitch from "@atoms/Input_Switch";
import showInfoToast from "@toasts/info_toast";

export default function RelatorioGeralDashboard({
    data,
    markGroup,
    groupMarked,
    activeTab,
    addField,
    removeField,
    cleanFields,
    groupByMonthState,
    componentDatacy
}) {

    const [groups, setGroups] = useState<string[]>([]);
    const [fields, setFields] = useState<string[]>([]);
    const [dataGroup, setDataGroup] = useState<string>("");
    const [markedFields, setMarkedFields] = useState<string[]>([]);
    const [renderedData, setRenderedData] = useState<JSX.Element>(<></>);
    const [fieldsColors, setFieldsColors] = useState<string[]>([]);


    function toggleField(field) {
        if (markedFields.includes(field)) {
            removeField(field)
            setMarkedFields(markedFields.filter(f => f != field))
        } else {
            addField(field)
            setMarkedFields([...markedFields, field])
        }
    }

    useEffect(function updateDashboard() {
        setDataGroup(groupMarked);
    }, [data])

    useEffect(function clearFields() {
        if (cleanFields) {
            setMarkedFields([]);
            setFieldsColors(new Array(fields.length).fill("#2E375A"))
        }
    }, [cleanFields])

    useEffect(function warnUserToReloadDashboard() {
        showInfoToast("Ao alterar as configurações, recarregue o dashboard para visualizar as alterações.")
    }, [])

    useEffect(function setDefaultColosForFields() {
        setFieldsColors(new Array(fields.length).fill("#2E375A"))
    }, [fields])

    useEffect(() => {
        ApiApontamamento.request(
            {
                path: "apontamento/agrupar/campo/agrupador",
                method: "GET",
                onSuccess: (data) => {
                    setGroups(data)
                },
                actionName: "Listar",
                name: "Agrupadores"
            }
        )
        ApiApontamamento.request(
            {
                path: "apontamento/agrupar/campo/resultado",
                method: "GET",
                onSuccess: (data) => {
                    setFields(data)
                },
                actionName: "Listar",
                name: "Campos"
            }
        )
    }, [])


    useEffect(function renderData() {
        setRenderedData(data ?
            <div data-cy="filterTabDashboardGraph" className={RelatorioStyle["dashboards"]}>
                {renderDashboards()}
            </div>
            : <div className={RelatorioStyle["dashboards--empty"]}>
                <img className={RelatorioStyle["dashbord-svg"]} src="dashboard-animate.svg" alt="Clique em gerar dashboard" />
                <span className={RelatorioStyle["emoji-container"]}>Defina ao menos um campo para gerar o dashboard.</span>
            </div>)
    }, [data])

    const renderDashboards = () => {
        if (groupByMonthState[0] && data[0] instanceof Object) {
            return (
                <>
                    {data.map((groupElement: Object, groupIndex) => {
                        return Object.entries(groupElement).map((grouped, monthIndex: number,) => {
                            return <div key={monthIndex * groupIndex} className={RelatorioStyle["dashboard-grouped"]}>
                                <p className={RelatorioStyle["dashboard-grouped-title"]}>{`${groupMarked} - ${grouped[0]}`}</p>
                                <div className={RelatorioStyle["dashboard-grouped-graphs"]}>
                                    {markedFields.map((field, index) => {
                                        return (
                                            <>
                                                <ResponsiveContainer key={index * monthIndex * groupIndex} width={"45%"} height={300}>
                                                    <AreaChart data={grouped[1]}>
                                                        <Area type="monotone" dataKey={field} fill={fieldsColors[index]} stroke={fieldsColors[index]} strokeWidth={3} />
                                                        <CartesianGrid stroke="#ccc" />
                                                        <XAxis dataKey={"competencia"} />
                                                        <Tooltip />
                                                        <YAxis />
                                                        <Legend />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        })
                    })}
                </>
            )
        }
        return (
            <>
                {markedFields.map((field, index) => {
                    return (
                        <ResponsiveContainer key={index} width={"45%"} height={300}>
                            <AreaChart data={data}>
                                <Area type="monotone" dataKey={field} fill={fieldsColors[index]} stroke={fieldsColors[index]} strokeWidth={3} />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey={groupMarked} />
                                <Tooltip />
                                <YAxis />
                                <Legend />
                            </AreaChart>
                        </ResponsiveContainer>
                    )
                })}
            </>
        )
    }

    return (
        <div data-cy={componentDatacy} className={RelatorioStyle["dashboard-container"]} style={{ display: activeTab ? "block" : "none" }}>
            <div className={RelatorioStyle["dashboard-config-container"]}>
                <ul className={RelatorioStyle["dashboard-config"]}>
                    <span className={RelatorioStyle["dashboard-span"]}>Agrupar apontamentos por:</span>
                    {Array.isArray(groups) && groups.map((group, index) => {
                        return (
                            <li
                                key={index}
                                className={RelatorioStyle["dashboard-config-item"]}
                                onClick={() => markGroup(group)}>

                                <input
                                    data-cy="filterTabDashboardCheckboxGrouper"
                                    onChange={() => markGroup(group)}
                                    checked={group == groupMarked}
                                    type="checkbox" />
                                {group}
                            </li>
                        )
                    })}
                    <div className={RelatorioStyle["dashboard-switch-container"]}>
                        <InputSwitch label="Agrupar por mês" name="group-by-month" id="group-by-month" datacy="filterTabDashboardCheckboxGrouperMonth" stateInput={groupByMonthState} />
                    </div>
                </ul>
                <ul className={RelatorioStyle["dashboard-config"]} aria-label="Resultados a serem dispostos:">
                    <span className={RelatorioStyle["dashboard-span"]}>Campos do Dashboard:</span>
                    {Array.isArray(fields) && fields.map((field, index) => {
                        return (
                            <li key={index} className={RelatorioStyle["dashboard-config-item"]}  >
                                <input
                                    data-cy="filterTabDashboardCheckboxFields"
                                    checked={markedFields.includes(field)}
                                    type="checkbox"
                                    onChange={() => toggleField(field)}
                                />

                                <span
                                    className={RelatorioStyle["dashboard-config-item-name"]}
                                    onClick={() => toggleField(field)}>
                                    {field}
                                </span>

                                <input
                                    type="color"
                                    value={fieldsColors[index] ?? ""}
                                    onChange={(e) => setFieldsColors([...fieldsColors.slice(0, index), e.target.value, ...fieldsColors.slice(index + 1)])}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            {renderedData}
        </div>


    )
}