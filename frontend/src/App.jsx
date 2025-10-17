import './App.css'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import PostDetail from './pages/PostDetail'
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/addPost'} element={<AddPost />} />
        <Route path={'/post/:postId'} element={<PostDetail />} />
      </Routes>
    </Router>
  )
}

export default App
