import { Medicao } from "@/types";
import TableStyle from "@/styles/table.module.css";

export default function getCustomMedicaoRMClass(medicao: Medicao) {
    if (medicao.cancelada) {
        return TableStyle["row--red"];
    } else if (medicao.pendente) {
        return TableStyle["row--yellow"];
    } return "";
}
