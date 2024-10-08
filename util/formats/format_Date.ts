export default function formatDate(dateTime: any) {
    
    if(!dateTime){
        return "-";
    }
    let auxDate = new Date(dateTime.split("T")[0]);
    let date = new Date(auxDate.getTime() + auxDate.getTimezoneOffset() * 60000);
    let formattedDateString = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    
    return formattedDateString;
}