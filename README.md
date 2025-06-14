# 📚 Knowledge Sharing Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application where students can publish articles, comment on others' posts, and engage in meaningful discussions. Authentication is handled using Firebase, and the platform is secured using JWT. The project is fully responsive and designed for an excellent user experience.

---

## 🌐 Live Site

🔗 https://knowledge-sharing-platfo-44028.web.app

## 🌐 Server Site

🔗 https://knowshare-lime.vercel.app

---

## 🎯 Purpose

To create a secure and engaging platform for students to share knowledge and ideas through articles and discussions. Users can browse content freely, but posting, commenting, and managing articles require authentication.

---

## 🚀 Key Features

- 📰 Public article browsing (no login required)
- 📝 Authenticated users can post, update, and delete their own articles
- 💬 Commenting system (with database storage)
- ❤️ Like feature for articles
- 🔐 JWT-secured private routes
- 🔍 Filter articles by category or tags
- 🌙 Light/Dark theme toggle
- 🧑‍🤝‍🧑 Top contributors section (based on comment count)
- 🖋️ Rich text editor (Jodit)
- 📱 Fully responsive design
- 🧑‍💼 User profile management and article history

---

## 🛠️ Tech Stack

### 🔧 Frontend

- React
- React Router DOM
- Tailwind CSS
- Firebase Auth
- Axios
- Jodit React (Rich Text Editor)
- AOS or Framer Motion (for animations)
- React Toastify

### 🖥️ Backend

- Node.js
- Express.js
- MongoDB (Native Driver)
- Firebase Admin SDK
- JSON Web Tokens (JWT)
- dotenv
- cors

---

## 📦 NPM Packages Used

### Client

- `react`
- `react-dom`
- `react-router-dom`
- `firebase`
- `axios`
- `jodit-react`
- `aos` / `framer-motion`
- `react-toastify`
- `classnames`

### Server

- `express`
- `mongodb`
- `cors`
- `dotenv`
- `firebase-admin`
- `jsonwebtoken`

---

## 🔐 Security

- Firebase config stored in environment variables
- MongoDB URI and Firebase Admin credentials protected in `.env`
- Backend APIs protected with custom `verifyJWT` middleware

---

## 🧪 Deployment Checklist

- ✅ All routes work on page reload (no 404 or CORS errors)
- ✅ Firebase domains configured for login
- ✅ No redirects to login on refresh of private routes
- ✅ `.env` and sensitive keys excluded from GitHub

---

## 📜 License

This project is for educational purposes as part of an assignment. Do not copy without permission.

---

## ✍️ Author

Developed by [Md. Firozzaman]  
🔗 [GitHub Repository - Client](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-Firoz800528)  

🔗 [GitHub Repository - Server](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-Firoz800528)
