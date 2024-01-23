import './App.css';

import {Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {

  return (
    <section className='app'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </section>
  )
}

export default App;