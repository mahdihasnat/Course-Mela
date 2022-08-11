import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar/Navbar";
// import MuiNavbar from "./layout/Navbar/NavBarUpdated";
import GuestView from "./views/guestView/GuestView";
// import NavBar from './layout/'
import Footer from "./layout/Footer/Footer";
import TestServerConncetion from "./views/serverTester/TestServerConncetion";
import { Provider } from "react-redux";
import store from "../store/store";
import InstructorHome from "./views/instructor/InstructorHome";
import { useLoginContext } from "../store/contexts/LoginContext";
import LoginModal from "./layout/LoginModal/LoginModal";
import AddCourse from "./views/instructor/add_course/AddCourse";
import EditCourse from "./views/instructor/edit_course/EditCourse";
import Registration from "./layout/registration/Registration";
import { PRE_LOGGED_IN } from "../store/auth/AuthTypes";

import { useEffect } from "react";
import LoginService from "../services/auth/LoginService";
import { INSTRUCTOR, ROLE_STUDENT } from "../shared/StringConstant";
import StudentView from "./views/student/StudentView";

import Test from "./helper/Test";
import InstructorCourseList from "./views/instructor/InstructorCourseList";
import InstructorCourseDetails from "./views/instructor/course/InstructorCourseDetails";
import MuiNavbar from "./layout/Navbar/NavBarUpdated";
import Login from "./layout/login/Login";
import VideoWatch from "./views/shared/videoWatch/VideoWatch";

function MainComponent() {
  const [{ isSignedIn, userRole }, dispatch] = useLoginContext();

  useEffect(() => {
    async function checkLogin() {
      if (localStorage.getItem("jwtToken") !== null) {
        /// TODO give a call to server to check jwtToken expired

        await dispatch({
          type: PRE_LOGGED_IN,
          payload: {
            userRole: localStorage.getItem("userRole"),
            userName: localStorage.getItem("userName"),
          },
        });
      }
    }
    checkLogin();
  }, []);

  return (
    <Provider store={store}>
      <div className="">
        {/*<Navbar />*/}
        {/*<Navbar/>*/}
        <MuiNavbar />
        <LoginModal />
        <Routes>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/edit-course/:courseId" element={<EditCourse />} />
          {!isSignedIn ? (
            <>
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : null}

          <Route path='/watchVideo/:videoId' element={<VideoWatch/>} />

          <Route exact path="/instr" element={<InstructorHome />} />
          <Route
            path="/courses/:courseId"
            element={<InstructorCourseDetails />}
          ></Route>

          <Route path="/server" element={<TestServerConncetion />} />
          <Route
            path="*"
            element={
              isSignedIn ? (
                userRole == ROLE_STUDENT ? (
                  <StudentView />
                ) : (
                  <InstructorHome />
                )
              ) : (
                <GuestView />
              )
            }
          />
        </Routes>
        <Footer
          title={"CourseMela"}
          description={"We are course providing site"}
        />
      </div>
    </Provider>
  );
}

export default MainComponent;
