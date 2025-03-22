import React, { useState } from "react";
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
import { Calendar, Phone, Clock, CheckCircle } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const FollowUpsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for follow-ups
  const followUps = [
    {
      id: "1",
      leadName: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      date: new Date(Date.now() + 3600000), // 1 hour from now
      status: "Scheduled",
      notes: "Discuss program details and fees",
      leadStatus: "Interested",
    },
    {
      id: "2",
      leadName: "Jane Smith",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com",
      date: new Date(Date.now() + 7200000), // 2 hours from now
      status: "Scheduled",
      notes: "Follow up on previous conversation about admission requirements",
      leadStatus: "Interested",
    },
    {
      id: "3",
      leadName: "Michael Johnson",
      phone: "+1 (555) 456-7890",
      email: "michael.j@example.com",
      date: new Date(Date.now() + 10800000), // 3 hours from now
      status: "Scheduled",
      notes: "Provide additional information about scholarship opportunities",
      leadStatus: "Interested",
    },
    {
      id: "4",
      leadName: "Sarah Williams",
      phone: "+1 (555) 789-0123",
      email: "sarah.w@example.com",
      date: new Date(Date.now() + 86400000), // Tomorrow
      status: "Scheduled",
      notes: "Final discussion before admission decision",
      leadStatus: "Interested",
    },
    {
      id: "5",
      leadName: "Robert Brown",
      phone: "+1 (555) 234-5678",
      email: "robert.b@example.com",
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      status: "Scheduled",
      notes: "Initial follow-up after website inquiry",
      leadStatus: "New",
    },
  ];

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

  // Filter follow-ups for the selected date
  const filteredFollowUps = followUps.filter(
    (followUp) => date && followUp.date.toDateString() === date.toDateString(),
  );

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
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                In the last 30 days
              </p>
            </CardContent>
          </Card>
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
                    : `Follow-ups for ${formatDate(date).split(",")[0]}`
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
                        <TableCell>
                          {formatDate(followUp.date).split(", ")[1]}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{followUp.leadStatus}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {followUp.notes}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No follow-ups scheduled for this date
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
};

export default FollowUpsPage;
