import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const activeClassName = "text-brand-primary-dark font-semibold border-b-2 border-brand-primary-dark"; //
  const inactiveClassName = "text-brand-text-dark hover:text-brand-primary-dark"; //

  return (
    <nav className="bg-brand-surface shadow-md sticky top-0 z-50"> {/* */}
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-brand-primary-dark hover:text-opacity-80"> {/* */}
          Math Helper
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