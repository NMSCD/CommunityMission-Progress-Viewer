
import { toast } from 'react-toastify';

export const infoToast = (text: string) => {
    toast.success(text, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
    });
}