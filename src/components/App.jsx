import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, Page404 } from '../pages'
import Footer from './Footer';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home posts={[]} />} />
        {!auth.user && <Route path='/login' element={<Login />} />}
        {!auth.user && <Route path='/register' element={<Signup />} />}
        {/* {auth.user && <Route path='/login' element={<Home />} />}
          {auth.user && <Route path='/register' element={<Home />} />} */}
        <Route path='/:name/:sub' element={<Home />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
