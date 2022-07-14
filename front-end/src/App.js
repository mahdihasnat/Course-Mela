import './App.css';
import { BrowserRouter } from 'react-router-dom'
import LoginContextProvider from './store/contexts/LoginContext';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        {/* <div className="">
          <Navbar />
          <Routes>
            <Route path='/' element={ <GuestView /> } />
            <Route exact path='/instr' element={ <InstructorHome /> } />
          </Routes>
          <LoginModal />
          <Footer />
        </div> */}
        <MainComponent />
      </BrowserRouter>
    </LoginContextProvider>
  );
}

export default App;
