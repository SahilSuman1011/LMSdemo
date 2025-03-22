export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  callStatus: string;
  leadStatus: string;
  followUpDate: string | null;
  lastContactedDate: string | null;
  remarks: string;
}
