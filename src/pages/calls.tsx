import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import AuthLayout from "@/components/layout/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Search,
  Filter,
  Calendar,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CallRecord {
  id: string;
  leadName: string;
  phone: string;
  date: Date;
  status: "Connected" | "Not Connected";
  disposition: "Interested" | "Not Interested" | "Admission Taken" | null;
  duration: string;
  agent: string;
  remarks?: string;
  followUpDate?: Date | null;
}

const CallsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedCall, setEditedCall] = useState<CallRecord | null>(null);

  // Mock data for calls with added remarks and followUpDate
  const [calls, setCalls] = useState<CallRecord[]>([
    {
      id: "1",
      leadName: "John Doe",
      phone: "+1 (555) 123-4567",
      date: new Date(),
      status: "Connected",
      disposition: "Interested",
      duration: "5:23",
      agent: "Current User",
      remarks:
        "Student is interested in science courses. Will follow up tomorrow.",
      followUpDate: new Date(Date.now() + 86400000), // Tomorrow
    },
    {
      id: "2",
      leadName: "Jane Smith",
      phone: "+1 (555) 987-6543",
      date: new Date(Date.now() - 3600000), // 1 hour ago
      status: "Not Connected",
      disposition: null,
      duration: "0:45",
      agent: "Current User",
      remarks: "No answer. Left voicemail.",
      followUpDate: new Date(Date.now() + 172800000), // 2 days from now
    },
    {
      id: "3",
      leadName: "Michael Johnson",
      phone: "+1 (555) 456-7890",
      date: new Date(Date.now() - 7200000), // 2 hours ago
      status: "Connected",
      disposition: "Not Interested",
      duration: "3:12",
      agent: "Current User",
      remarks: "Not interested at this time. Prefers to explore other options.",
      followUpDate: null,
    },
    {
      id: "4",
      leadName: "Sarah Williams",
      phone: "+1 (555) 789-0123",
      date: new Date(Date.now() - 86400000), // 1 day ago
      status: "Connected",
      disposition: "Admission Taken",
      duration: "8:45",
      agent: "Current User",
      remarks:
        "Successfully completed admission process. Will start next month.",
      followUpDate: null,
    },
    {
      id: "5",
      leadName: "Robert Brown",
      phone: "+1 (555) 234-5678",
      date: new Date(Date.now() - 172800000), // 2 days ago
      status: "Not Connected",
      disposition: null,
      duration: "0:30",
      agent: "Current User",
      remarks: "No answer. Will try again tomorrow.",
      followUpDate: new Date(Date.now() + 86400000), // Tomorrow
    },
  ]);

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Filter calls based on search term and active tab
  const filteredCalls = calls.filter((call) => {
    // First filter by search term
    const matchesSearch =
      searchTerm === "" ||
      call.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (call.remarks &&
        call.remarks.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    // Then filter by tab
    if (activeTab === "all") return true;
    if (activeTab === "connected") return call.status === "Connected";
    if (activeTab === "not_connected") return call.status === "Not Connected";
    if (activeTab === "today") {
      const today = new Date().toDateString();
      return call.date.toDateString() === today;
    }
    return true;
  });

  const handleViewDetails = (call: CallRecord) => {
    setSelectedCall(call);
    setIsDetailsModalOpen(true);
  };

  const handleEditCall = (call: CallRecord) => {
    setEditedCall({ ...call });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editedCall) {
      setCalls(
        calls.map((call) => (call.id === editedCall.id ? editedCall : call)),
      );
      setIsEditModalOpen(false);
      setEditedCall(null);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full bg-background p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Call Management</h1>
          <Button className="gap-2">
            <Phone className="h-4 w-4" /> New Call
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calls.length}</div>
              <p className="text-xs text-muted-foreground">All time calls</p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Connected Rate
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  (calls.filter((call) => call.status === "Connected").length /
                    calls.length) *
                    100,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                Of total call attempts
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Calls
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  calls.filter(
                    (call) =>
                      call.date.toDateString() === new Date().toDateString(),
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">Calls made today</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search calls by lead name or phone..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button>Search</Button>
        </div>

        {/* Tabs for different call views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full max-w-md grid grid-cols-4">
            <TabsTrigger value="all">All Calls</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
            <TabsTrigger value="not_connected">Not Connected</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Disposition</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCalls.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No calls found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCalls.map((call) => (
                        <TableRow key={call.id}>
                          <TableCell>
                            <div className="font-medium">{call.leadName}</div>
                            <div className="text-sm text-muted-foreground">
                              {call.phone}
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(call.date)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                call.status === "Connected"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {call.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {call.disposition ? (
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
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>{call.duration}</TableCell>
                          <TableCell>{call.agent}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(call)}
                              >
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditCall(call)}
                              >
                                <MoreHorizontal className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call Details Modal */}
        {selectedCall && (
          <Dialog
            open={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Call Details</DialogTitle>
                <DialogDescription>
                  Call with {selectedCall.leadName} on{" "}
                  {format(selectedCall.date, "MMMM dd, yyyy 'at' h:mm a")}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Lead Information</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium">Name:</div>
                      <div className="col-span-2">{selectedCall.leadName}</div>

                      <div className="font-medium">Phone:</div>
                      <div className="col-span-2">{selectedCall.phone}</div>

                      <div className="font-medium">Call Date:</div>
                      <div className="col-span-2">
                        {format(selectedCall.date, "MMMM dd, yyyy")}
                      </div>

                      <div className="font-medium">Call Time:</div>
                      <div className="col-span-2">
                        {format(selectedCall.date, "h:mm a")}
                      </div>

                      <div className="font-medium">Duration:</div>
                      <div className="col-span-2">{selectedCall.duration}</div>

                      <div className="font-medium">Agent:</div>
                      <div className="col-span-2">{selectedCall.agent}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Call Outcome</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium">Status:</div>
                      <div className="col-span-2">
                        <Badge
                          variant={
                            selectedCall.status === "Connected"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {selectedCall.status}
                        </Badge>
                      </div>

                      <div className="font-medium">Disposition:</div>
                      <div className="col-span-2">
                        {selectedCall.disposition ? (
                          <Badge
                            variant={
                              selectedCall.disposition === "Admission Taken"
                                ? "default"
                                : selectedCall.disposition === "Not Interested"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {selectedCall.disposition}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">
                            No disposition
                          </span>
                        )}
                      </div>

                      <div className="font-medium">Follow-up:</div>
                      <div className="col-span-2">
                        {selectedCall.followUpDate ? (
                          format(selectedCall.followUpDate, "MMMM dd, yyyy")
                        ) : (
                          <span className="text-muted-foreground">
                            No follow-up scheduled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Remarks</h3>
                    <p className="text-sm">
                      {selectedCall.remarks || "No remarks recorded"}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    handleEditCall(selectedCall);
                  }}
                >
                  Edit Call
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Call Modal */}
        {editedCall && (
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Call</DialogTitle>
                <DialogDescription>
                  Update call details for {editedCall.leadName}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="callStatus" className="text-right">
                    Call Status
                  </Label>
                  <Select
                    value={editedCall.status}
                    onValueChange={(value: "Connected" | "Not Connected") =>
                      setEditedCall({ ...editedCall, status: value })
                    }
                  >
                    <SelectTrigger id="callStatus" className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Connected">Connected</SelectItem>
                      <SelectItem value="Not Connected">
                        Not Connected
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="disposition" className="text-right">
                    Disposition
                  </Label>
                  <Select
                    value={editedCall.disposition || ""}
                    onValueChange={(value) => {
                      const disposition =
                        value === ""
                          ? null
                          : (value as
                              | "Interested"
                              | "Not Interested"
                              | "Admission Taken");
                      setEditedCall({ ...editedCall, disposition });
                    }}
                  >
                    <SelectTrigger id="disposition" className="col-span-3">
                      <SelectValue placeholder="Select disposition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Disposition</SelectItem>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Not Interested">
                        Not Interested
                      </SelectItem>
                      <SelectItem value="Admission Taken">
                        Admission Taken
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="remarks" className="text-right">
                    Remarks
                  </Label>
                  <Textarea
                    id="remarks"
                    value={editedCall.remarks || ""}
                    onChange={(e) =>
                      setEditedCall({ ...editedCall, remarks: e.target.value })
                    }
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AuthLayout>
  );
};

export default CallsPage;
