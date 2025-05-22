import { NavLink } from 'react-router-dom'; // Import NavLink

export default function Navbar() {
  const activeClassName = "text-music-primary font-semibold border-b-2 border-music-primary";
  const inactiveClassName = "text-gray-300 hover:text-music-primary";

  return (
    <nav className="bg-music-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-white hover:text-music-primary">
          RSPM
        </NavLink>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Home
          </NavLink>
          <NavLink
            to="/music"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Music
          </NavLink>
          <NavLink
            to="/store"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Store
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}