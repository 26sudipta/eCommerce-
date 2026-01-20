import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);
  const [user] = useState(null); // Will integrate with Firebase Auth later

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        {/* Mobile menu button */}
        <div className="flex-none lg:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">Smart</span>Ecom
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-none">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'active' : ''
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Cart & User */}
        <div className="flex-none gap-2">
          {/* Cart */}
          <Link to="/cart" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="badge badge-sm badge-primary indicator-item">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/orders">My Orders</Link>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              <FiUser size={16} />
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <ul className="menu menu-vertical px-4 py-2 bg-base-100">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'active' : ''
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
