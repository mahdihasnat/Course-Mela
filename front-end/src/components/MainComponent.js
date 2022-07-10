import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './layout/Navbar';
import GuestView from './views/guestView/GuestView';
import Footer from './layout/Footer';
import TestServerConncetion from './views/serverTester/TestServerConncetion';
import { Provider } from 'react-redux';
import store from '../store/store';

function MainComponent() {
  return (
    <Provider store={store}>
      <div className="">
        <Navbar />
        <Routes>
          <Route path='/' element={<GuestView />} />
          <Route exact path='/server' element={<TestServerConncetion />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default MainComponent;
