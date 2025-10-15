import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Menu, 
  X, 
  Heart, 
  Search, 
  MapPin, 
  Stethoscope,
  Building2,
  Users,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "Hospitals", href: "/hospitals", icon: Building2 },
    { name: "Departments", href: "/departments", icon: Stethoscope },
    { name: "Doctors", href: "/doctors", icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
              <Heart className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Swift Med Help</h1>
              <p className="text-xs text-muted-foreground">Smart Healthcare</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  asChild
                  className={cn(
                    "flex items-center gap-2",
                    isActive(item.href) && "bg-primary text-primary-foreground"
                  )}
                >
                  <Link to={item.href}>
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <Card className="mt-2 p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    asChild
                    className={cn(
                      "w-full justify-start gap-2",
                      isActive(item.href) && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.href}>
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </Card>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
