import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  function getFriendlyErrorMessage(code) {
    switch (code) {
      case 'auth/user-not-found':
        return 'User not found. Please register first.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'Invalid Email or Password.';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Email is required.');
      return;
    }
    if (!password.trim()) {
      toast.error('Password is required.');
      return;
    }

    try {
      await login(email, password);
      const auth = getAuth();
      const user = auth.currentUser;
      const displayName = user?.displayName || email;

      await Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${displayName}!`,
        confirmButtonColor: '#3b82f6',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      sessionStorage.setItem('reload_done', 'true');
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
      const message = getFriendlyErrorMessage(error.code);
      toast.error(message);
    }
  }

  async function handleGoogleLogin() {
    try {
      const userCred = await loginWithGoogle();
      const displayName = userCred.user.displayName || 'User';

      await Swal.fire({
        icon: 'success',
        title: 'Google Login Successful!',
        text: `Welcome, ${displayName}!`,
        confirmButtonColor: '#3b82f6',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      sessionStorage.setItem('reload_done', 'true');
      window.location.reload();
    } catch (error) {
      console.error('Google login failed:', error);
      toast.error(getFriendlyErrorMessage(error.code) || error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
        >
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
