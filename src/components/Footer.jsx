import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        <div className="text-2xl font-bold">
          Know<span className="text-[#2957FA]">Share</span>
        </div>
        
        <nav className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 text-sm">
          <Link to="/about" className="hover:text-gray-300 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-300 transition">
            Contact Us
          </Link>
          <Link to="/terms" className="hover:text-gray-300 transition">
            Terms & Conditions
          </Link>
        </nav>

        <div className="flex space-x-6 text-lg">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © 2025 KnowShare. All rights reserved.
      </div>
    </footer>
  );
}
