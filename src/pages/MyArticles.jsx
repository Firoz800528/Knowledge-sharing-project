import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyArticles() {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', category: '', tags: '' });

  const fetchMyArticles = useCallback(async () => {
    if (!currentUser) {
      setArticles([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/articles/my');
      setArticles(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to load articles:', error.response || error);
      toast.error('Failed to load your articles.');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchMyArticles();
  }, [fetchMyArticles]);

  function toggleExpand(id) {
    setExpandedArticleId(prev => (prev === id ? null : id));
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      setArticles(prev => prev.filter(a => a._id !== id));
      if (expandedArticleId === id) setExpandedArticleId(null);
      await api.delete(`/articles/${id}`);
      toast.success('Article deleted!');
    } catch (error) {
      toast.error('Failed to delete article');
      console.error('Delete failed:', error.response || error);
      fetchMyArticles();
    }
  }

  function openEditModal(article) {
    setEditingArticle(article);
    setEditForm({
      title: article.title,
      content: article.content,
      category: article.category || '',
      tags: article.tags?.join(', ') || '',
    });
  }

  function closeEditModal() {
    setEditingArticle(null);
    setEditForm({ title: '', content: '', category: '', tags: '' });
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const updated = {
        ...editForm,
        tags: editForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };
      await api.put(`/articles/${editingArticle._id}`, updated);
      toast.success('Article updated successfully!');
      closeEditModal();
      fetchMyArticles();
    } catch (error) {
      toast.error('Failed to update article');
      console.error('Update failed:', error.response || error);
    }
  }

  if (!currentUser) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Please login to see your articles.</p>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">My Articles</h2>

      {articles.length === 0 ? (
        <p className="text-gray-600 text-center">You have not posted any articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map(article => (
            <div
              key={article._id}
              className={`border p-4 rounded-lg shadow-sm bg-white cursor-pointer flex flex-col justify-between ${
                article._id === expandedArticleId ? 'ring-4 ring-blue-300' : ''
              }`}
              onClick={() => toggleExpand(article._id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') toggleExpand(article._id);
              }}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{article.title}</h3>
                <small className="text-gray-500 block mb-2">
                  {new Date(article.createdAt).toLocaleDateString()}
                </small>
                <p className="text-gray-700 mb-4 line-clamp-3 sm:line-clamp-5">{article.content}</p>
              </div>

              <AnimatePresence initial={false}>
                {article._id === expandedArticleId && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 p-3 bg-gray-50 border rounded text-gray-700 text-sm sm:text-base overflow-hidden"
                  >
                    <p><strong>Full Content:</strong></p>
                    <p className="mb-2">{article.content}</p>
                    <p><strong>Category:</strong> {article.category || 'None'}</p>
                    <p><strong>Tags:</strong> {article.tags?.join(', ') || 'None'}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="flex flex-wrap gap-3 mt-4"
                onClick={e => e.stopPropagation()}
              >
                <Link
                  to={`/article/${article._id}`}
                  className="px-4 py-2 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
                >
                  View
                </Link>
                <button
                  onClick={() => openEditModal(article)}
                  className="px-4 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="px-4 py-2 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editingArticle && (
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="modal-content"
              className="bg-white rounded-lg w-full max-w-lg max-h-full overflow-auto p-6 sm:p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Edit Article</h3>
              <form onSubmit={handleEditSubmit} className="grid gap-4">
                <input
                  type="text"
                  className="border p-2 rounded text-base sm:text-lg"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  required
                />
                <textarea
                  className="border p-2 rounded text-base sm:text-lg"
                  placeholder="Content"
                  rows={6}
                  value={editForm.content}
                  onChange={e => setEditForm({ ...editForm, content: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="border p-2 rounded text-base sm:text-lg"
                  placeholder="Category"
                  value={editForm.category}
                  onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                />
                <input
                  type="text"
                  className="border p-2 rounded text-base sm:text-lg"
                  placeholder="Tags (comma separated)"
                  value={editForm.tags}
                  onChange={e => setEditForm({ ...editForm, tags: e.target.value })}
                />

                <div className="flex flex-wrap justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm sm:text-base"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm sm:text-base"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
