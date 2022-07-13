import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar';
import GuestView from './components/views/guestView/GuestView';
import Footer from './components/layout/Footer/Footer';
import LoginContextProvider from './store/contexts/LoginContext';
import LoginModal from './components/layout/LoginModal/LoginModal';

function App() {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <div className="">
          <Navbar />
          <Routes>
            <Route path='/' element={ <GuestView /> } />
          </Routes>
          <LoginModal />
          <Footer />
        </div>
      </BrowserRouter>
    </LoginContextProvider>
  );
}

export default App;
