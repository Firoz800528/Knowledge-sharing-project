import { useEffect, useState } from 'react';
import axios from 'axios';

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://knowshare-lime.vercel.app/contributors/top')
      .then(res => {
        setContributors(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load top contributors:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading top contributors...</p>;
  }

  return (
    <div className="mt-12 px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">🌟 Top Contributors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contributors.map((user, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 text-center">
            <img
              src={user.latestUserPhoto || '/default-avatar.png'} 
              alt={user.latestUserName}
              className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="text-lg font-semibold">{user.latestUserName || 'Unknown User'}</h3>
            <p className="text-gray-600 dark:text-gray-400 truncate">{user._id}</p>
            <p className="text-sm mt-2 text-blue-600 font-medium">{user.totalComments} comments</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
