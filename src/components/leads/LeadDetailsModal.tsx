import React from "react";
import { format } from "date-fns";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  User,
  Tag,
  MessageSquare,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface CallHistory {
  id: string;
  date: Date;
  status: "Connected" | "Not Connected";
  disposition: "Interested" | "Not Interested" | "Admission Taken" | null;
  remarks: string;
  agent: string;
}

interface LeadDetailsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  lead?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    source: string;
    status: "New" | "In Progress" | "Converted" | "Closed";
    assignedTo: string;
    createdAt: Date;
    nextFollowUp: Date | null;
    callHistory: CallHistory[];
    notes: string;
  };
}

const LeadDetailsModal = ({
  open = true,
  onOpenChange = () => {},
  lead = {
    id: "LD-1234",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    source: "Website Inquiry",
    status: "In Progress",
    assignedTo: "Sarah Johnson",
    createdAt: new Date(2023, 5, 15),
    nextFollowUp: new Date(2023, 6, 1, 14, 30),
    callHistory: [
      {
        id: "CH-001",
        date: new Date(2023, 5, 15, 10, 15),
        status: "Connected",
        disposition: "Interested",
        remarks:
          "Candidate showed interest in the Computer Science program. Requested more information about fees and duration.",
        agent: "Sarah Johnson",
      },
      {
        id: "CH-002",
        date: new Date(2023, 5, 20, 11, 0),
        status: "Not Connected",
        disposition: null,
        remarks: "No answer. Left a voicemail.",
        agent: "Sarah Johnson",
      },
      {
        id: "CH-003",
        date: new Date(2023, 5, 25, 15, 45),
        status: "Connected",
        disposition: "Interested",
        remarks:
          "Discussed program details. Candidate will think about it and get back.",
        agent: "Sarah Johnson",
      },
    ],
    notes:
      "Potential candidate for the Fall semester. Has shown consistent interest in Computer Science program.",
  },
}: LeadDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {lead.name} - {lead.id}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Contact Information */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Contact Information</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{lead.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{lead.email}</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <span>{lead.address}</span>
                </div>
              </div>

              <h3 className="font-semibold text-lg pt-2">Lead Details</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span>Source: {lead.source}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Assigned to: {lead.assignedTo}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Created: {format(lead.createdAt, "MMM dd, yyyy")}</span>
                </div>

                {lead.nextFollowUp && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      Next Follow-up:{" "}
                      {format(lead.nextFollowUp, "MMM dd, yyyy - h:mm a")}
                    </span>
                  </div>
                )}

                <div className="pt-1">
                  <Badge
                    variant={
                      lead.status === "Converted"
                        ? "default"
                        : lead.status === "Closed"
                          ? "destructive"
                          : lead.status === "In Progress"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {lead.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right column - Tabs */}
            <div>
              <Tabs defaultValue="history">
                <TabsList className="w-full">
                  <TabsTrigger value="history" className="flex-1">
                    Call History
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex-1">
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="history"
                  className="max-h-[400px] overflow-y-auto"
                >
                  {lead.callHistory.length > 0 ? (
                    <div className="space-y-4">
                      {lead.callHistory.map((call) => (
                        <div
                          key={call.id}
                          className="border rounded-lg p-3 bg-white"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm text-gray-500">
                                {format(call.date, "MMM dd, yyyy - h:mm a")}
                              </p>
                              <p className="text-sm">Agent: {call.agent}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                variant={
                                  call.status === "Connected"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {call.status}
                              </Badge>
                              {call.disposition && (
                                <Badge
                                  variant={
                                    call.disposition === "Admission Taken"
                                      ? "default"
                                      : call.disposition === "Not Interested"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {call.disposition}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm mt-2">{call.remarks}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-gray-500">
                      No call history available
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="notes">
                  <div className="border rounded-lg p-4 bg-white min-h-[200px]">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-gray-500 mt-1" />
                      <p className="text-sm">{lead.notes}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
