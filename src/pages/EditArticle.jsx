import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditArticle() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await api.get(`/articles/${id}`);
        const article = res.data.article;

        if (!article) {
          toast.error('Article not found');
          navigate('/');
          return;
        }

        if (article.author_email !== currentUser.email) {
          toast.error('You do not have permission to edit this article');
          navigate('/');
          return;
        }

        setTitle(article.title);
        setContent(article.content);
        setCategory(article.category);
        setTags(article.tags ? article.tags.join(', ') : '');
      } catch (error) {
        toast.error('Failed to load article');
        navigate('/');
      }
    }

    if (currentUser) {
      fetchArticle();
    } else {
      toast.error('You must be logged in to edit articles');
      navigate('/login');
    }
  }, [id, currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedArticle = {
        title,
        content,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      };
      await api.put(`/articles/${id}`, updatedArticle);
      toast.success('Article updated!');
      navigate('/my-articles');
    } catch (error) {
      toast.error('Failed to update article');
    }
  }

  if (!currentUser) return <p className="text-center mt-10 text-gray-500">Please login to edit articles.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          rows="10"
          placeholder="Article Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Article
        </button>
      </form>
    </div>
  );
}
