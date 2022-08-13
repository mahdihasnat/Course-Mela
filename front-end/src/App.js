import React from "react";
import "./App.css";
// import './static/css/styles.css'
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./store/contexts/LoginContext";
import MainComponent from "./components/MainComponent";
import SelectedCourseContextProvider from "./store/contexts/SelectedCourseContext";

function App() {
  return (
    <LoginContextProvider>
      <SelectedCourseContextProvider>
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
      </SelectedCourseContextProvider>
    </LoginContextProvider>
  );
}

export default App;
