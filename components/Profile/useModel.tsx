import { useContext } from "react";
import { ModalContext } from "@/components/Profile/Providers";

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used inside ModalProvider");
    return context;
};
