import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, IndianRupee, ArrowLeft, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctors, specializations, hospitals } from "@/data/mockData";

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hospitalId = parseInt(searchParams.get("hospitalId") || "0");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  
  const hospital = hospitals.find(h => h.id === hospitalId);

  useEffect(() => {
    let filtered = doctors.filter(d => d.hospitalId === hospitalId);
    if (selectedSpecialization !== "all") {
      filtered = filtered.filter(d => d.specialization === selectedSpecialization);
    }
    setFilteredDoctors(filtered);
  }, [hospitalId, selectedSpecialization]);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Doctors at {hospital?.name}
              </h1>
              <p className="text-muted-foreground text-lg">
                {filteredDoctors.length} doctors available
              </p>
            </div>

            <div className="w-full sm:w-64">
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Specialization" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card 
              key={doctor.id}
              className="hover:shadow-lg transition-all border-border bg-card"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1 text-card-foreground">{doctor.name}</CardTitle>
                    <Badge variant="secondary" className="mb-2 bg-secondary text-secondary-foreground">
                      {doctor.specialization}
                    </Badge>
                    <CardDescription className="text-sm text-muted-foreground">
                      {doctor.qualification}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{doctor.experience} years</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span>{doctor.rating} ({doctor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">{doctor.timing}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-foreground font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    <span>{doctor.consultationFee}</span>
                  </div>
                  <Button 
                    onClick={() => navigate(`/doctor/${doctor.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
