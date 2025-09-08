import { AppSidebar } from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/admin");
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 p-4 md:gap-6">
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;
