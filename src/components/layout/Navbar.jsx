import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const activeClassName = "text-brand-primary font-semibold border-b-2 border-brand-primary"; // Use new colors
  const inactiveClassName = "text-brand-dark hover:text-brand-primary"; // Use new colors

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50"> {/* Adjusted background */}
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-brand-dark hover:text-brand-primary">
          Math Helper {/* New Site Name */}
        </NavLink>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Home
          </NavLink>
          <NavLink
            to="/pre-algebra"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Pre-Algebra
          </NavLink>
          <NavLink
            to="/algebra"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Algebra
          </NavLink>
          <NavLink
            to="/pre-calculus"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Pre-Calculus
          </NavLink>
          <NavLink
            to="/calculus"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Calculus
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            About
          </NavLink>
          {/* Contact link can be added if needed */}
        </div>
      </div>
    </nav>
  );
}