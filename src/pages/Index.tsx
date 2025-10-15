import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, Calendar, Star, MapPin, Stethoscope, Clock, Users, Shield } from "lucide-react";
import { hospitals } from "@/data/mockData";
import heroImage from "@/assets/hero-medical.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

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
      <Navbar />
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
              Why Choose Swift Med Help
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
            Join thousands of patients who trust Swift Med Help for their healthcare needs
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white hover:bg-white/90 text-primary border-0 font-semibold"
            onClick={() => navigate('/hospitals')}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
