import { useContext } from "react";
import ToastContext from "../contexts/ToastContext";

const useToast = () => useContext(ToastContext);

export default useToast;
