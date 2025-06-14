import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

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
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!article && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
        <img
          src={article.author_photo || '/default-profile.png'}
          alt="Author"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p>By {article.author_name}</p>
          <p>{new Date(article.createdAt).toLocaleDateString()}</p>
        </div>
        <p className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
          Category: {article.category}
        </p>
      </div>

      {article.tags?.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700">Tags: </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-800 mb-6">
        {article.content}
      </div>

      <div className="mb-10">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className={`text-lg px-4 py-2 rounded transition ${
            userLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
          } ${likeLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-pressed={userLiked}
          aria-label={userLiked ? 'Unlike article' : 'Like article'}
        >
          {userLiked ? '❤️ Liked' : '🤍 Like'} ({likesCount})
        </button>
      </div>

      <section className="bg-gray-50 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>

        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}

        <ul className="space-y-4 mb-6">
          {comments.map((c, index) => (
            <li key={c._id || index} className="border-b pb-2">
              <div className="flex items-start gap-3">
                <img 
                  src={c.user_photo || '/default-profile.png'} 
                  alt={c.user_name}
                  className="w-8 h-8 rounded-full mt-1"
                />
                <div>
                  <p className="font-medium">{c.user_name}</p>
                  <p className="text-gray-700">{c.comment}</p>
                  <small className="text-gray-400 text-xs">
                    {new Date(c.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className="space-y-4">
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Comment
            </button>
          </form>
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
    </div>
  );
}
