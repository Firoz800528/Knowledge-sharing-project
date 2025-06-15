import { useEffect, useState } from 'react';
import axios from 'axios';

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
  axios.get('/api/top-contributors')
    .then(res => {
      if (Array.isArray(res.data)) {
        setContributors(res.data);
      } else {
        console.error('Unexpected response:', res.data);
        setContributors([]); // fallback
      }
    })
    .catch(err => {
      console.error('Error fetching top contributors', err);
      setContributors([]); // fallback
    });
}, []);


  return (
    <div className="my-8 p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">🎯 Top Contributors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contributors.map((user, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg flex flex-col items-center bg-gray-50 dark:bg-gray-800"
          >
            <img
              src={user._id.user_photo}
              alt={user._id.user_name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{user._id.user_name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Comments: {user.commentCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
