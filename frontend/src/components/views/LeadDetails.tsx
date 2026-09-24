import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Phone, Mail, MessageSquare, Loader2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
}

export function LeadDetails({ 
  selectedItemId, 
  onBack, 
  isMobileView 
}: { 
  selectedItemId: string | null;
  onBack?: () => void;
  isMobileView?: boolean;
}) {
  const [lead, setLead] = useState<DetailedLead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedItemId) {
      setLead(null);
      return;
    }

    const controller = new AbortController();
    
    const fetchLead = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/leads/${selectedItemId}`, {
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
  }, [selectedItemId]);

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
      case "Contacted": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Qualified": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Lost": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };

  return (
    <div className="flex-1 relative overflow-y-auto">
      {/* Sticky Contact Card Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm p-6 flex flex-col gap-4">
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
              <Badge className={getStatusColor(lead.Status)}>{lead.Status}</Badge>
            </div>
            <p className="text-lg font-medium text-slate-700">{lead.Topic}</p>
          </div>
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

      {/* Details Content */}
      <div className="p-6 space-y-6">
        {/* Message Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Message</h3>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
            {lead.Message}
          </p>
        </div>

        {/* Lead Information */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Lead Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500 block mb-1">Source</span>
              <span className="text-slate-900 font-medium">{lead.Source}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Ingested At</span>
              <span className="text-slate-900 font-medium">
                {formatDistanceToNow(parseISO(lead.Timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
