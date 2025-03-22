import React, { useState } from "react";
import { Phone, Eye, Calendar, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

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
  onScheduleFollowUp: (lead: Lead) => void;
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
  const getCallStatusBadge = (status: Lead["callStatus"]) => {
    switch (status) {
      case "Connected":
        return <Badge className="bg-green-500">Connected</Badge>;
      case "Not Connected":
        return <Badge className="bg-red-500">Not Connected</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const getLeadStatusBadge = (status: Lead["leadStatus"]) => {
    switch (status) {
      case "Interested":
        return <Badge className="bg-blue-500">Interested</Badge>;
      case "Not Interested":
        return <Badge className="bg-gray-500">Not Interested</Badge>;
      case "Admission Taken":
        return <Badge className="bg-purple-500">Admission Taken</Badge>;
      default:
        return <Badge className="bg-yellow-500">New</Badge>;
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow">
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
                    <span className="text-xs text-gray-500">{lead.email}</span>
                  </div>
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{getCallStatusBadge(lead.callStatus)}</TableCell>
                <TableCell>{getLeadStatusBadge(lead.leadStatus)}</TableCell>
                <TableCell>
                  {lead.followUpDate
                    ? format(lead.followUpDate, "MMM dd, yyyy h:mm a")
                    : "Not scheduled"}
                </TableCell>
                <TableCell>
                  {lead.lastContactedDate
                    ? format(lead.lastContactedDate, "MMM dd, yyyy")
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onScheduleFollowUp(lead)}
                      title="Schedule Follow-up"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
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
                          onClick={() => onScheduleFollowUp(lead)}
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
