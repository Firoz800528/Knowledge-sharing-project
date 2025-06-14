import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function Register() {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validatePassword(pw) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(pw);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Name is required.');
      return;
    }
    if (!email.trim()) {
      toast.error('Email is required.');
      return;
    }
    if (!validatePassword(password)) {
      toast.error('Password must be at least 6 characters and include both uppercase and lowercase letters.');
      return;
    }

    try {
      const userCredential = await register(email, password, name, photoURL);
      if (userCredential.user) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: `Welcome, ${name || 'User'}!`,
          confirmButtonColor: '#3b82f6',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          sessionStorage.setItem('reload_done', 'true');
          window.location.reload();
        });
      } else {
        toast.error('Registration failed: User not created.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed: ' + error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="Photo URL (optional)"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="text-sm text-gray-500">
          Password must be at least 6 characters, with uppercase and lowercase letters.
        </p>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
