import showErrorToast from "@toasts/error_toast";

/**
 * Retorna o nome do mês pelo número passado
 * @param {number} month 
 * @returns {string} nome do mês
 */
const formatMonth = (month: number) => {
    if (month > 11) {
        showErrorToast(`Mês ${month} inválido passado`);
        return "-";
    }
    const months = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"]
    return months[month];
}

export default formatMonth;