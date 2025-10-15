import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Heart, Stethoscope, Users, Building2 } from "lucide-react";
import { departments } from "@/data/mockData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hospital Departments */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-400" />
              Departments
            </h3>
            <ul className="space-y-2">
              {departments.map((dept) => (
                <li key={dept.id}>
                  <Link 
                    to={`/departments?department=${dept.name}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Doctors */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Our Doctors
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/doctors" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialization=Cardiology" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Cardiologists
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialization=Pediatrics" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Pediatricians
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialization=Orthopedics" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Orthopedists
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialization=Neurology" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Neurologists
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialization=General Medicine" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  General Physicians
                </Link>
              </li>
            </ul>
          </div>

          {/* Hospital Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Hospitals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hospitals" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  All Hospitals
                </Link>
              </li>
              <li>
                <Link to="/hospitals?city=Mumbai" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Mumbai Hospitals
                </Link>
              </li>
              <li>
                <Link to="/hospitals?city=Delhi" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Delhi Hospitals
                </Link>
              </li>
              <li>
                <Link to="/hospitals?city=Bangalore" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Bangalore Hospitals
                </Link>
              </li>
              <li>
                <Link to="/hospitals?city=Chennai" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Chennai Hospitals
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Medical Plaza,<br />
                    Healthcare District,<br />
                    Mumbai - 400001, Maharashtra
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 22 1234 5678</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@swiftmedhelp.com</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">24/7 Emergency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-lg font-semibold">Swift Med Help</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} Swift Med Help. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
