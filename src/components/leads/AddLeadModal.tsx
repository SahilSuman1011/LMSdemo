import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";

interface AddLeadModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (data: {
    name: string;
    phone: string;
    email: string;
    source: string;
  }) => void;
}

const AddLeadModal = ({
  open = false,
  onOpenChange = () => {},
  onSave = () => {},
}: AddLeadModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("Website");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset form when modal opens or closes
  React.useEffect(() => {
    if (!open) {
      // Reset form when modal closes
      setName("");
      setPhone("");
      setEmail("");
      setSource("Website");
      setErrors({});
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    onSave({
      name,
      phone,
      email,
      source,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card dark:bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Lead
          </DialogTitle>
          <DialogDescription>
            Enter the details of the new lead below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-medium">
                Full Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right font-medium">
                Phone
              </Label>
              <div className="col-span-3">
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right font-medium">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right font-medium">
                Source
              </Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select lead source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadModal;
