import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Truck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICE_REQUEST_SETTINGS } from "@template-truck-repair/data/siteData";
import { createServiceRequest, getEtaMinutes, type RequestPriority } from "@template-truck-repair/lib/serviceRequests";
import { cn } from "@/lib/utils";

interface Props {
  emergency?: boolean;
  className?: string;
}

const ServiceRequestForm = ({ emergency, className }: Props) => {
  const navigate = useNavigate();
  const [priority, setPriority] = useState<RequestPriority>(emergency ? "Emergency" : "Standard");
  const [vehicleType, setVehicleType] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [gps, setGps] = useState<{ lat: number; lng: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const captureGps = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      },
      () => undefined,
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    const req = createServiceRequest({
      priority,
      vehicleType,
      unitNumber,
      companyName,
      name,
      phone,
      email,
      issue,
      location,
      gpsLat: gps?.lat,
      gpsLng: gps?.lng,
    });
    setSubmitting(false);
    navigate(`/request-service/confirmation/${req.ticketNumber}`);
  };

  const eta = getEtaMinutes(priority);

  return (
    <form onSubmit={handleSubmit} className={cn("bg-white border border-border p-6 md:p-8 shadow-lg", className)}>
      {emergency && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 p-4 mb-6">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">Emergency breakdown — dispatch responds immediately. Avg ETA: ~{eta} minutes.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider">Priority</Label>
          <Select value={priority} onValueChange={v => setPriority(v as RequestPriority)}>
            <SelectTrigger className="rounded-none h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SERVICE_REQUEST_SETTINGS.priorities.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider">Vehicle Type</Label>
          <Select value={vehicleType} onValueChange={setVehicleType} required>
            <SelectTrigger className="rounded-none h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              {SERVICE_REQUEST_SETTINGS.vehicleTypes.map(v => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider">Unit #</Label>
          <Input value={unitNumber} onChange={e => setUnitNumber(e.target.value)} className="rounded-none h-11" placeholder="Truck/trailer number" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider">Company / Fleet</Label>
          <Input value={companyName} onChange={e => setCompanyName(e.target.value)} className="rounded-none h-11" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider">Contact Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} required className="rounded-none h-11" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider">Phone</Label>
          <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="rounded-none h-11" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider">Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-none h-11" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Breakdown Location</Label>
          <div className="flex gap-2">
            <Input value={location} onChange={e => setLocation(e.target.value)} required className="rounded-none h-11 flex-1" placeholder="Address or highway mile marker" />
            <Button type="button" variant="outline" onClick={captureGps} className="rounded-none shrink-0">GPS</Button>
          </div>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider flex items-center gap-2"><Truck className="h-3.5 w-3.5" /> Issue Description</Label>
          <Textarea value={issue} onChange={e => setIssue(e.target.value)} required className="rounded-none min-h-[100px]" placeholder="Describe the problem, warning lights, symptoms..." />
        </div>
      </div>

      <div className="mt-4 p-3 bg-[hsl(var(--muted))] text-sm flex justify-between items-center">
        <span className="text-muted-foreground">Estimated response:</span>
        <span className="font-semibold text-[hsl(var(--secondary))]">~{eta} minutes</span>
      </div>

      <Button type="submit" disabled={submitting} className="w-full mt-6 rounded-none h-12 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white uppercase text-xs tracking-widest font-semibold">
        {submitting ? "Submitting..." : emergency ? "Submit Emergency Request" : "Submit Service Request"}
      </Button>
    </form>
  );
};

export default ServiceRequestForm;
