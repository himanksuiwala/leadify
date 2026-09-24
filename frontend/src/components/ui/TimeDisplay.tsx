import { format, formatDistanceToNow, parseISO } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export function TimeDisplay({ 
  timestamp, 
  showRelative = false, 
  className = "" 
}: { 
  timestamp: string;
  showRelative?: boolean;
  className?: string;
}) {
  if (!timestamp) return null;

  try {
    const date = parseISO(timestamp);
    const relative = formatDistanceToNow(date, { addSuffix: true });
    const absolute = format(date, "MMM d, yyyy h:mm a");

    const primary = showRelative ? relative : absolute;
    const secondary = showRelative ? absolute : relative;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={className}>{primary}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{secondary}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } catch (err) {
    return <span>{timestamp}</span>;
  }
}
