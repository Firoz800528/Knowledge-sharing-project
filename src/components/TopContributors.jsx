// components/TopContributors.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function TopContributors() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        const res = await api.get('/users/top-contributors');
        setContributors(res.data);
      } catch (err) {
        console.error('Error fetching top contributors:', err);
      }
    };

    fetchTopContributors();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        🏆 Top Contributors
      </h2>
      {contributors.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No contributors yet.</p>
      ) : (
        <ul className="space-y-4">
          {contributors.slice(0, 6).map((user, index) => (
            <li key={user._id} className="flex items-center gap-4">
              <span className="text-lg font-bold text-gray-600 dark:text-gray-300">{index + 1}.</span>
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.commentCount} comment{user.commentCount !== 1 && 's'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
