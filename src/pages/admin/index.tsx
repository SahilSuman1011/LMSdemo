import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Download,
  Filter,
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  // Mock data for the admin dashboard
  const salesReps = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      leads: 45,
      conversions: 12,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      leads: 38,
      conversions: 15,
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      leads: 52,
      conversions: 8,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      leads: 29,
      conversions: 10,
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael@example.com",
      leads: 41,
      conversions: 14,
    },
  ];

  const leads = [
    {
      id: 1,
      name: "Alex Thompson",
      phone: "+1 555-123-4567",
      source: "Website",
      status: "New",
      assignedTo: null,
    },
    {
      id: 2,
      name: "Sarah Parker",
      phone: "+1 555-234-5678",
      source: "Referral",
      status: "New",
      assignedTo: null,
    },
    {
      id: 3,
      name: "David Miller",
      phone: "+1 555-345-6789",
      source: "Social Media",
      status: "New",
      assignedTo: null,
    },
    {
      id: 4,
      name: "Lisa Brown",
      phone: "+1 555-456-7890",
      source: "Website",
      status: "New",
      assignedTo: null,
    },
    {
      id: 5,
      name: "Kevin White",
      phone: "+1 555-567-8901",
      source: "Email Campaign",
      status: "New",
      assignedTo: null,
    },
  ];

  const performanceMetrics = [
    {
      metric: "Total Leads",
      value: 205,
      change: "+12%",
      icon: <Users className="h-4 w-4" />,
    },
    {
      metric: "Conversions",
      value: 59,
      change: "+8%",
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      metric: "Conversion Rate",
      value: "28.7%",
      change: "+2.3%",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      metric: "Avg. Response Time",
      value: "3.2h",
      change: "-15%",
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="admin" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header userName="Admin User" userRole="Administrator" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {metric.metric}
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {metric.value}
                          </h3>
                          <p
                            className={`text-xs mt-1 ${metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {metric.change} from last month
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {metric.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>
                    Overview of your sales team performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">
                          Assigned Leads
                        </TableHead>
                        <TableHead className="text-right">
                          Conversions
                        </TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesReps.map((rep) => (
                        <TableRow key={rep.id}>
                          <TableCell className="font-medium">
                            {rep.name}
                          </TableCell>
                          <TableCell>{rep.email}</TableCell>
                          <TableCell className="text-right">
                            {rep.leads}
                          </TableCell>
                          <TableCell className="text-right">
                            {rep.conversions}
                          </TableCell>
                          <TableCell className="text-right">
                            {((rep.conversions / rep.leads) * 100).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search team members..."
                    className="pl-10"
                  />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team Member</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">
                          Assigned Leads
                        </TableHead>
                        <TableHead className="text-right">
                          Conversions
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesReps.map((rep) => (
                        <TableRow key={rep.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rep.name}`}
                                />
                                <AvatarFallback>
                                  {rep.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{rep.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{rep.email}</TableCell>
                          <TableCell>Sales Representative</TableCell>
                          <TableCell className="text-right">
                            {rep.leads}
                          </TableCell>
                          <TableCell className="text-right">
                            {rep.conversions}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-500 border-blue-500 hover:bg-blue-50"
                              >
                                Assign Leads
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leads" className="space-y-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search leads..." className="pl-10" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Lead Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="interested">Interested</SelectItem>
                      <SelectItem value="not-interested">
                        Not Interested
                      </SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Dialog
                  open={assignDialogOpen}
                  onOpenChange={setAssignDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Leads
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Leads to Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="team-member">Select Team Member</Label>
                        <Select>
                          <SelectTrigger id="team-member">
                            <SelectValue placeholder="Select team member" />
                          </SelectTrigger>
                          <SelectContent>
                            {salesReps.map((rep) => (
                              <SelectItem
                                key={rep.id}
                                value={rep.id.toString()}
                              >
                                {rep.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Select Leads to Assign</Label>
                        <div className="border rounded-md p-4 max-h-60 overflow-y-auto space-y-2">
                          {leads.map((lead) => (
                            <div
                              key={lead.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={`lead-${lead.id}`}
                                className="rounded border-gray-300"
                              />
                              <label
                                htmlFor={`lead-${lead.id}`}
                                className="text-sm flex-1"
                              >
                                {lead.name} - {lead.phone}
                              </label>
                              <Badge variant="outline">{lead.source}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setAssignDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setAssignDialogOpen(false)}>
                        Assign Selected Leads
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">
                            {lead.name}
                          </TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>{lead.source}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                lead.status === "New" ? "default" : "outline"
                              }
                            >
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {lead.assignedTo ? (
                              lead.assignedTo
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                Unassigned
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-500 border-blue-500 hover:bg-blue-50"
                              >
                                Assign
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
