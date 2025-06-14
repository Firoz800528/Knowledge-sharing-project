import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function AllArticles() {
  const query = useQuery();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  async function fetchArticles(category = '') {
    setLoading(true);
    try {
      const res = await api.get('/articles');
      let fetchedArticles = res.data;

      const cats = Array.from(new Set(fetchedArticles.map(a => a.category).filter(Boolean)));
      setCategories(cats);

      if (category) {
        fetchedArticles = fetchedArticles.filter(a => a.category === category);
      }
      setArticles(fetchedArticles);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load articles');
    }
    setLoading(false);
  }

  useEffect(() => {
    const categoryFromQuery = query.get('category') || '';
    setSelectedCategory(categoryFromQuery);
  }, [query]);

  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  function onCategoryClick(cat) {
    navigate(cat ? `/all-articles?category=${encodeURIComponent(cat)}` : `/all-articles`);
  }


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Articles</h2>

      <div className="flex flex-wrap justify-center mb-8 gap-3">
        <button
          onClick={() => onCategoryClick('')}
          className={`px-4 py-2 rounded ${
            selectedCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryClick(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
  {articles.map(article => (
    <motion.div
      key={article._id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
      <p className="text-sm text-gray-500 mb-2">
        By {article.author_name} on {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4 flex-grow">
        {article.content.slice(0, 150)}...
      </p>
      <p className="text-xs italic mb-4 text-gray-400">{article.category}</p>
      <div className="flex">
        <Link
          to={`/article/${article._id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full text-center"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  ))}
</AnimatePresence>

        </div>
      )}
    </div>
  );
}
