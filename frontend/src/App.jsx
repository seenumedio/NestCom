import './App.css'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import PostDetail from './pages/PostDetail'
import UserAuth from './pages/UserAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/addPost'} element={<AddPost />} />
        <Route path={'/post/:postId'} element={<PostDetail />} />
        <Route path={'/auth'} element={<UserAuth />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
