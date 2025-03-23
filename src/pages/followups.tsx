import React, { useState, useEffect } from "react";
import { format, isToday, isTomorrow, isPast, addDays } from "date-fns";
import AuthLayout from "@/components/layout/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Calendar,
  Phone,
  Clock,
  CheckCircle,
  Eye,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/components/ui/notification-provider";

interface FollowUp {
  id: string;
  leadName: string;
  phone: string;
  email: string;
  date: Date;
  status: "Pending" | "Completed" | "Missed";
  notes: string;
  leadStatus: "New" | "Interested" | "Not Interested" | "Admission Taken";
  reminderSent?: boolean;
}

const FollowUpsPage = () => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedFollowUp, setEditedFollowUp] = useState<FollowUp | null>(null);

  // Mock data for follow-ups with updated status types
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: "1",
      leadName: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      date: new Date(Date.now() + 3600000), // 1 hour from now
      status: "Pending",
      notes: "Discuss program details and fees",
      leadStatus: "Interested",
      reminderSent: false,
    },
    {
      id: "2",
      leadName: "Jane Smith",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com",
      date: new Date(Date.now() + 7200000), // 2 hours from now
      status: "Pending",
      notes: "Follow up on previous conversation about admission requirements",
      leadStatus: "Interested",
      reminderSent: true,
    },
    {
      id: "3",
      leadName: "Michael Johnson",
      phone: "+1 (555) 456-7890",
      email: "michael.j@example.com",
      date: new Date(Date.now() + 10800000), // 3 hours from now
      status: "Pending",
      notes: "Provide additional information about scholarship opportunities",
      leadStatus: "Interested",
      reminderSent: false,
    },
    {
      id: "4",
      leadName: "Sarah Williams",
      phone: "+1 (555) 789-0123",
      email: "sarah.w@example.com",
      date: new Date(Date.now() - 86400000), // Yesterday
      status: "Completed",
      notes: "Final discussion before admission decision",
      leadStatus: "Admission Taken",
      reminderSent: true,
    },
    {
      id: "5",
      leadName: "Robert Brown",
      phone: "+1 (555) 234-5678",
      email: "robert.b@example.com",
      date: new Date(Date.now() - 172800000), // 2 days ago
      status: "Missed",
      notes: "Initial follow-up after website inquiry",
      leadStatus: "New",
      reminderSent: true,
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

  // Check for reminders on component mount
  useEffect(() => {
    // Find follow-ups that are due today or tomorrow and haven't had reminders sent
    const upcomingFollowUps = followUps.filter(
      (followUp) =>
        (isToday(followUp.date) || isTomorrow(followUp.date)) &&
        !followUp.reminderSent &&
        followUp.status === "Pending",
    );

    // Send reminders for upcoming follow-ups
    upcomingFollowUps.forEach((followUp) => {
      const timeLabel = isToday(followUp.date) ? "Today" : "Tomorrow";
      const timeFormatted = format(followUp.date, "h:mm a");

      // Add notification
      addNotification({
        title: `Upcoming Follow-up: ${followUp.leadName}`,
        description: `${timeLabel} at ${timeFormatted} - ${followUp.notes}`,
        type: "info",
      });

      // Show toast for today's follow-ups
      if (isToday(followUp.date)) {
        toast({
          title: `Upcoming Follow-up: ${followUp.leadName}`,
          description: `Today at ${timeFormatted}`,
          duration: 5000,
        });
      }

      // Mark reminder as sent
      setFollowUps((prev) =>
        prev.map((item) =>
          item.id === followUp.id ? { ...item, reminderSent: true } : item,
        ),
      );
    });

    // Mark past follow-ups as missed if they're still pending
    const updatedFollowUps = followUps.map((followUp) => {
      if (
        isPast(followUp.date) &&
        !isToday(followUp.date) &&
        followUp.status === "Pending"
      ) {
        return { ...followUp, status: "Missed" as const };
      }
      return followUp;
    });

    if (JSON.stringify(updatedFollowUps) !== JSON.stringify(followUps)) {
      setFollowUps(updatedFollowUps);
    }
  }, []);

  // Filter follow-ups based on search term, status filter, and selected date
  const filteredFollowUps = followUps.filter((followUp) => {
    // First filter by search term
    const matchesSearch =
      searchTerm === "" ||
      followUp.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.notes.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Then filter by status if not "all"
    if (statusFilter !== "all" && followUp.status !== statusFilter) {
      return false;
    }

    // Finally filter by selected date
    return date ? followUp.date.toDateString() === date.toDateString() : true;
  });

  const handleViewDetails = (followUp: FollowUp) => {
    setSelectedFollowUp(followUp);
    setIsDetailsModalOpen(true);
  };

  const handleEditFollowUp = (followUp: FollowUp) => {
    setEditedFollowUp({ ...followUp });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editedFollowUp) {
      setFollowUps(
        followUps.map((followUp) =>
          followUp.id === editedFollowUp.id ? editedFollowUp : followUp,
        ),
      );
      setIsEditModalOpen(false);
      setEditedFollowUp(null);
    }
  };

  const handleMarkAsCompleted = (followUp: FollowUp) => {
    const updatedFollowUps = followUps.map((item) =>
      item.id === followUp.id
        ? { ...item, status: "Completed" as const }
        : item,
    );
    setFollowUps(updatedFollowUps);

    toast({
      title: "Follow-up Completed",
      description: `Follow-up with ${followUp.leadName} marked as completed`,
    });
  };

  const getStatusBadge = (status: FollowUp["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
        );
      case "Missed":
        return <Badge variant="destructive">Missed</Badge>;
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-400"
          >
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getLeadStatusBadge = (status: FollowUp["leadStatus"]) => {
    switch (status) {
      case "Interested":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            Interested
          </Badge>
        );
      case "Not Interested":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          >
            Not Interested
          </Badge>
        );
      case "Admission Taken":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            Admission Taken
          </Badge>
        );
      case "New":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
          >
            New
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <AuthLayout>
      <div className="w-full bg-background p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Follow-up Management</h1>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" /> Schedule Follow-up
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Follow-ups
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  followUps.filter(
                    (followUp) =>
                      followUp.date.toDateString() ===
                      new Date().toDateString(),
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Scheduled for today
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Follow-ups
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  followUps.filter(
                    (followUp) =>
                      followUp.date > new Date() &&
                      followUp.date.toDateString() !==
                        new Date().toDateString(),
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                In the next 7 days
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Follow-ups
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  followUps.filter(
                    (followUp) => followUp.status === "Completed",
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search follow-ups by lead name or notes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Missed">Missed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Calendar and Follow-ups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="border border-border md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Follow-up Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Follow-ups for selected date */}
          <Card className="border border-border md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                {date
                  ? date.toDateString() === new Date().toDateString()
                    ? "Today's Follow-ups"
                    : `Follow-ups for ${format(date, "MMMM dd, yyyy")}`
                  : "All Follow-ups"}
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Phone className="h-4 w-4" /> Call All
              </Button>
            </CardHeader>
            <CardContent>
              {filteredFollowUps.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Lead Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFollowUps.map((followUp) => (
                      <TableRow key={followUp.id}>
                        <TableCell>
                          <div className="font-medium">{followUp.leadName}</div>
                          <div className="text-sm text-muted-foreground">
                            {followUp.phone}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(followUp.date)}</TableCell>
                        <TableCell>{getStatusBadge(followUp.status)}</TableCell>
                        <TableCell>
                          {getLeadStatusBadge(followUp.leadStatus)}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {followUp.notes}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {followUp.status === "Pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                onClick={() => handleMarkAsCompleted(followUp)}
                                title="Mark as Completed"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(followUp)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditFollowUp(followUp)}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No follow-ups found for the selected criteria
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Follow-up Details Modal */}
        {selectedFollowUp && (
          <Dialog
            open={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Follow-up Details</DialogTitle>
                <DialogDescription>
                  Follow-up with {selectedFollowUp.leadName} scheduled for{" "}
                  {format(selectedFollowUp.date, "MMMM dd, yyyy 'at' h:mm a")}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Lead Information</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium">Name:</div>
                      <div className="col-span-2">
                        {selectedFollowUp.leadName}
                      </div>

                      <div className="font-medium">Phone:</div>
                      <div className="col-span-2">{selectedFollowUp.phone}</div>

                      <div className="font-medium">Email:</div>
                      <div className="col-span-2">{selectedFollowUp.email}</div>

                      <div className="font-medium">Lead Status:</div>
                      <div className="col-span-2">
                        {getLeadStatusBadge(selectedFollowUp.leadStatus)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">
                      Follow-up Information
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium">Date:</div>
                      <div className="col-span-2">
                        {format(selectedFollowUp.date, "MMMM dd, yyyy")}
                      </div>

                      <div className="font-medium">Time:</div>
                      <div className="col-span-2">
                        {format(selectedFollowUp.date, "h:mm a")}
                      </div>

                      <div className="font-medium">Status:</div>
                      <div className="col-span-2">
                        {getStatusBadge(selectedFollowUp.status)}
                      </div>

                      <div className="font-medium">Reminder:</div>
                      <div className="col-span-2">
                        {selectedFollowUp.reminderSent ? "Sent" : "Not sent"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Notes</h3>
                    <p className="text-sm">{selectedFollowUp.notes}</p>
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
                    handleEditFollowUp(selectedFollowUp);
                  }}
                >
                  Edit Follow-up
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Follow-up Modal */}
        {editedFollowUp && (
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Follow-up</DialogTitle>
                <DialogDescription>
                  Update follow-up details for {editedFollowUp.leadName}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="followUpStatus" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={editedFollowUp.status}
                    onValueChange={(
                      value: "Pending" | "Completed" | "Missed",
                    ) =>
                      setEditedFollowUp({ ...editedFollowUp, status: value })
                    }
                  >
                    <SelectTrigger id="followUpStatus" className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Missed">Missed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leadStatus" className="text-right">
                    Lead Status
                  </Label>
                  <Select
                    value={editedFollowUp.leadStatus}
                    onValueChange={(
                      value:
                        | "New"
                        | "Interested"
                        | "Not Interested"
                        | "Admission Taken",
                    ) =>
                      setEditedFollowUp({
                        ...editedFollowUp,
                        leadStatus: value,
                      })
                    }
                  >
                    <SelectTrigger id="leadStatus" className="col-span-3">
                      <SelectValue placeholder="Select lead status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
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

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="followUpDate" className="text-right">
                    Date & Time
                  </Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="followUpDate"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {format(editedFollowUp.date, "PPP p")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={editedFollowUp.date}
                          onSelect={(date) => {
                            if (date) {
                              const newDate = new Date(editedFollowUp.date);
                              newDate.setFullYear(date.getFullYear());
                              newDate.setMonth(date.getMonth());
                              newDate.setDate(date.getDate());
                              setEditedFollowUp({
                                ...editedFollowUp,
                                date: newDate,
                              });
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={editedFollowUp.notes}
                    onChange={(e) =>
                      setEditedFollowUp({
                        ...editedFollowUp,
                        notes: e.target.value,
                      })
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

export default FollowUpsPage;
