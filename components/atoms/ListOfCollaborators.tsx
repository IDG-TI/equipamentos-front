"use client"

import { useState } from 'react'
import PainelGestorStyle from '@styles/painel_gestor.module.css'
import { getAmountInHour } from '@util/formats/get_Amount_In_Hours'
import formatMoney from '@util/formats/format_Money'
import { Skeleton } from '@mui/material'
import { ColaboradorPeriodo, ListOfCollaboratorsCard } from '@/types'


export default function ListCollaboratos({ listOfCollaboratorsCard }: { listOfCollaboratorsCard: ListOfCollaboratorsCard }) {

    const { colaboradorFilter, setColaboradorFilter, showValue, setShowValue, filtredColaboradores, isLoadingFuncionarios, title } = listOfCollaboratorsCard;
    const [showSolicitadas, setShowSolicitadas] = useState(false);
    const [showEmAtraso, setShowEmAtraso] = useState(false);
    const openModal = listOfCollaboratorsCard.openModal;

    const handleSolicitadasChange = () => {
        setShowSolicitadas(!showSolicitadas);
        if (showEmAtraso) {
            setShowEmAtraso(false);
        }
    };

    const handleEmAtrasoChange = () => {
        setShowEmAtraso(!showEmAtraso);
        if (showSolicitadas) {
            setShowSolicitadas(false);
        }
    };

    const getFilteredColaboradores = () => {
        if (showSolicitadas) {
            return filtredColaboradores.filter(colaborador => colaborador.solicitado == true);
        } else if (showEmAtraso) {
            return filtredColaboradores.filter(colaborador => colaborador.atrasado == true);
        } else {
            return filtredColaboradores;
        }
    };

    function handleDoubleClick(colaborador: any) {
        filteredColaboradores.map((item: ColaboradorPeriodo, index: number) => {
            if (item.nome === colaborador.nome) {
                return {
                    ...item,
                }
            }
        })
        if (openModal) {
            openModal(colaborador);
        }
    }

    const filteredColaboradores = getFilteredColaboradores();

    return (
        <>
            <p className={PainelGestorStyle["text-painel-gestor"]}>{title}</p>
            <input
                type="text"
                id="searchInput"
                placeholder='Pesquisar colaborador'
                value={colaboradorFilter}
                onChange={(e) => setColaboradorFilter(e.target.value)}
                className={PainelGestorStyle["input-text"]}
            />

            <div className={PainelGestorStyle["container-button-show-value"]}>
                <input
                    type="checkbox"
                    value="solicitado"
                    checked={showSolicitadas}
                    onChange={handleSolicitadasChange}
                /> Solicitadas
                <input
                    type="checkbox"
                    value="atrasado"
                    checked={showEmAtraso}
                    onChange={handleEmAtrasoChange}
                /> Em Atraso
                <button
                    className={PainelGestorStyle["button-show-value"]}
                    onClick={() => setShowValue(!showValue)}>
                    {showValue ? "Ocultar Valores" : "Exibir Valores"}
                </button>
            </div>

            {isLoadingFuncionarios ? (
                <>
                    <div className={PainelGestorStyle["container-menu-storyset-list"]}>
                        <picture >
                            <img
                                className={PainelGestorStyle["image-storyset-list"]}
                                src="./painel-gestor-storyset.svg" alt="Ilustração da tela do painel gestor"
                            />
                        </picture>
                        <h1 className={PainelGestorStyle["title-message-list"]}>Selecione uma período para visualizar as informações.</h1>
                    </div>
                </>
            ) :
                (
                    <>
                        <table className={PainelGestorStyle["table"]}>
                            <thead className={PainelGestorStyle["tablehead"]}>
                                <tr>
                                    <th className={PainelGestorStyle["tablehead-cell"]}>Nome</th>
                                    <th className={PainelGestorStyle["tablehead-cell"]}>Status</th>
                                    <th className={PainelGestorStyle["tablehead-cell"]}>Horas Apontadas</th>
                                    <th className={PainelGestorStyle["tablehead-cell"]}>Valor Hora</th>
                                    <th className={PainelGestorStyle["tablehead-cell"]}>Valor</th>
                                </tr>
                            </thead>
                            <tbody className={PainelGestorStyle["tbody"]}>
                                {!isLoadingFuncionarios ? Array.isArray(filteredColaboradores) && filteredColaboradores.map((item: ColaboradorPeriodo, index: number) =>
                                    <tr key={index} className={`${PainelGestorStyle["line"]}`} onDoubleClick={() => handleDoubleClick(item)}>

                                        <td className={PainelGestorStyle["line-td"]}>
                                            {item?.nome}
                                        </td>

                                        <td className={`${PainelGestorStyle["line-td"]} ${item.status == "REPROVADA" ? PainelGestorStyle["line--red"] : ""}`}>
                                            {item.status}
                                        </td>

                                        <td className={PainelGestorStyle["line-td"]}>
                                            {item.horas}
                                        </td>
                                        {showValue ?
                                            <td className={PainelGestorStyle["line-td"]}>
                                                {getAmountInHour(item.valorHora)}
                                            </td>
                                            : <td className={PainelGestorStyle["line-td"]}>
                                                {<Skeleton
                                                    width={40}
                                                    height={15}
                                                />}
                                            </td>
                                        }
                                        {showValue ?
                                            <td className={PainelGestorStyle["line-td"]}>
                                                {formatMoney(item.valorTotal)}
                                            </td>
                                            :
                                            <td className={PainelGestorStyle["line-td"]}>
                                                {<Skeleton
                                                    width={40}
                                                    height={15}
                                                />}
                                            </td>
                                        }
                                    </tr>
                                ) : <>
                                    {new Array(15).fill(true).map((_, i) => {
                                        return <tr key={i} className={PainelGestorStyle["line"]}>
                                            <td className={PainelGestorStyle["line-td"]}>
                                            </td>
                                            <td className={PainelGestorStyle["line-td"]}>
                                            </td>
                                            <td className={PainelGestorStyle["line-td"]}>
                                            </td>
                                            <td className={PainelGestorStyle["line-td"]}>
                                            </td>
                                        </tr>
                                    })
                                    } </>}
                            </tbody>
                        </table>
                    </>
                )}

        </>
    )
}