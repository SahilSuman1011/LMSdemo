import React, { useState } from "react";
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
import { Phone, Search, Filter, Calendar } from "lucide-react";

const CallsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for calls
  const calls = [
    {
      id: "1",
      leadName: "John Doe",
      phone: "+1 (555) 123-4567",
      date: new Date(),
      status: "Connected",
      disposition: "Interested",
      duration: "5:23",
      agent: "Current User",
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

  // Filter calls based on active tab
  const filteredCalls = calls.filter((call) => {
    if (activeTab === "all") return true;
    if (activeTab === "connected") return call.status === "Connected";
    if (activeTab === "not_connected") return call.status === "Not Connected";
    if (activeTab === "today") {
      const today = new Date().toDateString();
      return call.date.toDateString() === today;
    }
    return true;
  });

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
                    {filteredCalls.map((call) => (
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
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
};

export default CallsPage;
