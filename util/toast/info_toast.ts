import { toast } from "react-toastify";

export default function showInfoToast(message: string){
    toast.info(`${message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
    });
};