import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Lead {
  LeadID: string;
  FirstName: string;
  LastName: string;
  Topic: string;
  Status: string;
  Source: string;
  Message: string;
  Timestamp: string;
  Email: string;
}

interface LeadListProps {
  leads?: Lead[];
  onSelectLead?: (id: string) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  isLoading?: boolean;
  statusFilter?: string | null;
  onStatusChange?: (status: string | null) => void;
  sortOrder?: string;
  onSortChange?: (sort: string) => void;
}

const statuses = ["All", "New", "Contacted", "Qualified", "Lost"];

export function LeadList({ 
  leads = [], 
  onSelectLead, 
  onScroll, 
  isLoading,
  statusFilter,
  onStatusChange,
  sortOrder,
  onSortChange
}: LeadListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Contacted": return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "Qualified": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Lost": return "bg-slate-100 text-slate-800 hover:bg-slate-200";
      default: return "bg-slate-100 text-slate-800 hover:bg-slate-200";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Leads</h2>
          
          <Select value={sortOrder} onValueChange={onSortChange}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">Newest First</SelectItem>
              <SelectItem value="date_asc">Oldest First</SelectItem>
              <SelectItem value="name_asc">Name (A-Z)</SelectItem>
              <SelectItem value="status">Status Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {statuses.map(status => {
            const isActive = status === "All" ? statusFilter === null : statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => onStatusChange?.(status === "All" ? null : status)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  isActive 
                    ? "bg-slate-800 text-white border-slate-800" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>
      <div 
        className="flex-1 overflow-y-auto space-y-2 p-4"
        onScroll={onScroll}
      >
        {leads.length === 0 && !isLoading && (
          <div className="text-center text-slate-500 py-8">No leads found.</div>
        )}
        
        {leads.map((lead) => (
          <div
            key={lead.LeadID}
            className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
            onClick={() => onSelectLead?.(lead.LeadID)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-slate-900 truncate">
                {lead.FirstName} {lead.LastName}
              </h3>
              <span className="text-xs text-slate-500 shrink-0 ml-2">
                {formatDistanceToNow(new Date(lead.Timestamp), { addSuffix: true })}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 truncate mr-2">
                {lead.Topic}
              </span>
              <Badge variant="outline" className={`shrink-0 ${getStatusColor(lead.Status)} border-0`}>
                {lead.Status}
              </Badge>
            </div>
            
            <div className="text-xs text-slate-500 mb-1 truncate">
              {lead.Source} • {lead.Email}
            </div>
            
            <p className="text-sm text-slate-600 truncate">
              {lead.Message}
            </p>
          </div>
        ))}
        
        {isLoading && (
          <div className="text-center text-slate-500 py-4">Loading...</div>
        )}
      </div>
    </div>
  );
}
