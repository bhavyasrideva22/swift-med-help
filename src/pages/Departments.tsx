import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  Stethoscope, 
  Users, 
  ChevronRight,
  Star,
  IndianRupee,
  MapPin,
  Shield,
  Award,
  Activity,
  Phone,
  Calendar,
  Bed,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { departments, doctors, hospitals } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const Departments = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hospitalId = parseInt(searchParams.get("hospitalId") || "0");
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<number | null>(hospitalId || null);
  
  const hospital = (selectedHospital || hospitalId) ? hospitals.find(h => h.id === (selectedHospital || hospitalId)) : null;

  const getDepartmentDoctors = (departmentId: number) => {
    const deptName = departments.find(dept => dept.id === departmentId)?.name;
    if (selectedHospital || hospitalId) {
      return doctors.filter(d => 
        d.hospitalId === (selectedHospital || hospitalId) && 
        d.specialization === deptName
      );
    }
    return doctors.filter(d => d.specialization === deptName);
  };

  const getDepartmentTreatments = (departmentId: number) => {
    return departments.find(dept => dept.id === departmentId)?.treatments || [];
  };

  const displayDepartments = selectedHospital || hospitalId ? 
    departments.filter(dept => hospital?.departments.includes(dept.id)) : 
    departments;

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
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Medical Departments
                </h1>
                <p className="text-muted-foreground">
                  Explore our comprehensive medical departments and find the right specialists for your healthcare needs
                </p>
              </div>
            </div>

            {/* Hospital Selection */}
            {!hospitalId && !selectedHospital && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Select Hospital (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hospitals.map((h) => (
                    <Card 
                      key={h.id}
                      className={`cursor-pointer transition-all hover:shadow-lg border-border bg-card ${
                        selectedHospital === h.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedHospital(selectedHospital === h.id ? null : h.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                            <img 
                              src={h.image || '/placeholder.svg'} 
                              alt={h.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{h.name}</h4>
                            <p className="text-sm text-muted-foreground">{h.city}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              <span className="text-sm font-medium">{h.rating}</span>
                              <span className="text-sm text-muted-foreground">({h.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Hospital Info */}
            {hospital && (
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-background">
                    <img 
                      src={hospital.image || '/placeholder.svg'} 
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground">{hospital.address}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                      <span className="text-sm text-muted-foreground">({hospital.reviews} reviews)</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedHospital(null)}
                    className="ml-auto"
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Departments List */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">Available Departments</h2>
              <div className="space-y-4">
                {displayDepartments.map((department) => {
                  const departmentDoctors = getDepartmentDoctors(department.id);
                  const isSelected = selectedDepartment === department.id;
                  
                  return (
                    <Card 
                      key={department.id}
                      className={`cursor-pointer transition-all hover:shadow-lg border-border bg-card ${
                        isSelected ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedDepartment(
                        selectedDepartment === department.id ? null : department.id
                      )}
                    >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{department.icon}</span>
                          <div className="flex-1">
                            <CardTitle className="text-lg text-card-foreground">
                              {department.name}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                              {departmentDoctors.length} doctors available
                            </CardDescription>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Bed className="w-3 h-3" />
                                <span>{department.totalBeds} beds</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="w-3 h-3" />
                                <span>{department.successRate} success rate</span>
                              </div>
                              {department.emergencyAvailable && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Emergency
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                          isSelected ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </CardHeader>
                    
                    {isSelected && (
                      <CardContent className="pt-0">
                        <div className="space-y-6">
                          {/* Department Overview */}
                          <div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {department.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{department.consultingHours}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <IndianRupee className="w-4 h-4" />
                                <span>{department.consultationFee}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Activity className="w-4 h-4" />
                                <span>Wait: {department.averageWaitTime}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="w-4 h-4" />
                                <span>Head: {department.departmentHead}</span>
                              </div>
                            </div>
                          </div>

                          {/* Key Features */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              Key Features
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {department.keyFeatures.map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Specializations */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Stethoscope className="w-4 h-4" />
                              Specializations
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {department.specializations.map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Equipment */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Advanced Equipment
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {department.equipment.map((equipment, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                  <span>{equipment}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="font-semibold text-sm text-foreground mb-2">
                              Available Treatments
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {getDepartmentTreatments(department.id).slice(0, 3).map((treatment, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {treatment}
                                </Badge>
                              ))}
                              {getDepartmentTreatments(department.id).length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{getDepartmentTreatments(department.id).length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={() => navigate(`/doctors?department=${department.name}${(selectedHospital || hospitalId) ? `&hospitalId=${selectedHospital || hospitalId}` : ''}`)}
                            >
                              <Users className="w-4 h-4 mr-2" />
                              View Doctors
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/appointment?department=${department.name}${(selectedHospital || hospitalId) ? `&hospitalId=${selectedHospital || hospitalId}` : ''}`)}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Department Details */}
          <div className="lg:col-span-2">
            {selectedDepartment ? (
              <div className="space-y-6">
                {(() => {
                  const department = departments.find(d => d.id === selectedDepartment);
                  const departmentDoctors = getDepartmentDoctors(selectedDepartment);
                  const treatments = getDepartmentTreatments(selectedDepartment);
                  
                  return (
                    <>
                      {/* Department Header */}
                      <Card className="border-border bg-card">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{department?.icon}</span>
                            <div>
                              <CardTitle className="text-3xl text-card-foreground">
                                {department?.name}
                              </CardTitle>
                              <CardDescription className="text-lg text-muted-foreground">
                                {department?.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-5 h-5" />
                              <span>{department?.consultingHours}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="w-5 h-5" />
                              <span>{departmentDoctors.length} doctors</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <IndianRupee className="w-5 h-5" />
                              <span>{department?.consultationFee}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Activity className="w-5 h-5" />
                              <span>Wait: {department?.averageWaitTime}</span>
                            </div>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Bed className="w-5 h-5" />
                              <span>{department?.totalBeds} beds</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <TrendingUp className="w-5 h-5" />
                              <span>{department?.successRate} success rate</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Award className="w-5 h-5" />
                              <span>Est. {department?.establishedYear}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="w-5 h-5" />
                              <span>Head: {department?.departmentHead}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Treatments Offered */}
                      <Card className="border-border bg-card">
                        <CardHeader>
                          <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                            <Stethoscope className="w-5 h-5 text-primary" />
                            Treatments & Procedures
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {treatments.map((treatment, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">{treatment}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Consulting Doctors */}
                      <Card className="border-border bg-card">
                        <CardHeader>
                          <CardTitle className="text-xl text-card-foreground">
                            Consulting Doctors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {departmentDoctors.length > 0 ? (
                            <div className="space-y-4">
                              {departmentDoctors.map((doctor) => (
                                <div key={doctor.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                                      <img 
                                        src={doctor.image} 
                                        alt={doctor.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                                      <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1">
                                          <Star className="w-4 h-4 fill-accent text-accent" />
                                          <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center gap-1 text-foreground font-semibold mb-1">
                                      <IndianRupee className="w-4 h-4" />
                                      <span>{doctor.consultationFee}</span>
                                    </div>
                                    <Button 
                                      size="sm"
                                      onClick={() => navigate(`/doctor/${doctor.id}`)}
                                    >
                                      View Profile
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-center py-8">
                              No doctors available in this department at the moment.
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Specializations */}
                      <Card className="border-border bg-card">
                        <CardHeader>
                          <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            Specializations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {department?.specializations.map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-sm">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Key Features */}
                      <Card className="border-border bg-card">
                        <CardHeader>
                          <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Key Features & Facilities
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {department?.keyFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Advanced Equipment */}
                      <Card className="border-border bg-card">
                        <CardHeader>
                          <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Advanced Equipment & Technology
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {department?.equipment.map((equipment, index) => (
                              <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-foreground">{equipment}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Department Statistics */}
                      <Card className="border-border bg-card">
                        <CardHeader>
                          <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Department Statistics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary mb-1">{department?.successRate}</div>
                              <div className="text-sm text-muted-foreground">Success Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary mb-1">{department?.totalBeds}</div>
                              <div className="text-sm text-muted-foreground">Total Beds</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary mb-1">{department?.establishedYear}</div>
                              <div className="text-sm text-muted-foreground">Established</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary mb-1">{departmentDoctors.length}</div>
                              <div className="text-sm text-muted-foreground">Doctors</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  );
                })()}
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Stethoscope className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Select a Department
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Choose a department from the list to view available treatments, 
                    consulting doctors, and detailed information.
                  </p>
                </CardContent>
              </Card>
            )}
            </div>
          </div>

          {/* Doctors Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Medical Specialists</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet our experienced doctors and specialists who are dedicated to providing the best healthcare services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mx-auto mb-4">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{doctor.specialization}</p>
                      <p className="text-xs text-muted-foreground mb-3">{doctor.qualification}</p>
                      
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                        <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="font-medium">{doctor.experience} years</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Fee:</span>
                          <span className="font-medium flex items-center">
                            <IndianRupee className="w-3 h-3 mr-1" />
                            {doctor.consultationFee}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timing:</span>
                          <span className="font-medium text-xs">{doctor.timing}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate(`/doctor/${doctor.id}`)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/appointment/${doctor.id}`)}
                        >
                          Book
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
    </div>
  );
};

export default Departments;
