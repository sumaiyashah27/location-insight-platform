import React from 'react';

// --- Icon Imports ---
// Using lucide-react icons for a professional look.
// In a real app, you'd install `lucide-react`. Here we use inline SVGs
// as placeholders or simple representations since we can't install packages.
// For the preview, I'll use inline SVGs that look like lucide icons.

const Lock = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const LayoutDashboard = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const LineChart = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18"></path>
    <path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
);

const Zap = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const Blocks = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="16" y="16" width="6" height="6"></rect>
    <rect x="2" y="16" width="6" height="6"></rect>
    <rect x="9" y="2" width="6" height="6"></rect>
    <path d="M12 8v8"></path>
    <path d="M5 16v-4h14v4"></path>
  </svg>
);

const Container = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const Cloud = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);

const Github = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1 0-1.3-.5-2.4-1.3-3.2.1-.3.5-1.5-.1-3.2 0 0-1-.3-3.3 1.3a11.3 11.3 0 0 0-6 0C6.3 5.4 5.3 5.7 5.3 5.7c-.6 1.7-.2 2.9-.1 3.2-.8.8-1.3 1.9-1.3 3.2 0 4.7 2.7 5.8 5.5 6.1-.6.5-.9 1.4-.9 2.8v3.5"></path>
  </svg>
);

const MoveRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// --- Feature Data ---
const features = [
  {
    icon: Lock,
    title: "JWT Auth + RBAC",
    description: "Secure, role-based access for Admin, Analyst, and Viewer roles.",
  },
  {
    icon: LayoutDashboard,
    title: "Interactive Dashboards",
    description: "KPIs for Performance, Accessibility, and Reliability with quick deltas.",
  },
  {
    icon: LineChart,
    title: "Trend Analytics",
    description: "Visualize 30-day trends with dynamic region filtering (North/South).",
  },
  {
    icon: Zap,
    title: "Efficient GraphQL API",
    description: "One request for all dashboard data, with Apollo Client caching.",
  },
  {
    icon: Blocks,
    title: "Redux Toolkit State",
    description: "Global auth state management and robust protected routes.",
  },
  {
    icon: Container,
    title: "Dockerized",
    description: "A single container serves both the React frontend and GraphQL backend.",
  },
  {
    icon: Cloud,
    title: "AWS-Ready",
    description: "Deploy instantly to Elastic Beanstalk via `Dockerrun.aws.json`.",
  },
];

// --- Tech Stack Data ---
const techStacks = [
  {
    name: "Frontend",
    stack: "React, TypeScript, Vite, Redux Toolkit, Recharts, Apollo Client",
  },
  {
    name: "Backend",
    stack: "Node.js, Express, Apollo Server (GraphQL), JWT, bcrypt",
  },
  {
    name: "Infrastructure",
    stack: "Docker, AWS Elastic Beanstalk (ready)",
  },
];

// --- Main App Component ---
export default function App() {
  const githubUrl = "https://github.com/sumaiyashah27/location-insight-platform";

  return (
    <div className="min-h-screen flex flex-col font-inter bg-gray-50 text-gray-800">
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-700">
                Location Insight Platform
              </span>
            </div>
            <nav className="hidden md:flex md:items-center md:space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-700 font-medium">Features</a>
              <a href="#tech-stack" className="text-gray-600 hover:text-blue-700 font-medium">Tech Stack</a>
              <a href="#architecture" className="text-gray-600 hover:text-blue-700 font-medium">Architecture</a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
              >
                Sign In
              </a>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button could be added here */}
              <a
                href="/login"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight">
              Location Insight Platform
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
              Empowering data-driven location strategy through secure analytics,
              real-time performance insights, and smart visualizations.
            </p>
            <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto">
              A secure, role-based analytics dashboard with interactive KPIs, 30-day trends, and efficient data-fetching via GraphQL.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Get Started
                <MoveRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-blue-700 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <Github className="mr-2 w-5 h-5" />
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-12 bg-white shadow-inner">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-4">
                <div className="text-5xl font-extrabold text-blue-600">~90%</div>
                <div className="mt-1 text-lg font-medium text-gray-500">Performance</div>
              </div>
              <div className="p-4">
                <div className="text-5xl font-extrabold text-blue-600">~85%</div>
                <div className="mt-1 text-lg font-medium text-gray-500">Accessibility</div>
              </div>
              <div className="p-4">
                <div className="text-5xl font-extrabold text-blue-600">~92%</div>
                <div className="mt-1 text-lg font-medium text-gray-500">Reliability</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
                A Feature-Rich Platform
              </h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need for enterprise-grade location analytics,
                containerized and ready for the cloud.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* --- Tech Stack Section --- */}
        <section id="tech-stack" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
                Modern & Robust Tech Stack
              </h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Built with industry-standard technologies for performance,
                scalability, and maintainability.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {techStacks.map((tech) => (
                <div key={tech.name} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                    {tech.name}
                  </h3>
                  <p className="text-gray-700">
                    {tech.stack}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Architecture Section --- */}
        <section id="architecture" className="py-16 md:py-24 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Simplified Architecture
              </h2>
              <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">
                A clean, decoupled architecture that's easy to understand and extend.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 bg-gray-800 p-8 rounded-lg shadow-xl">
              <span className="font-mono text-lg text-green-300">React (Vite)</span>
              <span className="text-blue-400">&rarr;</span>
              <span className="font-mono text-lg text-purple-300">Redux</span>
              <span className="text-blue-400">&rarr;</span>
              <span className="font-mono text-lg text-pink-300">Apollo Client</span>
              <span className="text-blue-400">&rarr;</span>
              <span className="font-mono text-lg text-pink-300">GraphQL Server</span>
              <span className="text-blue-400">&rarr;</span>
              <span className="font-mono text-lg text-yellow-300">JWT/RBAC</span>
              <span className="text-blue-400">&rarr;</span>
              <span className="font-mono text-lg text-gray-300">Data Layer</span>
            </div>
            <p className="text-center mt-6 text-blue-200">
              The data layer is pluggable, ready to be swapped with Prisma + Postgres/DynamoDB.
            </p>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm">
              © {new Date().getFullYear()} Location Insight Platform.
              <br />
              Built with ❤️ using React, GraphQL, and AWS.
            </div>
            <div className="mt-4 md:mt-0 text-sm">
              MIT ©{" "}
              <a
                href="https://github.com/sumaiyashah27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                sumaiyashah27
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
