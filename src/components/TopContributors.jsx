import { useEffect, useState } from 'react';
import axios from 'axios';

const TopContributors = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://knowshare-lime.vercel.app/articles')
      .then(res => {
        const allComments = res.data.flatMap(article => article.comments || []);

        const uniqueUsersMap = new Map();

        allComments.forEach(comment => {
          if (!uniqueUsersMap.has(comment.user_email)) {
            uniqueUsersMap.set(comment.user_email, {
              user_email: comment.user_email,
              user_name: comment.user_name,
              user_photo: comment.user_photo,
            });
          }
        });

        const uniqueUsers = Array.from(uniqueUsersMap.values()).slice(0, 3);

        setUsers(uniqueUsers);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading users...</p>;
  }

  return (
    <div className="mt-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">🌟 Top Contributors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 text-center">
            <img
              src={user.user_photo || '/default-avatar.png'}
              alt={user.user_name}
              className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="text-lg font-semibold">{user.user_name || 'Unknown User'}</h3>
            <p className="text-gray-600 dark:text-gray-400 truncate">{user.user_email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
