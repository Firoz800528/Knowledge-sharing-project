import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserProfile() {
  const [user] = useAuthState(auth);

  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhoto, setUpdatedPhoto] = useState('');

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const resArticles = await api.get(`/users/${user.email}/articles`);
        setArticles(resArticles.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    fetchData();
  }, [user]);

  const handleUpdate = async () => {
    try {
      await api.patch(`/users/${user.email}`, {
        name: updatedName,
        photoURL: updatedPhoto,
      });
      alert('Profile updated!');
      setEditMode(false);
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center text-gray-600">
          <p>Please log in to view your profile.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <motion.div
        className="max-w-5xl mx-auto px-4 py-10 space-y-10 text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <motion.div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={updatedPhoto || user?.photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div className="flex-1 w-full max-w-lg">
            <AnimatePresence mode="wait">
              {editMode ? (
                <motion.div
                  key="edit"
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Photo URL"
                    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    value={updatedPhoto}
                    onChange={(e) => setUpdatedPhoto(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                  <button
                    onClick={() => {
                      setUpdatedName(user?.displayName || '');
                      setUpdatedPhoto(user?.photoURL || '');
                      setEditMode(true);
                    }}
                    className="mt-3 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                  >
                    Edit Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">My Articles</h3>
          {articles.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No articles posted yet.</p>
          ) : (
            <motion.ul
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {articles.map((a) => (
                <motion.li
                  key={a._id}
                  className="border border-gray-300 dark:border-gray-700 p-4 rounded hover:shadow-md transition"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <h4 className="font-medium text-lg">{a.title}</h4>
                  <small className="text-gray-500 dark:text-gray-400">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </small>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.section>
      </motion.div>
    </>
  );
}
