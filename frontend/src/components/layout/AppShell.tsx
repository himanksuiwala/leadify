
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";
import { MasterDetailView } from "../views/MasterDetailView";

export function AppShell() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden w-full h-full">
          <AppNavbar />
          <main className="flex-1 overflow-hidden">
            <MasterDetailView />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
