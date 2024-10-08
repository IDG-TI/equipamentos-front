import { toast } from "react-toastify";

export default function showSucessToast(operation: string){
    toast.success(`${operation}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
    });
};