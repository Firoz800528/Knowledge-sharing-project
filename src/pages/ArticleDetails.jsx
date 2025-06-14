import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../components/Loading';

export default function ArticleDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { currentUser, jwtToken } = useAuth();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);

  let hasShownToast = false;

  useEffect(() => {
    async function fetchArticleAndComments() {
      setLoading(true);
      try {
        const headers = {};
        if (jwtToken) {
          headers['Authorization'] = `Bearer ${jwtToken}`;
        }

        const res = await api.get(`/articles/${id}`, { headers });

        const articleData = res.data.article || res.data;
        setArticle(articleData);
        setLikesCount(res.data.likesCount || 0);
        setUserLiked(res.data.userLiked || false);

        await fetchComments();
      } catch (error) {
        console.error('Error fetching article:', error);
        if (!hasShownToast) {
          toast.error('Failed to load article. Please Login first');
          hasShownToast = true;
        }
      }
      setLoading(false);
    }

    fetchArticleAndComments();
  }, [id, jwtToken]);

  async function fetchComments() {
    try {
      const res = await api.get(`/articles/${id}/comments`);
      setComments(res.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      toast.error('Failed to load comments');
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();

    if (!currentUser) {
      toast.error('Please login to comment');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (!jwtToken) {
      toast.error('Authentication token missing. Please login again.');
      return;
    }

    try {
      await api.post(
        `/articles/${id}/comments`,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      setNewComment('');
      toast.success('Comment added!');
      await fetchComments();
    } catch (error) {
      console.error('Failed to add comment:', error.response?.data || error);
      toast.error('Failed to add comment');
    }
  }

  async function handleLike() {
    if (!currentUser) {
      toast.error('Please login to like');
      return;
    }

    if (!jwtToken) {
      toast.error('Authentication token missing. Please login again.');
      return;
    }

    if (likeLoading) return;
    setLikeLoading(true);

    try {
      if (userLiked) {
        await api.put(
          `/articles/${id}/unlike`,
          {},
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        setLikesCount((count) => count - 1);
      } else {
        await api.put(
          `/articles/${id}/like`,
          {},
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        setLikesCount((count) => count + 1);
      }

      setUserLiked(!userLiked);
    } catch (error) {
      console.error('Failed to update like:', error.response?.data || error);
      toast.error(`${error.response?.data?.message || error.message}`);
    }

    setLikeLoading(false);
  }

  if (loading)
    return <Loading />;

  if (!article && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        {article.title}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-3">
          <img
            src={article.author_photo || '/default-profile.png'}
            alt="Author"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p>By {article.author_name}</p>
            <p>{new Date(article.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="sm:ml-auto text-xs bg-gray-100 px-3 py-1 rounded self-start sm:self-center">
          Category: {article.category}
        </p>
      </div>

      {article.tags?.length > 0 && (
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800 mb-8">
        {article.content}
      </div>

      <div className="mb-10">
        <motion.button
          onClick={handleLike}
          disabled={likeLoading}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: userLiked ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`text-lg px-4 py-2 rounded transition ${
            userLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
          } ${likeLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-pressed={userLiked}
          aria-label={userLiked ? 'Unlike article' : 'Like article'}
        >
          {userLiked ? '❤️ Liked' : '🤍 Like'} ({likesCount})
        </motion.button>
      </div>

      <section className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Comments ({comments.length})
        </h3>

        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}

        <AnimatePresence>
          <ul className="space-y-4 mb-6">
            {comments.map((c, index) => (
              <motion.li
                key={c._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b pb-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={c.user_photo || '/default-profile.png'}
                    alt={c.user_name}
                    className="w-8 h-8 rounded-full mt-1"
                  />
                  <div>
                    <p className="font-medium">{c.user_name}</p>
                    <p className="text-gray-700 text-sm">{c.comment}</p>
                    <small className="text-gray-400 text-xs">
                      {new Date(c.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>

        {currentUser ? (
          <motion.form
            onSubmit={handleCommentSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              id="comment"
              rows="3"
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Submit Comment
            </button>
          </motion.form>
        ) : (
          <p className="text-gray-600">
            Please{' '}
            <a href="/login" className="text-blue-600 underline">
              login
            </a>{' '}
            to comment.
          </p>
        )}
      </section>
    </motion.div>
  );
}
