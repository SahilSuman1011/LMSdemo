import React, { useState } from "react";
import { Phone, Eye, Calendar, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  callStatus: "Connected" | "Not Connected" | "Pending";
  leadStatus: "Interested" | "Not Interested" | "Admission Taken" | "New";
  followUpDate: Date | null;
  lastContactedDate: Date | null;
  remarks: string;
}

interface LeadTableProps {
  leads: Lead[];
  onCallLead: (lead: Lead) => void;
  onViewDetails: (lead: Lead) => void;
  onScheduleFollowUp: (lead: Lead, date: Date) => void;
}

const LeadTable = ({
  leads = [
    {
      id: "1",
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      source: "Website",
      callStatus: "Pending",
      leadStatus: "New",
      followUpDate: new Date(Date.now() + 86400000), // tomorrow
      lastContactedDate: null,
      remarks: "",
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com",
      source: "Referral",
      callStatus: "Connected",
      leadStatus: "Interested",
      followUpDate: new Date(Date.now() + 172800000), // day after tomorrow
      lastContactedDate: new Date(),
      remarks: "Interested in the science program",
    },
    {
      id: "3",
      name: "Michael Johnson",
      phone: "+1 (555) 456-7890",
      email: "michael.j@example.com",
      source: "Social Media",
      callStatus: "Not Connected",
      leadStatus: "New",
      followUpDate: new Date(Date.now() + 86400000), // tomorrow
      lastContactedDate: new Date(Date.now() - 86400000), // yesterday
      remarks: "Tried calling, no answer",
    },
    {
      id: "4",
      name: "Sarah Williams",
      phone: "+1 (555) 789-0123",
      email: "sarah.w@example.com",
      source: "Event",
      callStatus: "Connected",
      leadStatus: "Admission Taken",
      followUpDate: null,
      lastContactedDate: new Date(Date.now() - 172800000), // 2 days ago
      remarks: "Completed admission process",
    },
    {
      id: "5",
      name: "Robert Brown",
      phone: "+1 (555) 234-5678",
      email: "robert.b@example.com",
      source: "Website",
      callStatus: "Connected",
      leadStatus: "Not Interested",
      followUpDate: null,
      lastContactedDate: new Date(Date.now() - 259200000), // 3 days ago
      remarks: "Not interested at this time",
    },
  ],
  onCallLead = () => {},
  onViewDetails = () => {},
  onScheduleFollowUp = () => {},
}: LeadTableProps) => {
  const [calendarOpen, setCalendarOpen] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const getCallStatusBadge = (status: Lead["callStatus"]) => {
    switch (status) {
      case "Connected":
        return (
          <Badge
            variant="default"
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
          >
            Connected
          </Badge>
        );
      case "Not Connected":
        return <Badge variant="destructive">Not Connected</Badge>;
      default:
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white">
            Pending
          </Badge>
        );
    }
  };

  const getLeadStatusBadge = (status: Lead["leadStatus"]) => {
    switch (status) {
      case "Interested":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white dark:text-white"
          >
            Interested
          </Badge>
        );
      case "Not Interested":
        return (
          <Badge variant="outline" className="bg-gray-200 dark:bg-gray-700">
            Not Interested
          </Badge>
        );
      case "Admission Taken":
        return (
          <Badge className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white">
            Admission Taken
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white">
            New
          </Badge>
        );
    }
  };

  const handleScheduleClick = (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLead(lead);
    setCalendarOpen((prev) => ({ ...prev, [lead.id]: true }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (selectedLead && date) {
      onScheduleFollowUp(selectedLead, date);
      setCalendarOpen((prev) => ({ ...prev, [selectedLead.id]: false }));
      setSelectedLead(null);
    }
  };

  return (
    <div className="w-full bg-card rounded-md shadow dark:bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Call Status</TableHead>
            <TableHead>Lead Status</TableHead>
            <TableHead>Follow-up Date</TableHead>
            <TableHead>Last Contacted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                No leads found. Apply different filters or check back later.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{lead.phone}</span>
                    <span className="text-xs text-muted-foreground">
                      {lead.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{getCallStatusBadge(lead.callStatus)}</TableCell>
                <TableCell>{getLeadStatusBadge(lead.leadStatus)}</TableCell>
                <TableCell>
                  {lead.followUpDate
                    ? format(new Date(lead.followUpDate), "MMM dd, yyyy")
                    : "Not scheduled"}
                </TableCell>
                <TableCell>
                  {lead.lastContactedDate
                    ? format(new Date(lead.lastContactedDate), "MMM dd, yyyy")
                    : "Never contacted"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onCallLead(lead)}
                      title="Call Lead"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onViewDetails(lead)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Popover
                      open={calendarOpen[lead.id] || false}
                      onOpenChange={(open) => {
                        if (open) {
                          setSelectedLead(lead);
                        }
                        setCalendarOpen((prev) => ({
                          ...prev,
                          [lead.id]: open,
                        }));
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => handleScheduleClick(lead, e)}
                          title="Schedule Follow-up"
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                          mode="single"
                          selected={
                            lead.followUpDate
                              ? new Date(lead.followUpDate)
                              : undefined
                          }
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(lead)}>
                          View Full Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleScheduleClick(lead, e)}
                        >
                          Schedule Follow-up
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCallLead(lead)}>
                          Call Now
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadTable;
