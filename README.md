<!-- Banner -->
<p align="center">
  <img src="https://i.imgur.com/xmwhEUf.png" alt="Knowledge Sharing Platform Banner" width="100%" />
</p>

# 📚 Knowledge Sharing Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) based web platform for students to publish articles, interact through comments, and engage in topic-based discussions. Designed with a secure authentication flow using Firebase and protected backend routes via JWT, the application ensures both accessibility and security for users.

---

## 🌐 Live Preview

🔗 **Client Site:** [https://knowledge-sharing-platfo-44028.web.app](https://knowledge-sharing-platfo-44028.web.app)  
🔗 **Server API:** [https://knowshare-lime.vercel.app](https://knowshare-lime.vercel.app)  
🔗 **Client GitHub Repo:** [Client Repo](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-Firoz800528)  
🔗 **Server GitHub Repo:** [Server Repo](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-Firoz800528)

---

## 🖼️ Screenshot

![Knowledge Sharing Platform Screenshot](https://i.imgur.com/G1lCrXv.png) <!-- Replace with your own deployed screenshot image URL -->

---

## 🎯 Purpose

To build a collaborative knowledge-sharing platform for students where they can:
- Share educational content and experiences
- Engage with peers through comments and likes
- Manage personal articles through a dashboard

---

## 🚀 Key Features

- 📰 Browse public articles without logging in  
- 🔐 Login/register using Firebase Authentication  
- 📝 Post, update, or delete your own articles  
- 💬 Add comments to articles (stored in database)  
- ❤️ Like/unlike feature for each article  
- 🔎 Filter articles by tags or categories  
- 🌙 Light and dark theme toggle  
- 👤 Profile dashboard with article management  
- 🔐 JWT-protected private routes  
- 📱 Mobile responsive UI

---

## 🛠️ Tech Stack

### 🎨 Frontend

- React
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Axios
- Jodit React (Rich Text Editor)
- AOS / Framer Motion (for animation)
- React Toastify

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB (Native driver)
- Firebase Admin SDK
- JSON Web Token (JWT)
- dotenv
- cors

---

## 📦 Dependencies

### Client-Side

- `react`  
- `react-dom`  
- `react-router-dom`  
- `firebase`  
- `axios`  
- `jodit-react`  
- `aos` or `framer-motion`  
- `react-toastify`  
- `classnames`

### Server-Side

- `express`  
- `mongodb`  
- `cors`  
- `dotenv`  
- `firebase-admin`  
- `jsonwebtoken`

---

## 💻 Installation & Setup

### Prerequisites
- Node.js
- npm
- MongoDB Atlas account

---

### 🔧 Clone and Run Locally

#### 👉 Clone the repos

```bash
# Client
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-Firoz800528.git
cd b11a11-client-side-Firoz800528
npm install
npm run dev
