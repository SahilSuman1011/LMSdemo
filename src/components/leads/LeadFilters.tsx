import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar as CalendarIcon, X, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LeadFiltersProps {
  onFilterChange?: (filters: {
    search: string;
    callStatus: string;
    leadStatus: string;
    followUpDate: Date | undefined;
  }) => void;
}

const LeadFilters = ({ onFilterChange = () => {} }: LeadFiltersProps) => {
  const [search, setSearch] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      search,
      callStatus: callStatus === "all_call_statuses" ? "" : callStatus,
      leadStatus: leadStatus === "all_lead_statuses" ? "" : leadStatus,
      followUpDate,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCallStatus("");
    setLeadStatus("");
    setFollowUpDate(undefined);
    onFilterChange({
      search: "",
      callStatus: "",
      leadStatus: "",
      followUpDate: undefined,
    });
  };

  return (
    <div className="w-full bg-card p-4 rounded-md shadow-sm border border-border dark:bg-card dark:border-border">
      <div className="flex flex-col gap-3">
        {/* Search and Toggle */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search leads by name, email, or phone..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && "bg-accent")}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={handleFilterChange}>Search</Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Call Status Filter */}
            <Select value={callStatus} onValueChange={setCallStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Call Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_call_statuses">
                  All Call Statuses
                </SelectItem>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="not_connected">Not Connected</SelectItem>
                <SelectItem value="no_answer">No Answer</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>

            {/* Lead Status Filter */}
            <Select value={leadStatus} onValueChange={setLeadStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Lead Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_lead_statuses">
                  All Lead Statuses
                </SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="not_interested">Not Interested</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            {/* Follow-up Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !followUpDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {followUpDate ? (
                    format(followUpDate, "PPP")
                  ) : (
                    <span>Follow-up Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={followUpDate}
                  onSelect={setFollowUpDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Clear Filters Button */}
            <Button
              variant="ghost"
              className="flex items-center gap-1 md:col-span-3 w-fit"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadFilters;
