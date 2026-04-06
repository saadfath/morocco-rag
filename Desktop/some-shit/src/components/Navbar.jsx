import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation bar component
 * Displays brand name and navigation links
 */
export default function Navbar() {
  const location = useLocation();

  /**
   * Checks if route is active
   * @param {string} path - Route path to check
   * @returns {boolean} True if current route matches path
   */
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-zinc-900 border-b-2 border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Name */}
          <Link
            to="/"
            className="text-3xl font-serif font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            SACIMAK
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/')
                  ? 'bg-amber-500 text-black'
                  : 'text-zinc-300 hover:text-amber-400'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/dashboard')
                  ? 'bg-amber-500 text-black'
                  : 'text-zinc-300 hover:text-amber-400'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
