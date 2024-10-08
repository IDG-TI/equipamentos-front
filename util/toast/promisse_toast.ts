import { toast } from "react-toastify";
export default function showPromiseToast(promise: Promise<any>, onLoading: string, onSuccess: string, onFailed: string) {
  toast.promise(
    promise,
    {
      pending: onLoading,
      success: onSuccess,
      error: onFailed,
    },
    {
      position: toast.POSITION.BOTTOM_RIGHT  ,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
    }
  );
};