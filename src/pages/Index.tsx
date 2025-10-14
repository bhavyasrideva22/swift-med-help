import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Search, Calendar, Star, MapPin, Stethoscope } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/data/mockData";
import heroImage from "@/assets/hero-medical.jpg";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const navigate = useNavigate();

  const handleFindDoctors = () => {
    if (selectedCity) {
      navigate(`/hospitals?city=${selectedCity}`);
    }
  };

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Filtering",
      description: "Find the right doctor with advanced AI-powered filters"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Booking",
      description: "Book appointments instantly and get your OP card"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Verified Reviews",
      description: "Real patient reviews and ratings to help you decide"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Expert Doctors",
      description: "Connect with qualified specialists across all departments"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                Trusted Healthcare Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Find the Right Doctor,
                <span className="block text-primary mt-2">Care You Can Trust</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with expert doctors and hospitals near you. Smart filtering, 
                instant booking, and verified reviews - all in one place.
              </p>

              {/* City Selector */}
              <Card className="p-6 shadow-lg border-0 bg-card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Select Your City
                    </label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="w-full h-12">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <SelectValue placeholder="Choose your city" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:self-end">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full sm:w-auto h-12"
                      onClick={handleFindDoctors}
                      disabled={!selectedCity}
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Find Doctors
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Professional healthcare team" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose MediLink+
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your health deserves the best care. We make finding it simple.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-shadow border-border bg-card"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Find Your Doctor?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of patients who trust MediLink+ for their healthcare needs
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white hover:bg-white/90 text-primary border-0 font-semibold"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
