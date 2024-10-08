import { Medicao } from "@/types";
import TableStyle from "@/styles/table.module.css";

export default function getCustomMedicaoClass(medicao: Medicao) {
    if (medicao.reprovada) {
        return TableStyle["row--red"];
    } else if (!medicao.aprovada) {
        return TableStyle["row--yellow"];
    } return "";
}
