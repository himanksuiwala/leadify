import { useEffect, useState } from "react";
import { Phone, Mail, MessageSquare, Loader2, ArrowLeft, ChevronDown, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TimeDisplay } from "@/components/ui/TimeDisplay";
import { EditLeadModal } from "./EditLeadModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { API_BASE_URL } from "@/lib/config";

interface AuditEvent {
  AuditID: string;
  LeadID: string;
  Action: string;
  User?: {
    FirstName: string;
    LastName: string;
  } | null;
  Comment: string;
  Timestamp: string;
}

interface DetailedLead {
  LeadID: string;
  CustomerID: string;
  Source: string;
  Topic: string;
  Message: string;
  Status: string;
  Timestamp: string;
  Customer: {
    CustomerID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string | null;
  };
  Audits: AuditEvent[];
}

const renderComment = (comment: string) => {
  if (comment.startsWith("Status changed to ")) {
    const status = comment.replace("Status changed to ", "");
    return (
      <span>
        Status changed to <strong className="font-semibold text-slate-900">{status}</strong>
      </span>
    );
  }
  return comment;
};

export function LeadDetails({ 
  selectedItemId, 
  onBack, 
  isMobileView,
  onLeadUpdated
}: { 
  selectedItemId: string | null;
  onBack?: () => void;
  isMobileView?: boolean;
  onLeadUpdated?: (id: string, updates: any) => void;
}) {
  const [lead, setLead] = useState<DetailedLead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedItemId) {
      setLead(null);
      return;
    }

    const controller = new AbortController();
    
    const fetchLead = async () => {
      if (!lead || lead.LeadID !== selectedItemId) {
        setIsLoading(true);
      }
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/leads/${selectedItemId}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch lead details");
        const json = await response.json();
        setLead(json.data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemId, refreshCounter]);

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;
    setIsUpdating(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${lead.LeadID}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      
      onLeadUpdated?.(lead.LeadID, { Status: newStatus });
      setRefreshCounter(prev => prev + 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!selectedItemId) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        Select a lead from the list to view details
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading lead: {error}
      </div>
    );
  }

  if (!lead) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Qualified": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Converted": return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Dead": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };

  const getAllowedTransitions = (status: string) => {
    switch (status) {
      case "New": return ["Qualified", "Dead"];
      case "Qualified": return ["Converted", "Dead"];
      default: return [];
    }
  };

  const allowedTransitions = getAllowedTransitions(lead.Status);

  return (
    <TooltipProvider>
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Contact Card Header */}
      <div className="shrink-0 z-10 bg-white border-b border-slate-200 shadow-sm p-6 flex flex-col gap-4">
        {isMobileView && onBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2 text-slate-500 mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
        )}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">
                {lead.Customer.FirstName} {lead.Customer.LastName}
              </h1>
              {allowedTransitions.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={isUpdating}>
                    <Badge className={`cursor-pointer ${getStatusColor(lead.Status)}`}>
                      {isUpdating && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                      {lead.Status}
                      <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {allowedTransitions.map(status => (
                      <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
                        Mark as {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Badge className={getStatusColor(lead.Status)}>{lead.Status}</Badge>
              )}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-lg font-medium text-slate-700 truncate max-w-[300px] sm:max-w-md cursor-default">{lead.Topic}</p>
              </TooltipTrigger>
              <TooltipContent className="max-w-[400px]">
                <p className="break-words">{lead.Topic}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)} className="gap-2">
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mt-2">
          <div className="flex flex-col gap-1 text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{lead.Customer.Email}</span>
            </div>
            {lead.Customer.Phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{lead.Customer.Phone}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
          </div>
        </div>
      </div>

      <EditLeadModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        lead={lead}
        onSuccess={(updatedFields) => {
          setRefreshCounter(prev => prev + 1);
          onLeadUpdated?.(lead.LeadID, {
            FirstName: updatedFields.firstName,
            LastName: updatedFields.lastName
          });
        }}
      />

      {/* Details Content - Grid Layout */}
      <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[60%_40%] overflow-y-auto lg:overflow-hidden">
        
        {/* Left Column: Message & Info */}
        <div className="flex flex-col relative lg:overflow-y-auto h-full">
          {/* Message Card */}
          <div className="p-6 pb-6 flex-1">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Message</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed line-clamp-3 cursor-default">
                    {lead.Message}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="max-w-[500px]">
                  <p className="whitespace-pre-wrap break-words">{lead.Message}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Lead Information */}
          <div className="p-6 mt-auto sticky bottom-0 bg-white border-t border-slate-100 z-10">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Lead Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500 block mb-1">Source</span>
                <span className="text-slate-900 font-medium">{lead.Source}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Ingested At</span>
                <span className="text-slate-900 font-medium">
                  <TimeDisplay timestamp={lead.Timestamp} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="p-6 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/30 lg:overflow-y-auto">
          {lead.Audits && lead.Audits.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-6">Activity Timeline</h3>
              <div className="relative border-l-2 border-slate-200 ml-2 pl-5 space-y-6">
                {[...lead.Audits].sort((a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()).map(audit => (
                  <div key={audit.AuditID} className="relative">
                    <div className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-slate-400" />
                    <div className="text-sm text-slate-900 font-medium">
                      {audit.Action} <span className="text-slate-500 font-normal">by {audit.User ? `${audit.User.FirstName} ${audit.User.LastName}` : 'System'}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      <TimeDisplay timestamp={audit.Timestamp} />
                    </div>
                    {audit.Comment && (
                      <div className="text-sm text-slate-700 mt-2 bg-slate-50 p-2.5 rounded-md border border-slate-200">
                        {renderComment(audit.Comment)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
