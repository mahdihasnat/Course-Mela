import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import GuestView from './components/views/guestView/GuestView';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Navbar />
        <Routes>
          <Route path='/' element={ <GuestView /> } />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
