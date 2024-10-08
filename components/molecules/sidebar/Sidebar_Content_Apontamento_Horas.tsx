import SidebarStyle from "@styles/sidebar.module.css"
import { useEffect, useState } from "react"
import ApiApontamento from "@apis/api_apontamento";
import formatDate from "@formats/format_Date";
import formatMoney from "@formats/format_Money";
import formatNumber from "@formats/format_Number";
import InputStyle from "@styles/inputs.module.css"
import { RegistroExtraordininario, UserDataInTime } from "@types";

export default function SidebarContentApontamentoHoras({ apontamentos, date }: any) {

    const [userData, setUserData] = useState<UserDataInTime | null>(null);
    const [year, month, day] = date.split("-");

    const [oldDay, setOldDay] = useState(day);
    const [oldMonth, setOldMonth] = useState(day);


    
    const changedPeriodoRange = oldMonth!=month || (oldDay < 26 && day > 25) || (oldDay > 25 && day < 26);
    /**
     * Lidar com mudanças de período, para não fazer um fetch sempre que o usuário trocar o dia
     */
    const mustLoadPeriodoUser = () => date && day && changedPeriodoRange;

    useEffect(function getPeriodoUser() {
        if (mustLoadPeriodoUser()) {
            ApiApontamento.request({
                path: 'periodo/user',
                method: 'GET',
                actionName: 'Listar',
                onSuccess: (resp)=>{
                    
                    setUserData(resp)
                },
                onError: () => {
                    setUserData(null);
                },
                params: { day: date },
                showToastOnError: false
            })
        }
        setOldDay(day);
        setOldMonth(month);
    }, [date])

    const SIDEBAR_CONTENT_APONTAMENTO_HORAS = {
        horasApontadasDia: useState(0),
        horasApontadasMes: useState(0),
        registros: useState([]),
        showValue: useState(false)
    }

    useEffect(() => {
        {
            day && apontamentos && apontamentos[day] ? SIDEBAR_CONTENT_APONTAMENTO_HORAS.horasApontadasDia[1](apontamentos[day] ? apontamentos[day].reduce((acc: any, current: any) => {
                return acc + current.horas
            }, 0) : 0) : SIDEBAR_CONTENT_APONTAMENTO_HORAS.horasApontadasDia[1](0)
        }

        SIDEBAR_CONTENT_APONTAMENTO_HORAS.horasApontadasMes[1](Object.entries(apontamentos).reduce((acc: number, pair: any) => {
            return acc + pair[1].reduce((acc: any, current: any) => acc + current.horas, 0)
        }, 0))

    }, [apontamentos, day])

    useEffect(function getRegistoExtraordinario() {
        ApiApontamento.request({
            path: "registro-extraordinario",
            method: "GET",
            actionName: "Listar",
            onSuccess: (data) => {
                SIDEBAR_CONTENT_APONTAMENTO_HORAS.registros[1](data)
            }
        })
    }, [apontamentos]);

    function getHorasFormated(floatHoras: number) {
        const hours = Math.floor(floatHoras / 1);
        const minutes = (floatHoras % 1) * 60;
        return `${formatNumber(hours, 2)}:${formatNumber(parseFloat(minutes.toFixed(2)), 2)}`;
    }

    return (
        <div data-cy="sidebarContentApontamentoHoras" className={SidebarStyle["sidebar-content"]}>
            <fieldset className={SidebarStyle["fieldset"]}>
                <legend className={SidebarStyle["fieldset-legend"]}>Horas Apontadas</legend>
                <div className={SidebarStyle["fieldset-div"]}>
                    <span className={SidebarStyle["fieldset-span"]}>Dia: {day??""}</span>
                    <span className={SidebarStyle["fieldset-span"]}>{getHorasFormated(SIDEBAR_CONTENT_APONTAMENTO_HORAS.horasApontadasDia[0])} hrs</span>
                </div>
                <div className={SidebarStyle["fieldset-div"]}>
                    <span className={SidebarStyle["fieldset-span"]}>Mês - {month?? ""}:</span>
                    <span className={SidebarStyle["fieldset-span"]}>{getHorasFormated(SIDEBAR_CONTENT_APONTAMENTO_HORAS.horasApontadasMes[0])} hrs</span>
                </div>
            </fieldset>

            <fieldset className={SidebarStyle["fieldset"]}>
                <legend className={SidebarStyle["fieldset-legend"]}>Resumo Período</legend>
                <div className={SidebarStyle["fieldset-div"]}>
                    <strong>{userData ? `${userData ? formatDate(userData.periodo.inicio) : '-'} - ${formatDate(userData.periodo.fim)}` : null}</strong>
                </div>
                <div className={SidebarStyle["fieldset-div"]}>
                    <span className={SidebarStyle["fieldset-span"]}>Horas Apontadas: </span>
                    <span className={SidebarStyle["fieldset-span"]}>{userData ? getHorasFormated(userData.horas) : '-'} hrs</span>
                </div>
                <div className={SidebarStyle["fieldset-div"]}>
                    <span className={SidebarStyle["fieldset-span"]}>Valor a receber: </span>
                    <div onClick={() => SIDEBAR_CONTENT_APONTAMENTO_HORAS.showValue[1](!SIDEBAR_CONTENT_APONTAMENTO_HORAS.showValue[0])}>
                        {SIDEBAR_CONTENT_APONTAMENTO_HORAS.showValue[0] ?
                            <div className={SidebarStyle["container-fieldset-svg"]}>
                                <span className={SidebarStyle["fieldset-span"]}>{userData ? formatMoney(userData.valor) : '-'}</span>
                                < svg className={SidebarStyle["fieldset-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                            </div>
                            :
                            <div className={SidebarStyle["container-fieldset-svg"]}>
                                <span className={SidebarStyle["fieldset-span"]}> <input name="hiddenValue" className={InputStyle["input-value--hidden"]} type="password" readOnly value={99999999} /></span>
                                <svg className={SidebarStyle["fieldset-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" /></svg>
                            </div>
                        }
                    </div>
                </div>
            </fieldset >

            <fieldset className={SidebarStyle["fieldset"]}>
                <legend className={SidebarStyle["fieldset-legend"]}>Registros Extraordinários</legend>
                <div className={SidebarStyle["fieldset-table-container"]}>
                    <table className={SidebarStyle["fieldset-table"]}>
                        <thead className={SidebarStyle["fieldset-tablehead"]}>
                            <tr>
                                <th className={SidebarStyle["fieldset-tablehead-cell"]}>Tipo</th>
                                <th className={SidebarStyle["fieldset-tablehead-cell"]}>Período</th>
                                <th className={SidebarStyle["fieldset-tablehead-cell"]}>Saldo</th>
                                <th className={SidebarStyle["fieldset-tablehead-cell"]}>Validade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(SIDEBAR_CONTENT_APONTAMENTO_HORAS.registros[0]) && SIDEBAR_CONTENT_APONTAMENTO_HORAS.registros[0].map((registro: RegistroExtraordininario, index: number) => {
                                return (
                                    <tr className={SidebarStyle["fieldset-tablerow"]} key={index}>
                                        <td className={SidebarStyle["fieldset-tablebody-cell"]}>{registro.tipo}</td>
                                        <td className={SidebarStyle["fieldset-tablebody-cell"]}>{formatDate(registro.inicio)} - {formatDate(registro.fim)}</td>
                                        <td className={SidebarStyle["fieldset-tablebody-cell"]}>{getHorasFormated(registro.saldo)}</td>
                                        <td className={SidebarStyle["fieldset-tablebody-cell"]}>{registro.cancelado ? 'Vencido' : 'Ativo'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </fieldset>
        </div >
    )
}