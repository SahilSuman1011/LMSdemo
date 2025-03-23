export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  callStatus: "Connected" | "Not Connected" | "Pending";
  leadStatus: "New" | "Interested" | "Not Interested" | "Admission Taken";
  followUpDate: string | null;
  lastContactedDate: string | null;
  remarks: string;
}

export interface CallDispositionData {
  callStatus: string;
  leadProgress: string;
  followUpDate?: Date;
  remarks: string;
}
