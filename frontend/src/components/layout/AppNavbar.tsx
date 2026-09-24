import { Search, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AppNavbar() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4 border-b bg-white px-6 w-full shrink-0">
      {/* Left Spacer */}
      <div className="flex-1" />
      
      {/* Centered Search Bar */}
      <div className="flex-1 flex justify-center min-w-[300px] max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input 
            type="search"
            placeholder="Search leads, contacts, or analytics..."
            className="w-full pl-9 bg-slate-50 border-slate-200 focus-visible:ring-slate-300"
          />
        </div>
      </div>
      
      {/* Right Actions */}
      <div className="flex-1 flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <a href="/mock-webhook" target="_blank" rel="noreferrer">
            Mock Webhook
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </header>
  );
}
