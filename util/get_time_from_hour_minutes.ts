export default function getTimeFromHourMinutes(hours: number, minutes: number) {
    if(hours){
        const valueHoras = hours ? hours : 0;
        const valueMinutos = minutes ? (parseFloat((minutes / 60).toFixed(2))) : 0;
        return (valueHoras + valueMinutos);
    }
    return null;
}