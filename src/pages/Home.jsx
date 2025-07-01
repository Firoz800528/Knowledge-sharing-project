import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import FaqSection from '../components/FaqSection';
import { motion } from 'framer-motion';
import Loading from '../components/Loading'; 
import TopContributors from '../components/TopContributors';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-gray-600 dark:text-white"
    >
      <motion.section
        variants={fadeUp}
        className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-14 sm:py-16 px-4 sm:px-6 rounded-xl shadow-md"
      >
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
      </motion.section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
  Featured Articles
</h2>

        <motion.div
          variants={stagger}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((article) => (
            <motion.div key={article._id} variants={fadeUp}>
              <Link
                to={`/article/${article._id}`}
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className='max-w-7xl'>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Categories</h2>

        <motion.div
          variants={stagger}
          className="flex flex-wrap gap-3 justify-center sm:justify-start"
        >
          {categories.map(cat => (
            <motion.div key={cat} variants={fadeUp}>
              <Link
                to={`/all-articles?category=${encodeURIComponent(cat)}`}
                className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition"
              >
                {cat}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <TopContributors/>

      <motion.section
        variants={fadeUp}
        className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 sm:p-8 shadow-sm"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">How It Works</h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center"
          variants={stagger}
        >
          {[
            {
              title: '1. Read Articles',
              desc: 'Explore a wide range of knowledge shared by the community.'
            },
            {
              title: '2. Join the Discussion',
              desc: 'Comment, like, and interact with other readers and authors.'
            },
            {
              title: '3. Share Your Ideas',
              desc: 'Create and publish your own articles to help others learn.'
            }
          ].map((step, i) => (
            <motion.div key={i} variants={fadeUp}>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <FaqSection />
    </motion.div>
  );
}
