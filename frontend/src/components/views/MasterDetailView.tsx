import { useState } from "react";
import { LeadListPlaceholder } from "./LeadListPlaceholder";
import { LeadDetailsPlaceholder } from "./LeadDetailsPlaceholder";
import { useIsMobile } from "@/hooks/use-mobile";

export function MasterDetailView() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // If we are on mobile, and an item is selected, show ONLY details.
  // If we are on mobile, and NO item is selected, show ONLY list.
  // If we are on desktop, show BOTH.

  const showList = !isMobile || selectedItemId === null;
  const showDetails = !isMobile || selectedItemId !== null;

  return (
    <div className="flex-1 flex overflow-hidden w-full h-full">
      {/* Master View (List) */}
      {showList && (
        <div className={`flex flex-col border-r bg-white h-full ${isMobile ? "w-full" : "w-1/3 min-w-[300px]"}`}>
          <LeadListPlaceholder onSelectLead={(id) => setSelectedItemId(id)} />
        </div>
      )}

      {/* Detail View */}
      {showDetails && (
        <div className={`flex flex-col bg-slate-50 h-full ${isMobile ? "w-full" : "w-2/3 flex-1"}`}>
          <LeadDetailsPlaceholder 
            selectedItemId={selectedItemId} 
            onBack={() => setSelectedItemId(null)}
            isMobileView={isMobile}
          />
        </div>
      )}
    </div>
  );
}
