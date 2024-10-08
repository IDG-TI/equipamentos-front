import formatNumber from "./format_Number";

export const getAmountInHour = (amount: number) => {

    if (!amount) {
        return "00:00"
    }
    const hours = Math.floor(amount / 1);
    const minutes = parseInt(((amount % 1) * 60).toFixed(0));
    return `${formatNumber(hours, 2)}:${formatNumber(parseFloat(minutes.toFixed(2)), 2)}`;

}