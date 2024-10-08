import { toast } from "react-toastify";
/**
 * @deprecated descontinuada pois a mensagem não é flexivel
 * @sugestion usar a função showSucessToast
*/
export default function showSucessToastDeprecated(operation: string){
    toast.success(`${operation} com sucesso`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
    });
};