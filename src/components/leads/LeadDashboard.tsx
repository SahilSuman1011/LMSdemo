import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, Calendar, Phone, TrendingUp } from "lucide-react";
import LeadTable from "./LeadTable";
import LeadFilters from "./LeadFilters";
import CallModal from "./CallModal";
import LeadDetailsModal from "./LeadDetailsModal";
import AddLeadModal from "./AddLeadModal";
import { Lead } from "@/types/lead";

export const LeadDashboard = () => {
  // State for leads and filtered leads
  const [leads, setLeads] = useState<Lead[]>([
    // Sample data - would come from API in real app
    {
      id: "L-001",
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.com",
      source: "Website",
      callStatus: "Connected",
      leadStatus: "Interested",
      followUpDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      lastContactedDate: new Date().toISOString(),
      remarks: "Interested in science courses",
    },
    // More sample leads...
  ]);

  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);

  // State for modals
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Update filtered leads when leads change
  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

  // Calculate stats
  const totalLeads = leads.length;
  const todayFollowUps = leads.filter(
    (lead) =>
      lead.followUpDate &&
      new Date(lead.followUpDate).toDateString() === new Date().toDateString(),
  ).length;
  const connectedCalls = leads.filter(
    (lead) => lead.callStatus === "Connected",
  ).length;
  const admissionsTaken = leads.filter(
    (lead) => lead.leadStatus === "Admission Taken",
  ).length;
  const conversionRate = totalLeads
    ? Math.round((admissionsTaken / totalLeads) * 100)
    : 0;

  // Handlers
  const handleFilterChange = (filters: any) => {
    let filtered = [...leads];

    // Apply filters
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm) ||
          lead.phone.includes(searchTerm) ||
          lead.email.toLowerCase().includes(searchTerm),
      );
    }

    if (filters.callStatus && filters.callStatus !== "all") {
      filtered = filtered.filter(
        (lead) => lead.callStatus === filters.callStatus,
      );
    }

    if (filters.leadStatus && filters.leadStatus !== "all") {
      filtered = filtered.filter(
        (lead) => lead.leadStatus === filters.leadStatus,
      );
    }

    setFilteredLeads(filtered);
  };

  const handleCallLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsCallModalOpen(true);
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailsModalOpen(true);
  };

  const handleScheduleFollowUp = (lead: Lead, date: Date) => {
    // Update the lead with the new follow-up date
    const updatedLeads = leads.map((l) => {
      if (l.id === lead.id) {
        return { ...l, followUpDate: date.toISOString() };
      }
      return l;
    });

    setLeads(updatedLeads);
  };

  const handleSaveCallDisposition = (data: any) => {
    if (selectedLead) {
      // Update the lead with the call disposition
      const updatedLeads = leads.map((lead) => {
        if (lead.id === selectedLead.id) {
          return {
            ...lead,
            callStatus:
              data.callStatus === "connected" ? "Connected" : "Not Connected",
            leadStatus:
              data.leadProgress === "interested"
                ? "Interested"
                : data.leadProgress === "not_interested"
                  ? "Not Interested"
                  : "Admission Taken",
            followUpDate: data.followUpDate
              ? data.followUpDate.toISOString()
              : lead.followUpDate,
            lastContactedDate: new Date().toISOString(),
            remarks: data.remarks,
          };
        }
        return lead;
      });

      // Update both the full leads list and the filtered list
      setLeads(updatedLeads);
    }
  };

  return (
    <div className="w-full bg-background p-4 md:p-6 space-y-6 dark:bg-background">
      {/* Header with title and add button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lead Dashboard</h1>
        <Button className="gap-2" onClick={() => setIsAddLeadModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add New Lead
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border hover:shadow-md transition-shadow dark:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card className="border border-border hover:shadow-md transition-shadow dark:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Follow-ups
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayFollowUps}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>

        <Card className="border border-border hover:shadow-md transition-shadow dark:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Connected Calls
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center">
              <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedCalls}</div>
            <p className="text-xs text-muted-foreground">
              Out of {totalLeads} leads
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border hover:shadow-md transition-shadow dark:border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Admissions taken</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different lead views */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full max-w-md grid grid-cols-4">
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="today">Today's Follow-ups</TabsTrigger>
          <TabsTrigger value="interested">Interested</TabsTrigger>
          <TabsTrigger value="converted">Converted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <LeadFilters onFilterChange={handleFilterChange} />
          <LeadTable
            leads={filteredLeads}
            onCallLead={handleCallLead}
            onViewDetails={handleViewDetails}
            onScheduleFollowUp={handleScheduleFollowUp}
          />
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <LeadFilters onFilterChange={handleFilterChange} />
          <LeadTable
            leads={leads.filter(
              (lead) =>
                lead.followUpDate &&
                new Date(lead.followUpDate).toDateString() ===
                  new Date().toDateString(),
            )}
            onCallLead={handleCallLead}
            onViewDetails={handleViewDetails}
            onScheduleFollowUp={handleScheduleFollowUp}
          />
        </TabsContent>

        <TabsContent value="interested" className="space-y-4">
          <LeadFilters onFilterChange={handleFilterChange} />
          <LeadTable
            leads={leads.filter((lead) => lead.leadStatus === "Interested")}
            onCallLead={handleCallLead}
            onViewDetails={handleViewDetails}
            onScheduleFollowUp={handleScheduleFollowUp}
          />
        </TabsContent>

        <TabsContent value="converted" className="space-y-4">
          <LeadFilters onFilterChange={handleFilterChange} />
          <LeadTable
            leads={leads.filter(
              (lead) => lead.leadStatus === "Admission Taken",
            )}
            onCallLead={handleCallLead}
            onViewDetails={handleViewDetails}
            onScheduleFollowUp={handleScheduleFollowUp}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {selectedLead && (
        <>
          <CallModal
            open={isCallModalOpen}
            onOpenChange={setIsCallModalOpen}
            leadName={selectedLead.name}
            leadPhone={selectedLead.phone}
            onSave={handleSaveCallDisposition}
          />

          <LeadDetailsModal
            open={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
            lead={{
              id: selectedLead.id,
              name: selectedLead.name,
              phone: selectedLead.phone,
              email: selectedLead.email,
              address: "123 Main St, Anytown, USA", // Placeholder
              source: selectedLead.source,
              status:
                selectedLead.leadStatus === "Admission Taken"
                  ? "Converted"
                  : selectedLead.leadStatus === "Not Interested"
                    ? "Closed"
                    : "In Progress",
              assignedTo: "Current User", // Placeholder
              createdAt: new Date(Date.now() - 1000000000), // Placeholder
              nextFollowUp: selectedLead.followUpDate
                ? new Date(selectedLead.followUpDate)
                : null,
              callHistory: [
                {
                  id: "CH-001",
                  date: selectedLead.lastContactedDate
                    ? new Date(selectedLead.lastContactedDate)
                    : new Date(),
                  status: selectedLead.callStatus as
                    | "Connected"
                    | "Not Connected",
                  disposition: selectedLead.leadStatus as
                    | "Interested"
                    | "Not Interested"
                    | "Admission Taken"
                    | null,
                  remarks: selectedLead.remarks,
                  agent: "Current User", // Placeholder
                },
              ],
              notes: selectedLead.remarks || "No notes available.",
            }}
          />
        </>
      )}

      {/* Add Lead Modal */}
      <AddLeadModal
        open={isAddLeadModalOpen}
        onOpenChange={setIsAddLeadModalOpen}
        onSave={(newLead) => {
          // In a real app, this would add the lead to the database
          // For now, we'll just add it to our local state
          const leadWithDefaults = {
            id: `new-${Date.now()}`,
            callStatus: "Pending",
            leadStatus: "New",
            followUpDate: null,
            lastContactedDate: null,
            remarks: "",
            ...newLead,
          };

          // Update both the full leads list and the filtered list
          const updatedLeads = [leadWithDefaults, ...leads];
          setLeads(updatedLeads);
        }}
      />
    </div>
  );
};

export default LeadDashboard;
