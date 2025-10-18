# 🕊️ NestCom — Infinite Nested Comments System  

## 📝 Overview  
**NestCom** is a Reddit-style web app that allows users to post, comment, and reply infinitely in a nested structure.  
It supports authentication, real-time updates through Redux Toolkit Query, and a smooth UI built with TailwindCSS and Framer Motion.  

---

## ⚙️ Tech Stack  

### Frontend  
- React (Vite)  
- Redux Toolkit & RTK Query  
- TailwindCSS  
- Framer Motion  
- React Icons  
- React Toastify  
- React Spinners  

### Backend  
- Node.js  
- Express.js  
- MongoDB with Mongoose  

### Deployment  
- Frontend: Netlify  
- Backend: Render  

---

## 🚀 Features  
✅ **Posts Page:** Displays all posts   
✅ **Nested Comments:** Infinite replies under each comment  
✅ **Edit & Delete:** Users can edit or delete their own comments  
✅ **Like System:** Like/unlike any comment (with username tracking)  
✅ **Authentication:** Signup, login, and logout  
✅ **Responsive Navbar:** Dynamic sign-out button and mobile sidebar  
✅ **Loading States:** Spinner shown during async operations  
✅ **Toast Notifications:** Success and error messages for all key actions  

---

## 🧠 Learning Focus

RTK Query (queries + mutations)

Dynamic nested rendering in React 

---

## 📦 Setup Instructions  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/<your-username>/nestcom.git
cd nestcom
```
### 2️⃣ Install dependencies
Frontend
```bash
cd frontend
npm install
```
Backend
```bash
cd backend
npm install
```
### 3️⃣ Setup environment variables

Create a .env file inside the backend folder with the following:
```env
MONGO_URI=<your-mongodb-uri>
PORT=4000
JWT_SECRET=<your-jwt-secret>
```
### 4️⃣ Run the app locally

Backend
```bash
cd backend
npm run dev
```
Frontend
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173
 (Vite default) and backend on http://localhost:4000
.
