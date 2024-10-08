import { toast } from "react-toastify";

export function showLoadingToast(operation: string): any{
    return toast.loading(`${operation}`, {
        position: "bottom-left",
    });
};

export function updateLoadingToastToSucess(id:number, message: string){
    toast.update(id, {
        render: `${message} com sucesso`, type: "success", isLoading: false, autoClose: 3000, position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
    })
}


export function killLoadingToast(id:number){
    toast.dismiss(id);
}