import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Home, CheckCircle2, Calendar, User, Stethoscope, Building2, IndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";

interface AppointmentData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  symptoms: string;
  date: string;
  doctor: string;
  hospital: string;
  department: string;
  fee: number;
}

const OPCard = () => {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("appointmentData");
    if (data) {
      setAppointmentData(JSON.parse(data));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleDownload = () => {
    window.print();
  };

  if (!appointmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const opNumber = `OP${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Appointment Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your OP card has been generated successfully
            </p>
          </div>

          {/* OP Card */}
          <Card className="border-2 border-primary shadow-xl bg-card print:shadow-none">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              <div className="text-center">
                <CardTitle className="text-2xl mb-2">Swift Med Help OP Card</CardTitle>
                <p className="text-sm opacity-90">Outpatient Registration Card</p>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              {/* OP Number */}
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">OP Number</p>
                <p className="text-3xl font-bold text-primary">{opNumber}</p>
              </div>

              <Separator />

              {/* Patient Details */}
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                  <User className="w-5 h-5 text-primary" />
                  Patient Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold text-foreground">{appointmentData.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age / Gender</p>
                    <p className="font-semibold text-foreground">{appointmentData.age} / {appointmentData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold text-foreground">{appointmentData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Appointment Date</p>
                    <p className="font-semibold text-foreground">{appointmentData.date}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Hospital & Doctor Details */}
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                  <Building2 className="w-5 h-5 text-primary" />
                  Hospital & Doctor Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Hospital</p>
                    <p className="font-semibold text-foreground">{appointmentData.hospital}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-semibold text-foreground">{appointmentData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Consulting Doctor</p>
                    <p className="font-semibold text-foreground">{appointmentData.doctor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    <p className="font-semibold text-lg text-foreground">₹{appointmentData.fee}</p>
                  </div>
                </div>
              </div>

              {appointmentData.symptoms && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Symptoms / Reason for Visit</p>
                    <p className="text-foreground">{appointmentData.symptoms}</p>
                  </div>
                </>
              )}

              <Separator />

              {/* Instructions */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Important Instructions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Please carry this OP card along with a valid ID proof</li>
                  <li>• Arrive 15 minutes before your scheduled appointment</li>
                  <li>• Bring any relevant medical reports or prescriptions</li>
                  <li>• Contact the hospital if you need to reschedule</li>
                  <li>• Emergency contact: +91-9876543210</li>
                </ul>
              </div>

              {/* QR Code */}
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-gray-200">
                  <div className="grid grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 ${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  Scan this QR code at the hospital for quick check-in
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {opNumber}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
            <Button 
              variant="hero" 
              size="lg" 
              className="flex-1"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download OP Card
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/")}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OPCard;
