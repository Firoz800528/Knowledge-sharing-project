import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <Link to="/" className="text-3xl font-bold text-gray-800">
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

        <div className="relative" ref={dropdownRef}>
          {!currentUser ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
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
                    className="absolute right-0 mt-50 w-40 bg-white border rounded shadow-md z-50 text-sm origin-top-right"
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
        </div>
      </div>
    </nav>
  );
}
