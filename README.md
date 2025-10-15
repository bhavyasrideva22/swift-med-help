# Swift Med Help

A comprehensive healthcare platform for finding and booking appointments with expert doctors and hospitals.

## Features

- **Doctor Search**: Find doctors by specialization, location, and ratings
- **Hospital Directory**: Browse hospitals with detailed information
- **Department Overview**: Explore medical departments and their services
- **Appointment Booking**: Book appointments instantly with digital OP cards
- **Smart Filtering**: Advanced search and filter options
- **Verified Reviews**: Read patient reviews and ratings
- **Digital OP Cards**: Get instant digital outpatient cards

## Technology Stack

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd swift-med-help
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Hospitals.tsx   # Hospitals listing
│   ├── Doctors.tsx     # Doctors listing
│   ├── Departments.tsx # Medical departments
│   ├── DoctorProfile.tsx # Individual doctor profile
│   ├── Appointment.tsx # Appointment booking
│   └── OPCard.tsx      # Digital OP card
├── data/               # Mock data and constants
│   └── mockData.ts     # Sample data
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities
└── assets/             # Static assets
    └── hero-medical.jpg # Hero image
```

## Features Overview

### Home Page
- Hero section with call-to-action
- Feature highlights
- Hospital showcase
- Statistics display

### Doctor Search
- Advanced filtering by specialization, hospital, rating
- Search by name, qualification, or specialization
- Sort by rating, price, or experience
- Detailed doctor profiles

### Hospital Directory
- Hospital listings with ratings and reviews
- Filter by city, services, and facilities
- Detailed hospital information
- Department listings

### Appointment Booking
- Easy appointment booking process
- Patient information collection
- Date and time selection
- Digital OP card generation

### Medical Departments
- Comprehensive department information
- Available treatments and procedures
- Doctor listings by department
- Equipment and facilities information

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@swiftmedhelp.com or create an issue in the repository.

---

**Swift Med Help** - Making healthcare accessible and convenient for everyone.