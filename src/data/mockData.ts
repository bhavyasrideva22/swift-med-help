export const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
];

export const specializations = [
  "Cardiology", "Neurology", "Orthopedics", "Pediatrics",
  "Dermatology", "Ophthalmology", "ENT", "General Medicine",
  "Gastroenterology", "Nephrology", "Oncology", "Psychiatry"
];

export const hospitals = [
  {
    id: 1,
    name: "Apollo Hospital",
    city: "Mumbai",
    address: "Parsn Complex, Sahar Road, Andheri East",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
  },
  {
    id: 2,
    name: "Fortis Healthcare",
    city: "Mumbai",
    address: "Mulund Goregaon Link Road",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
  },
  {
    id: 3,
    name: "Lilavati Hospital",
    city: "Mumbai",
    address: "A-791, Bandra Reclamation",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&q=80"
  },
  {
    id: 4,
    name: "AIIMS",
    city: "Delhi",
    address: "Ansari Nagar, New Delhi",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
  },
  {
    id: 5,
    name: "Max Hospital",
    city: "Delhi",
    address: "Saket, New Delhi",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
  }
];

export const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "Cardiology",
    hospitalId: 1,
    qualification: "MBBS, MD (Cardiology), FACC",
    experience: 15,
    consultationFee: 1500,
    rating: 4.8,
    reviews: 234,
    timing: "Mon-Fri: 10 AM - 2 PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    about: "Specialized in interventional cardiology with expertise in angioplasty and cardiac catheterization."
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Pediatrics",
    hospitalId: 1,
    qualification: "MBBS, MD (Pediatrics)",
    experience: 12,
    consultationFee: 1000,
    rating: 4.9,
    reviews: 456,
    timing: "Mon-Sat: 9 AM - 1 PM",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    about: "Expert in newborn care, child development, and pediatric emergencies."
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    specialization: "Orthopedics",
    hospitalId: 2,
    qualification: "MBBS, MS (Orthopedics)",
    experience: 18,
    consultationFee: 1200,
    rating: 4.7,
    reviews: 312,
    timing: "Mon-Fri: 3 PM - 6 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    about: "Specialist in joint replacement surgery and sports medicine."
  },
  {
    id: 4,
    name: "Dr. Sneha Reddy",
    specialization: "Neurology",
    hospitalId: 3,
    qualification: "MBBS, DM (Neurology)",
    experience: 10,
    consultationFee: 1800,
    rating: 4.8,
    reviews: 198,
    timing: "Tue-Sat: 11 AM - 3 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    about: "Focused on stroke management, epilepsy, and neurodegenerative disorders."
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    specialization: "General Medicine",
    hospitalId: 2,
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 20,
    consultationFee: 800,
    rating: 4.6,
    reviews: 523,
    timing: "Mon-Sat: 8 AM - 12 PM",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
    about: "General physician with expertise in diabetes, hypertension, and preventive care."
  }
];

export const treatments = [
  { id: 1, name: "Angioplasty", department: "Cardiology", hospitalId: 1 },
  { id: 2, name: "Bypass Surgery", department: "Cardiology", hospitalId: 1 },
  { id: 3, name: "Joint Replacement", department: "Orthopedics", hospitalId: 2 },
  { id: 4, name: "Arthroscopy", department: "Orthopedics", hospitalId: 2 },
  { id: 5, name: "Neonatal Care", department: "Pediatrics", hospitalId: 1 },
];
