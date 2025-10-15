import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, IndianRupee, ArrowLeft, Calendar, Award, Briefcase, Languages, GraduationCap, Trophy, CheckCircle, MessageSquare } from "lucide-react";
import { doctors, hospitals, patientReviews } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import FeedbackForm from "@/components/FeedbackForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === parseInt(id || "0"));
  const hospital = hospitals.find(h => h.id === doctor?.hospitalId);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Doctor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Profile Card */}
            <Card className="lg:col-span-2 border-border bg-card">
              <CardHeader>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2 text-card-foreground">{doctor.name}</CardTitle>
                  <Badge variant="secondary" className="mb-3 bg-secondary text-secondary-foreground">
                    {doctor.specialization}
                  </Badge>
                  <CardDescription className="text-base text-muted-foreground">
                    {doctor.qualification}
                  </CardDescription>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{doctor.rating}</span>
                      <span className="text-muted-foreground text-sm">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-5 h-5" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-card-foreground">
                  <Award className="w-5 h-5 text-primary" />
                  About
                </h3>
                <p className="text-muted-foreground leading-relaxed">{doctor.about}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-card-foreground">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Education & Qualifications
                </h3>
                <div className="space-y-2">
                  {doctor.education.map((edu, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-card-foreground">
                  <Trophy className="w-5 h-5 text-primary" />
                  Awards & Recognition
                </h3>
                <div className="space-y-2">
                  {doctor.awards.map((award, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{award}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-card-foreground">
                  <Languages className="w-5 h-5 text-primary" />
                  Languages Spoken
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 text-card-foreground">Hospital Details</h3>
                <p className="font-medium text-foreground">{hospital?.name}</p>
                <p className="text-muted-foreground text-sm">{hospital?.address}</p>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-card-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    Consultation Hours
                  </h3>
                  <p className="text-muted-foreground">{doctor.timing}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-card-foreground">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    Consultation Fee
                  </h3>
                  <p className="text-2xl font-bold text-foreground">₹{doctor.consultationFee}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Card */}
          <Card className="lg:col-span-1 h-fit sticky top-6 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Book Appointment</CardTitle>
              <CardDescription className="text-muted-foreground">Schedule your consultation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Consultation Fee</p>
                <p className="text-2xl font-bold text-foreground">₹{doctor.consultationFee}</p>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">{doctor.availability}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Next available: {doctor.nextAvailable}
                </p>
              </div>
              
              <Button 
                variant="hero" 
                className="w-full"
                size="lg"
                onClick={() => navigate(`/appointment/${doctor.id}`)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Instant confirmation • Digital OP card
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Patient Reviews Section */}
        <Card className="mt-6 border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground">Patient Reviews</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {patientReviews.filter(r => r.doctorId === doctor.id).length} verified reviews
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Leave Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <FeedbackForm
                    doctorId={doctor.id}
                    doctorName={doctor.name}
                    onClose={() => {}}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {patientReviews
              .filter(review => review.doctorId === doctor.id)
              .map((review) => (
                <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{review.patientName}</p>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
              ))}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
