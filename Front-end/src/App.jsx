import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import About from './pages/About'
import OurServices from './pages/OurServices'
import Blog from './pages/Blog'
import Employer from './pages/Employer'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import TermsAndCondition from './pages/TermsAndCondition'
import ScrollToTop from './components/ScrollToTop'
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/our-services' element={<OurServices />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/employer' element={<Employer />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/privacy-policy' element={<Policy />} />
        <Route path='/terms-and-condition' element={<TermsAndCondition />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
