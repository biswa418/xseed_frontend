import { useState } from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, Page404 } from '../pages'
import Footer from './Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home posts={[]} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          {/* <Route path='/users/:userId' element={<UserProfile />} /> */}
          <Route path='*' element={<Page404 />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
