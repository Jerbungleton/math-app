import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-background"> {/* */}
      <Navbar />
      <main className="flex-grow w-full max-w-[1920px] mx-auto px-8 py-8">
        <Outlet />
      </main>
      {/* Optional: Add a Footer component here, styled with new brand colors */}
    </div>
  );
}