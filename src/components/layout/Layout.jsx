import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// Remove Player import

export default function Layout() { // Removed props related to music player
  return (
    <div className="flex flex-col min-h-screen bg-brand-light"> {/* Use new Tailwind colors */}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8"> {/* Adjusted padding */}
        <Outlet />
      </main>
      {/* Optional: Add a Footer component here */}
    </div>
  );
}