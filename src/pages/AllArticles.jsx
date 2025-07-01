import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../components/Loading';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function AllArticles() {
  const query = useQuery();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

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

      // Sorting logic
      if (sortOption === 'newest') {
        fetchedArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortOption === 'oldest') {
        fetchedArticles.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortOption === 'title-asc') {
        fetchedArticles.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === 'title-desc') {
        fetchedArticles.sort((a, b) => b.title.localeCompare(a.title));
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
  }, [selectedCategory, sortOption]);

  function onCategoryClick(cat) {
    navigate(cat ? `/all-articles?category=${encodeURIComponent(cat)}` : `/all-articles`);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        All Articles
      </h2>

      {/* Category Filter Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => onCategoryClick('')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base ${
            selectedCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryClick(cat)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base ${
              selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>

      {/* Article Cards */}
      {loading ? (
        <Loading />
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {articles.map(article => (
              <motion.div
                key={article._id}
                layout
                variants={itemVariants}
                transition={{ duration: 0.2 }}
                className="bg-white shadow-md rounded-xl p-5 flex flex-col hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  By {article.author_name} on{' '}
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 mb-3 flex-grow line-clamp-3">
                  {article.content}
                </p>
                <p className="text-xs italic text-gray-400 mb-3">{article.category}</p>
                <Link
                  to={`/article/${article._id}`}
                  className="bg-blue-600 text-white px-4 py-2 text-sm sm:text-base rounded hover:bg-blue-700 transition text-center"
                >
                  Read More
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
