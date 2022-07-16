import { Route, Routes } from 'react-router-dom'
import Navbar from './layout/Navbar/Navbar';
import GuestView from './views/guestView/GuestView';
import Footer from './layout/Footer/Footer';
import TestServerConncetion from './views/serverTester/TestServerConncetion';
import { Provider } from 'react-redux';
import store from '../store/store';
import InstructorHome from './views/instructor/InstructorHome';
import { useLoginContext } from '../store/contexts/LoginContext';
import LoginModal from './layout/LoginModal/LoginModal';
import AddCourse from './views/instructor/add_course/AddCourse';
import EditCourse from './views/instructor/EditCourse';
import Registration from "./layout/registration/Registration";

function MainComponent() {

  const [{ isSignedIn }, dispatch] = useLoginContext();

  return (
    <Provider store={store}>
      <div className="">
        <Navbar />
        <Routes>
          <Route exact path='/' element={ isSignedIn ? <InstructorHome /> : <GuestView /> } />
          <Route path='/server' element={<TestServerConncetion />} />
          <Route path='/add-course' element={<AddCourse />} />
          <Route path='/edit-course' element={<EditCourse />} />
          <Route path='/register' element={<Registration/>}  />
          {/* <Route exact path='/instr' element={<InstructorHome />} /> */}
        </Routes>
        <LoginModal />
        <Footer />
      </div>
    </Provider>
  );
}

export default MainComponent;
