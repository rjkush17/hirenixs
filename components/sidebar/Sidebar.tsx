import { Sidebar } from "@/components/ui/sidebar";
import Header from "@/components/sidebar/SidebarHeader";
import Footer from "@/components/sidebar/SidebarFooter";
import SidebarContent from "@/components/sidebar/SidebarContent";

function SidePanel() {
    return (
        <Sidebar className="pb-2">
            <Header />
            <SidebarContent />
            <Footer />
        </Sidebar>
    );
}

export default SidePanel;
