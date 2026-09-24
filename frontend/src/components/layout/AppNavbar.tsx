
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppNavbar() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-white px-6 w-full shrink-0">
      <SidebarTrigger />
      <div className="flex flex-1 items-center gap-4">
        <h1 className="font-semibold text-lg">Navbar/Header</h1>
      </div>
    </header>
  );
}
