import React, { useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostArticle() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  if (!currentUser) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Please login to post an article.</p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required.');
      return;
    }

    try {
      const newArticle = {
        title,
        content,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        thumbnail,
        date,
        author: {
          email: currentUser.email,
          displayName: currentUser.displayName || 'Anonymous',
        },
      };

      await api.post('/articles', newArticle);

      toast.success('Article posted!');
      navigate('/my-articles');
    } catch (error) {
      console.error(error);
      toast.error('Failed to post article');
    }
  }

  const categoryOptions = ['Technology', 'Health', 'Education', 'Science', 'Lifestyle', 'Others'];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-6">Post New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          rows="10"
          placeholder="Article Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="url"
          placeholder="Thumbnail Image URL"
          value={thumbnail}
          onChange={e => setThumbnail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-sm text-gray-600">
          <p><strong>Posting as:</strong> {currentUser.displayName || 'Anonymous'} ({currentUser.email})</p>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Post Article
        </button>
      </form>
    </div>
  );
}
