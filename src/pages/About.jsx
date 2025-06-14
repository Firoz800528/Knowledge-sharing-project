import React from 'react';
import { LightbulbIcon, UsersIcon, BookOpenIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
          About <span className="text-blue-600">KnowShare</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          KnowShare is a platform to explore, express, and elevate knowledge together.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 text-center">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <LightbulbIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Inspire Ideas</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Share your thoughts, expertise, and insights through articles that spark curiosity and growth.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <UsersIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Connect Community</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Engage with a vibrant community by reading, commenting, and learning from each other.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <BookOpenIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Grow Knowledge</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Discover new ideas and deepen your understanding across diverse topics.
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mt-14 text-center">
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
          Our mission is to empower everyone to learn, teach, and grow through meaningful content and authentic conversations.
        </p>
      </div>
    </motion.div>
  );
}
