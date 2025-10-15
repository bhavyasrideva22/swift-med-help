import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { MapPin, Star, ChevronRight, ArrowLeft, Bed, Wifi, Car, Ambulance, Calendar, Users, Filter, Search, Shield, Clock } from "lucide-react";
import { hospitals, services, segregationTypes } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const Hospitals = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get("city") || "";
  const search = searchParams.get("search") || "";
  const specialization = searchParams.get("specialization") || "";
  
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [searchQuery, setSearchQuery] = useState("");
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedSegregation, setSelectedSegregation] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = hospitals;
    
    // Filter by city
    if (city) {
      filtered = filtered.filter(h => h.city === city);
    }
    
    // Filter by search query
    if (search || searchQuery) {
      const query = search || searchQuery;
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        h.address.toLowerCase().includes(query.toLowerCase()) ||
        h.facilities.some(f => f.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Filter by specialization
    if (specialization) {
      filtered = filtered.filter(h => 
        h.departments.some(deptId => {
          // This would need to be mapped to actual department names
          return true; // Placeholder
        })
      );
    }
    
    // Filter by rating
    filtered = filtered.filter(h => h.rating >= minRating);
    
    // Filter by services
    if (selectedServices.length > 0) {
      filtered = filtered.filter(h => 
        selectedServices.every(serviceId => h.services.includes(serviceId))
      );
    }
    
    // Filter by segregation
    if (selectedSegregation.length > 0) {
      filtered = filtered.filter(h => 
        selectedSegregation.every(segId => h.segregation.includes(segId))
      );
    }
    
    setFilteredHospitals(filtered);
  }, [city, search, searchQuery, specialization, minRating, selectedServices, selectedSegregation]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Hospitals in {city}
            </h1>
            <p className="text-muted-foreground text-lg">
              {filteredHospitals.length} hospitals found
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search hospitals by name, address, or facilities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                    {/* Rating Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Minimum Rating: {minRating}
                      </label>
                      <Slider
                        value={[minRating]}
                        onValueChange={(value) => setMinRating(value[0])}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    {/* Services Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Services</label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {services.map((service) => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`service-${service.id}`}
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedServices([...selectedServices, service.id]);
                                } else {
                                  setSelectedServices(selectedServices.filter(id => id !== service.id));
                                }
                              }}
                            />
                            <label htmlFor={`service-${service.id}`} className="text-sm flex items-center gap-2">
                              <span>{service.icon}</span>
                              {service.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Segregation Filter */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Room Types</label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {segregationTypes.map((segregation) => (
                          <div key={segregation.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`segregation-${segregation.id}`}
                              checked={selectedSegregation.includes(segregation.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSegregation([...selectedSegregation, segregation.id]);
                                } else {
                                  setSelectedSegregation(selectedSegregation.filter(id => id !== segregation.id));
                                }
                              }}
                            />
                            <label htmlFor={`segregation-${segregation.id}`} className="text-sm flex items-center gap-2">
                              <span>{segregation.icon}</span>
                              {segregation.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

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
                      <span className="text-sm text-muted-foreground">({hospital.reviews} reviews)</span>
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      {hospital.rating >= 4.7 ? "Top Rated" : "Highly Rated"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Bed className="w-4 h-4" />
                      <span>{hospital.beds} beds</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Est. {hospital.established}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hospital.emergency && (
                      <Badge variant="destructive" className="text-xs">
                        <Ambulance className="w-3 h-3 mr-1" />
                        Emergency
                      </Badge>
                    )}
                    {hospital.ambulance && (
                      <Badge variant="outline" className="text-xs">
                        Ambulance
                      </Badge>
                    )}
                    {hospital.parking && (
                      <Badge variant="outline" className="text-xs">
                        <Car className="w-3 h-3 mr-1" />
                        Parking
                      </Badge>
                    )}
                    {hospital.wifi && (
                      <Badge variant="outline" className="text-xs">
                        <Wifi className="w-3 h-3 mr-1" />
                        WiFi
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/departments?hospitalId=${hospital.id}`);
                      }}
                    >
                      View Departments
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctors?hospitalId=${hospital.id}`);
                      }}
                    >
                      View Doctors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
