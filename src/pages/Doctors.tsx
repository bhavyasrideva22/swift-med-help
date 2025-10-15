import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Clock, IndianRupee, ArrowLeft, User, Filter, SlidersHorizontal, Search, Video, Phone, AlertCircle, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { doctors, specializations, hospitals, consultationTypes } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hospitalId = parseInt(searchParams.get("hospitalId") || "0");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [selectedHospital, setSelectedHospital] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedConsultationType, setSelectedConsultationType] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("rating");
  
  const hospital = hospitals.find(h => h.id === hospitalId);

  useEffect(() => {
    let filtered = doctors;
    
    // Filter by hospital if hospitalId is provided
    if (hospitalId && hospitalId > 0) {
      filtered = filtered.filter(d => d.hospitalId === hospitalId);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.qualification.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by specialization
    if (selectedSpecialization !== "all") {
      filtered = filtered.filter(d => d.specialization === selectedSpecialization);
    }
    
    // Filter by hospital (only if not already filtered by hospitalId)
    if (selectedHospital !== "all" && !hospitalId) {
      const hospitalIdToFilter = parseInt(selectedHospital);
      filtered = filtered.filter(d => d.hospitalId === hospitalIdToFilter);
    }
    
    // Filter by price range (adjusted for consultation type)
    const consultationType = consultationTypes.find(ct => ct.id === selectedConsultationType);
    const priceMultiplier = consultationType?.priceMultiplier || 1.0;
    filtered = filtered.filter(d => {
      const adjustedPrice = d.consultationFee * priceMultiplier;
      return adjustedPrice >= priceRange[0] && adjustedPrice <= priceRange[1];
    });
    
    // Filter by minimum rating
    filtered = filtered.filter(d => d.rating >= minRating);
    
    // Filter by availability
    if (showAvailableOnly) {
      filtered = filtered.filter(d => d.availability === "Available");
    }
    
    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.consultationFee - b.consultationFee;
        case "price-high":
          return b.consultationFee - a.consultationFee;
        case "experience":
          return b.experience - a.experience;
        default:
          return 0;
      }
    });
    
    setFilteredDoctors(filtered);
  }, [hospitalId, searchQuery, selectedSpecialization, selectedHospital, priceRange, minRating, showAvailableOnly, selectedConsultationType, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-12 px-4">
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
                  {hospital ? `Doctors at ${hospital.name}` : 'All Doctors'}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {filteredDoctors.length} doctors available
                  {hospital && ` at ${hospital.name}`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search doctors by name, specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Specialization Filter */}
                <div className="w-full sm:w-48">
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Specialization" />
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
                
                {/* Hospital Filter - Only show when not viewing specific hospital */}
                {!hospitalId && (
                  <div className="w-full sm:w-48">
                    <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Hospitals" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Hospitals</SelectItem>
                        {hospitals.map((hosp) => (
                          <SelectItem key={hosp.id} value={hosp.id.toString()}>
                            {hosp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Sort By */}
                <div className="w-full sm:w-40">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <Card className="mb-6 border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Advanced Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Consultation Type Selection */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Consultation Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {consultationTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={selectedConsultationType === type.id ? "default" : "outline"}
                          onClick={() => setSelectedConsultationType(type.id)}
                          className="flex flex-col items-center gap-2 h-auto p-3"
                        >
                          <span className="text-lg">{type.icon}</span>
                          <div className="text-center">
                            <div className="text-xs font-medium">{type.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {type.priceMultiplier === 1.0 ? "Base Price" : 
                               type.priceMultiplier < 1.0 ? `${Math.round((1 - type.priceMultiplier) * 100)}% Off` :
                               `${Math.round((type.priceMultiplier - 1) * 100)}% Extra`}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Price Range Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        Consultation Fee Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={3000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        Minimum Rating: {minRating}⭐
                      </label>
                      <Slider
                        value={[minRating]}
                        onValueChange={(value) => setMinRating(value[0])}
                        max={5}
                        min={0}
                        step={0.5}
                        className="w-full"
                      />
                    </div>

                    {/* Availability Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        Availability
                      </label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="available-only"
                          checked={showAvailableOnly}
                          onCheckedChange={(checked) => setShowAvailableOnly(checked as boolean)}
                        />
                        <label
                          htmlFor="available-only"
                          className="text-sm text-muted-foreground"
                        >
                          Show only available doctors
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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
                      {/* Hospital Information */}
                      {!hospital && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{hospitals.find(h => h.id === doctor.hospitalId)?.name}</span>
                        </div>
                      )}
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

                  {/* Consultation Type Pricing */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Consultation Fees:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {consultationTypes.slice(0, 4).map((type) => {
                        const price = Math.round(doctor.consultationFee * type.priceMultiplier);
                        return (
                          <div key={type.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-1">
                              <span>{type.icon}</span>
                              <span className="font-medium">{type.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-foreground font-semibold">
                              <IndianRupee className="w-3 h-3" />
                              <span>{price}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1 text-foreground font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{Math.round(doctor.consultationFee * (consultationTypes.find(ct => ct.id === selectedConsultationType)?.priceMultiplier || 1.0))}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({consultationTypes.find(ct => ct.id === selectedConsultationType)?.name})
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge 
                        variant={doctor.availability === "Available" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {doctor.availability}
                      </Badge>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/doctor/${doctor.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
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

export default Doctors;
