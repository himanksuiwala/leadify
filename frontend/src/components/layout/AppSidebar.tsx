import { 
  Layers, 
  Users, 
  BarChart2, 
  Settings, 
  LogOut,
  Building
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between p-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 overflow-hidden group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-slate-50 shrink-0">
            <Building className="h-4 w-4" />
          </div>
          <div className="flex-col truncate flex">
            <span className="font-semibold text-sm">Acme Corp</span>
            <span className="text-xs text-slate-500">CRM Enterprise</span>
          </div>
        </div>
        <SidebarTrigger className="shrink-0" />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">MAIN MODULES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive className="font-medium">
                  <a href="#">
                    <Layers />
                    <span>Leads Pipeline</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Users />
                    <span>Contacts Directory</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <BarChart2 />
                    <span>Performance Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">SETTINGS & ORG</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings />
                    <span>System Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center justify-between overflow-hidden group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src="" alt="Jane Doe" />
              <AvatarFallback className="bg-slate-900 text-slate-50 text-xs">JD</AvatarFallback>
            </Avatar>
            <div className="flex-col truncate group-data-[collapsible=icon]:hidden flex">
              <span className="font-semibold text-sm text-slate-900">Jane Doe</span>
              <span className="text-xs text-slate-500 truncate">jane@acme.com</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 group-data-[collapsible=icon]:hidden">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
