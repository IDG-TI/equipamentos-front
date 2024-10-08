export default function formatMoney(value:number | null) {

    if(value == null || value == undefined) {
      return "-";
    }
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(value);
  }
  