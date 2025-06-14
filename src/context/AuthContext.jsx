import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import api from '../api/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const firebaseToken = await user.getIdToken();

          const res = await api.post('/auth/login', { 
            firebaseToken,
            name: user.displayName,
            photo: user.photoURL 
          });

          setJwtToken(res.data.token);
          localStorage.setItem('jwtToken', res.data.token);

          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photo: user.photoURL,
          });
        } catch (error) {
          console.error('Failed to get JWT token:', error);
          setCurrentUser(null);
          setJwtToken(null);
          localStorage.removeItem('jwtToken');
        }
      } else {
        setCurrentUser(null);
        setJwtToken(null);
        localStorage.removeItem('jwtToken');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function getToken() {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  }

  async function login(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  async function register(email, password, name, photoURL) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL || null,
    });

    await userCredential.user.getIdToken(true); 

    setCurrentUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: photoURL || '',
    });

    return userCredential;
  }

  async function logout() {
    await signOut(auth);
  }

  const value = {
    currentUser,
    jwtToken,
    login,
    loginWithGoogle,
    register,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}