import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LeadDetailsPlaceholderProps {
  selectedItemId: string | null;
  onBack?: () => void;
  isMobileView?: boolean;
}

export const LeadDetailsPlaceholder: React.FC<LeadDetailsPlaceholderProps> = ({ 
  selectedItemId, 
  onBack,
  isMobileView 
}) => {
  if (!selectedItemId) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 bg-slate-50/50">
        <p>Select a lead to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 bg-white">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        {isMobileView && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h2 className="text-xl font-bold">Lead Details ({selectedItemId})</h2>
      </div>
      
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Contact Information</h3>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="font-medium text-slate-800">Name: John Doe</p>
            <p className="text-slate-600">Email: john.doe@example.com</p>
            <p className="text-slate-600">Phone: +1 555-0123</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Requirement</h3>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-slate-700">Looking for a 3 BHK Apartment in the downtown area. Budget is flexible. Needs parking space for 2 cars.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
