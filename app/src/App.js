import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home';
import SideNav from './components/SideNav';
function App() {
  return (
    <Router>
      <div className="App">
        Hello
        <Header/>
        <Home/>
        <SideNav/>
        <Footer/>
        {/* <Routes>
          <Route path="/home" element={<Header />} />
          <Route path="/login" element={<Home/>} />
          <Route path="/register" element={<SideNav />} />
          <Route path="/footer" element={<Footer/>} />

        </Routes> */}
      </div>
    </Router>
  );
}

export default App;
