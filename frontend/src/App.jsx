import './App.css'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import PostDetail from './pages/PostDetail'
import UserAuth from './pages/UserAuth'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

function App() {
  const user = getUserFromStorage();

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route path={'/addPost'} element={user ? <AddPost /> : <Navigate to="/auth" />} />
        <Route path={'/post/:postId'} element={<PostDetail />} />
        <Route path={'/auth'} element={<UserAuth />} />
      </Routes>
    </Router>
  )
}

export default App
