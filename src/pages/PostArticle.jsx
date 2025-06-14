import React, { useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function PostArticle() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const categoryOptions = ['Technology', 'Health', 'Education', 'Science', 'Lifestyle', 'Others'];

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

    try {
      setLoading(true);
      await api.post('/articles', newArticle);
      toast.success('Article posted!');
      navigate('/my-articles');
    } catch (error) {
      console.error(error);
      toast.error('Failed to post article');
    } finally {
      setLoading(false);
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto mt-6 p-6 sm:p-8 bg-white rounded-lg shadow-md"
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Post New Article
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        initial="hidden"
        animate="visible"
      >
        {[title, content, category, tags, thumbnail, date].map((_, i) => (
          <motion.div key={i} custom={i} variants={fadeIn}>
            {i === 0 && (
              <input
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            )}
            {i === 1 && (
              <textarea
                rows="10"
                placeholder="Article Content"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded resize-y focus:ring-2 focus:ring-blue-500"
              />
            )}
            {i === 2 && (
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
            {i === 3 && (
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            )}
            {i === 4 && (
              <input
                type="url"
                placeholder="Thumbnail Image URL"
                value={thumbnail}
                onChange={e => setThumbnail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            )}
            {i === 5 && (
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            )}
          </motion.div>
        ))}

        {thumbnail && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <img
              src={thumbnail}
              alt="Thumbnail preview"
              className="max-h-40 rounded border shadow-sm"
              onError={() => setThumbnail('')}
            />
          </motion.div>
        )}

        <motion.div
          className="text-sm text-gray-600"
          variants={fadeIn}
          custom={6}
        >
          <strong>Posting as:</strong> {currentUser.displayName || 'Anonymous'} ({currentUser.email})
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50"
          variants={fadeIn}
          custom={7}
        >
          {loading ? 'Posting...' : 'Post Article'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
