import React from "react";


interface LeadListPlaceholderProps {
  onSelectLead?: (id: string) => void;
}

export const LeadListPlaceholder: React.FC<LeadListPlaceholderProps> = ({ onSelectLead }) => {
  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Lead List</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {/* Placeholder Items */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
            onClick={() => onSelectLead?.(`lead-${i}`)}
          >
            <h3 className="font-semibold text-slate-800">John Doe {i}</h3>
            <p className="text-sm text-slate-500">Looking for a 3 BHK Apartment</p>
          </div>
        ))}
      </div>
    </div>
  );
};
