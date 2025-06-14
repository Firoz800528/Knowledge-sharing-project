import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';

export default function UserProfile() {
  const [user] = useAuthState(auth);

  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhoto, setUpdatedPhoto] = useState('');

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

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 text-gray-800 dark:text-gray-100">
        <div className="flex items-center gap-6">
          <img
            src={updatedPhoto || user?.photoURL}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            {editMode ? (
              <>
                <input
                  type="text"
                  className="block mb-2 p-2 border rounded"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <input
                  type="text"
                  className="block mb-2 p-2 border rounded"
                  value={updatedPhoto}
                  onChange={(e) => setUpdatedPhoto(e.target.value)}
                />
                <button onClick={handleUpdate} className="btn btn-primary">
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                <p>{user?.email}</p>
                <button
                  onClick={() => {
                    setUpdatedName(user?.displayName);
                    setUpdatedPhoto(user?.photoURL);
                    setEditMode(true);
                  }}
                  className="btn btn-outline mt-2"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        <section>
          <h3 className="text-xl font-semibold mb-3">My Articles</h3>
          {articles.length === 0 ? (
            <p>No articles posted yet.</p>
          ) : (
            <ul className="space-y-3">
              {articles.map((a) => (
                <li key={a._id} className="border p-4 rounded">
                  <h4 className="font-medium">{a.title}</h4>
                  <small>{new Date(a.createdAt).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
