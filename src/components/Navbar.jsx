import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import DarkLightToggle from './DarkLightToggle';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      alert('Logout failed');
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">

      <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap"
        >
          Know<span className="text-[#2957FA]">Share</span>
        </Link>

        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-articles" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>All Articles</NavLink>
          </li>
          {currentUser && (
            <>
              <li>
                <NavLink to="/my-articles" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>My Articles</NavLink>
              </li>
              <li>
                <NavLink to="/post-article" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Post Article</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>Profile</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>About Us</NavLink>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          
          <DarkLightToggle />

          {!currentUser ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm hidden md:inline-block"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={currentUser.photo || '/default-profile.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-blue-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50 text-sm origin-top-right"
                  >
                    <Link
                      to="/my-articles"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Articles
                    </Link>
                    <Link
                      to="/post-article"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Post Article
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <ul className="flex flex-col space-y-1 px-4 py-4 text-gray-700 text-sm font-medium">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => isActive ? 'text-blue-600 block px-2 py-1 rounded' : 'block px-2 py-1 rounded hover:bg-gray-100'}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-articles"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => isActive ? 'text-blue-600 block px-2 py-1 rounded' : 'block px-2 py-1 rounded hover:bg-gray-100'}
                >
                  All Articles
                </NavLink>
              </li>
              {currentUser && (
                <>
                  <li>
                    <NavLink
                      to="/my-articles"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => isActive ? 'text-blue-600 block px-2 py-1 rounded' : 'block px-2 py-1 rounded hover:bg-gray-100'}
                    >
                      My Articles
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/post-article"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => isActive ? 'text-blue-600 block px-2 py-1 rounded' : 'block px-2 py-1 rounded hover:bg-gray-100'}
                    >
                      Post Article
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => isActive ? 'text-blue-600 block px-2 py-1 rounded' : 'block px-2 py-1 rounded hover:bg-gray-100'}
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => isActive ? 'text-blue-600 block px-2 py-1 rounded' : 'block px-2 py-1 rounded hover:bg-gray-100'}
                >
                  About Us
                </NavLink>
              </li>

              {!currentUser ? (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block bg-blue-600 text-white text-center rounded px-3 py-2 hover:bg-blue-700"
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
