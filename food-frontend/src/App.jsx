import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar.jsx'
import Home from './component/Home.jsx'
import About from './component/About.jsx'
import Howitwork from './component/Howitwork.jsx'
import Signin from './component/Signin.jsx'
import Signup from './component/Signup.jsx'
import ScrollToTop from './component/ScrollToTop.jsx'
import Donate from './component/Donate.jsx'
import Receive from './component/Receive.jsx'
import Notfound from './component/Notfound.jsx'
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate/*" element={<Donate />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/howitwork" element={<Howitwork />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
