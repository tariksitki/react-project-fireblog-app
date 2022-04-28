
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ToastifyError = (msg) => {
    toast.error(msg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
};

export default ToastifyError;