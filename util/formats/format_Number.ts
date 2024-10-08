/**
 * 
 * @param value valor numérico a ser formatado
 * @param pad quantidade de casas a serem adicionadas na direita
 * @returns 
 */

export default function formatNumber(value: any, pad: any) {
    return String(value).padStart(pad, '0')
}