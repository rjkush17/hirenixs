"use client";
import { createContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import EditProfileImages from "@/components/Profile/EditComponents/EditProfileImages";
import EditUserHeader from "@/components/Profile/EditComponents/EditUserHeader";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { UpdateSession } from "next-auth/react";

type Section = "EditProfileImages" | "EditUserHeader";

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
    session: Session;
    update: UpdateSession;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
    const [section, setSection] = useState<Section | null>(null);

    const { data: session, status, update } = useSession();

    //FIX: add proper UI in this places
    if (status === "loading") return <p>Loading fucking pages</p>;
    if (!session || !session?.user)
        return (
            <>
                <p>please login pages</p>
            </>
        );

    const openModal = (name: Section) => setSection(name);
    const closeModal = () => setSection(null);

    const forms: FormType = {
        EditProfileImages: {
            title: "Upload New Profie Image",
            component: <EditProfileImages />,
        },
        EditUserHeader: {
            title: "Edit Your Profile Details",
            component: <EditUserHeader />,
        },
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, session, update }}>
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
