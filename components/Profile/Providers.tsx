"use client";
import { createContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Section = "ProfileImages" | "ProfileHeader";

type FormType = Record<
    Section,
    {
        title: string;
        component: ReactNode;
    }
>;

type ModalContextType = {
    openModal: (name: Section) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
    const [section, setSection] = useState<Section | null>(null);

    const openModal = (name: Section) => setSection(name);
    const closeModal = () => setSection(null);

    const forms: FormType = {
        ProfileImages: {
            title: "title 1",
            component: <div>Here is the component 1</div>,
        },
        ProfileHeader: {
            title: "title 2",
            component: <div>Here is the component 2</div>,
        },
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <Dialog open={!!section} onOpenChange={closeModal}>
                <DialogContent>
                    {section && (
                        <>
                            <DialogTitle>{forms[section].title}</DialogTitle>
                            {forms[section].component}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </ModalContext.Provider>
    );
}
