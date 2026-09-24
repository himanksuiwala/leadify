import { useState, useEffect, useCallback } from "react";
import type { UIEvent } from "react";
import { LeadList } from "./LeadList";
import type { Lead } from "./LeadList";
import { LeadDetails } from "./LeadDetails";
import { useIsMobile } from "@/hooks/use-mobile";

export function MasterDetailView() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter & Sort State
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("date_desc");

  // Fetch logic
  const fetchLeads = async (
    currentPage: number, 
    currentStatus: string | null, 
    currentSort: string,
    signal?: AbortSignal
  ) => {
    if (!hasMore && currentPage > 1) return;
    
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10", // Lower limit so scrollbar appears
        sort: currentSort,
      });
      if (currentStatus) queryParams.append("status", currentStatus);

      const response = await fetch(`http://localhost:3000/leads?${queryParams.toString()}`, { signal });
      if (!response.ok) throw new Error("Failed to fetch leads");
      
      const json = await response.json();
      
      setLeads(prev => currentPage === 1 ? json.data : [...prev, ...json.data]);
      setHasMore(json.meta.page < json.meta.totalPages);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and filter/sort changes
  useEffect(() => {
    const controller = new AbortController();
    fetchLeads(1, statusFilter, sortOrder, controller.signal);
    return () => controller.abort();
  }, [statusFilter, sortOrder]);

  // Load more on page change (if page > 1)
  useEffect(() => {
    if (page > 1) {
      const controller = new AbortController();
      fetchLeads(page, statusFilter, sortOrder, controller.signal);
      return () => controller.abort();
    }
  }, [page]);

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      if (!isLoading && hasMore) {
        setPage(prev => prev + 1);
      }
    }
  }, [isLoading, hasMore]);

  const showList = !isMobile || selectedItemId === null;
  const showDetails = !isMobile || selectedItemId !== null;

  return (
    <div className="flex-1 flex overflow-hidden w-full h-full">
      {/* Master View (List) */}
      {showList && (
        <div className={`flex flex-col border-r bg-white h-full ${isMobile ? "w-full" : "w-1/3 min-w-[300px]"}`}>
          <LeadList 
            leads={leads}
            onSelectLead={setSelectedItemId} 
            onScroll={handleScroll}
            isLoading={isLoading}
            statusFilter={statusFilter}
            onStatusChange={(status) => {
              setStatusFilter(status);
              setLeads([]); // Clear instantly to show loader
              setPage(1);
            }}
            sortOrder={sortOrder}
            onSortChange={(sort) => {
              setSortOrder(sort);
              setLeads([]); // Clear instantly to show loader
              setPage(1);
            }}
          />
        </div>
      )}

      {/* Detail View */}
      {showDetails && (
        <div className={`flex flex-col bg-slate-50 h-full ${isMobile ? "w-full" : "w-2/3 flex-1"}`}>
          <LeadDetails 
            selectedItemId={selectedItemId} 
            onBack={() => setSelectedItemId(null)}
            isMobileView={isMobile}
            onLeadUpdated={(id, updates) => {
              setLeads(prev => prev.map(l => l.LeadID === id ? { ...l, ...updates } : l));
            }}
          />
        </div>
      )}
    </div>
  );
}
