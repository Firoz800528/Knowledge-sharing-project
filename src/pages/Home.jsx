import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import FaqSection from '../components/FaqSection';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resArticles = await api.get('/articles');
        const sorted = resArticles.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setFeatured(sorted);

        const resCategories = await api.get('/articles/categories');
        setCategories(resCategories.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-gray-800 dark:text-gray-100">

      <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-14 sm:py-16 px-4 sm:px-6 rounded-xl shadow-md">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Share Your Knowledge</h1>
        <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto">
          Discover articles and share your ideas with others.
        </p>
        <Link
          to="/all-articles"
          className="inline-block bg-white text-blue-700 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Explore Articles
        </Link>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left">Featured Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(article => (
            <Link
              to={`/article/${article._id}`}
              key={article._id}
              className="block p-5 border rounded-xl hover:shadow-lg transition bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {article.content.length > 100
                  ? `${article.content.slice(0, 100)}...`
                  : article.content}
              </p>
              <small className="text-sm text-gray-500 dark:text-gray-400 block">
                By {article.author_name} on{' '}
                {new Date(article.createdAt).toLocaleDateString()}
              </small>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left">Categories</h2>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {categories.map(cat => (
            <Link
              to={`/all-articles?category=${encodeURIComponent(cat)}`}
              key={cat}
              className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">How It Works</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
          <div>
            <h3 className="font-bold text-lg mb-2">1. Read Articles</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore a wide range of knowledge shared by the community.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">2. Join the Discussion</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comment, like, and interact with other readers and authors.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">3. Share Your Ideas</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and publish your own articles to help others learn.
            </p>
          </div>
        </div>
      </section>

      <FaqSection />

    </div>
  );
}
