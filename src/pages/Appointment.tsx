import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { doctors, hospitals } from "@/data/mockData";
import { toast } from "sonner";

const Appointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === parseInt(id || "0"));
  const hospital = hospitals.find(h => h.id === doctor?.hospitalId);
  
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    symptoms: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    // Generate appointment data
    const appointmentData = {
      ...formData,
      date: format(date, "PPP"),
      doctor: doctor?.name,
      hospital: hospital?.name,
      department: doctor?.specialization,
      fee: doctor?.consultationFee
    };

    // Store in sessionStorage for OP card generation
    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    
    toast.success("Appointment booked successfully!");
    navigate("/op-card");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Doctor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-3xl text-card-foreground">Book Appointment</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in your details to confirm your appointment with {doctor.name}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Patient Information</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name"
                      placeholder="Enter your name"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange("patientName", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input 
                      id="age"
                      type="number"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Input 
                      id="gender"
                      placeholder="Male/Female/Other"
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                  <Textarea 
                    id="symptoms"
                    placeholder="Describe your symptoms"
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {/* Appointment Date */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Select Date</h3>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Appointment Summary */}
              <Card className="bg-muted border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor:</span>
                    <span className="font-medium text-foreground">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Specialization:</span>
                    <span className="font-medium text-foreground">{doctor.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hospital:</span>
                    <span className="font-medium text-foreground">{hospital?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consultation Fee:</span>
                    <span className="font-bold text-lg text-foreground">₹{doctor.consultationFee}</span>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Check className="w-5 h-5 mr-2" />
                Confirm Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointment;
