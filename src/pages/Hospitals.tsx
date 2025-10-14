import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ChevronRight, ArrowLeft } from "lucide-react";
import { hospitals } from "@/data/mockData";

const Hospitals = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city") || "";
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  useEffect(() => {
    if (city) {
      setFilteredHospitals(hospitals.filter(h => h.city === city));
    }
  }, [city]);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Hospitals in {city}
          </h1>
          <p className="text-muted-foreground text-lg">
            {filteredHospitals.length} hospitals found
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card 
              key={hospital.id} 
              className="hover:shadow-lg transition-all cursor-pointer group border-border bg-card"
              onClick={() => navigate(`/doctors?hospitalId=${hospital.id}`)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={hospital.image} 
                  alt={hospital.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-card-foreground">{hospital.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {hospital.address}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{hospital.rating}</span>
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    Top Rated
                  </Badge>
                </div>

                <Button 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/doctors?hospitalId=${hospital.id}`);
                  }}
                >
                  View Doctors
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
