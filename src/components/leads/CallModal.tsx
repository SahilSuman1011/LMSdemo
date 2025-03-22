import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Phone } from "lucide-react";

interface CallModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  leadName?: string;
  leadPhone?: string;
  onSave?: (data: CallDispositionData) => void;
}

interface CallDispositionData {
  callStatus: string;
  leadProgress: string;
  followUpDate?: Date;
  remarks: string;
}

const CallModal = ({
  open = true,
  onOpenChange = () => {},
  leadName = "John Doe",
  leadPhone = "+1 (555) 123-4567",
  onSave = () => {},
}: CallModalProps) => {
  const [callStatus, setCallStatus] = useState<string>("connected");
  const [leadProgress, setLeadProgress] = useState<string>("interested");
  const [followUpDate, setFollowUpDate] = useState<Date>();
  const [remarks, setRemarks] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSave = () => {
    onSave({
      callStatus,
      leadProgress,
      followUpDate,
      remarks,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call Disposition
          </DialogTitle>
          <DialogDescription>
            Update call status for{" "}
            <span className="font-medium">{leadName}</span> ({leadPhone})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="callStatus" className="text-right font-medium">
              Call Status
            </label>
            <Select value={callStatus} onValueChange={setCallStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select call status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="not_connected">Not Connected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="leadProgress" className="text-right font-medium">
              Lead Progress
            </label>
            <Select value={leadProgress} onValueChange={setLeadProgress}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select lead progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="not_interested">Not Interested</SelectItem>
                <SelectItem value="admission_taken">Admission Taken</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="followUpDate" className="text-right font-medium">
              Follow-up Date
            </label>
            <div className="col-span-3">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {followUpDate ? (
                      format(followUpDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={followUpDate}
                    onSelect={(date) => {
                      setFollowUpDate(date);
                      setCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="remarks" className="text-right font-medium">
              Remarks
            </label>
            <Textarea
              id="remarks"
              placeholder="Add call remarks here..."
              className="col-span-3"
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;
