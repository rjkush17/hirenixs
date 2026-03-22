import ModelWrapper from "@/components/Profile/Providers";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ModelWrapper>{children}</ModelWrapper>;
}
