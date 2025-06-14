import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllArticles from './pages/AllArticles';
import ArticleDetails from './pages/ArticleDetails';
import PostArticle from './pages/PostArticle';
import MyArticles from './pages/MyArticles';
import EditArticle from './pages/EditArticle';
import About from './pages/About';
import Error from './pages/Error';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/UserProfile';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/all-articles" element={<AllArticles />} />
      <Route path="/article/:id" element={<ArticleDetails />} />
      <Route path="/post-article" element={<PostArticle />} />
      <Route path="/my-articles" element={<MyArticles />} />
      <Route path="/edit-article/:id" element={<EditArticle />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const reloadFlag = sessionStorage.getItem('reload_done');
    if (reloadFlag) {
      sessionStorage.removeItem('reload_done');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const hideLayoutPaths = ['/login', '/register'];
  const knownPaths = [
    '/',
    '/contact',
    '/terms',
    '/login',
    '/register',
    '/all-articles',
    '/about',
    '/my-articles',
    '/post-article',
    '/edit-article/',
  ];

  const isKnownRoute =
    knownPaths.includes(location.pathname) ||
    location.pathname.startsWith('/article/');

  const hideLayout = hideLayoutPaths.includes(location.pathname) || !isKnownRoute;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="main-content">
        <AppRoutes />
      </main>
      {!hideLayout && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWrapper />
      </Router>
    </AuthProvider>
  );
}
