import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GuestView from "./views/guestView/GuestView";
// import NavBar from './layout/'
import Footer from "./layout/Footer/Footer";
import TestServerConncetion from "./views/serverTester/TestServerConncetion";
import { Provider } from "react-redux";
import store from "../store/store";
import InstructorHome from "./views/instructor/InstructorHome";
import { useLoginContext } from "../store/contexts/LoginContext";
import AddCourse from "./views/instructor/add_course/AddCourse";
import EditCourse from "./views/instructor/edit_course/EditCourse";
import Registration from "./layout/registration/Registration";
import { PRE_LOGGED_IN } from "../store/auth/AuthTypes";
import { ROLE_INSTRUCTOR, ROLE_STUDENT } from "../shared/StringConstant";
import StudentView from "./views/student/StudentView";

import Test from "./helper/Test";
import InstructorCourseDetails from "./views/instructor/course/InstructorCourseDetails";
import MuiNavbar from "./layout/Navbar/NavBarUpdated";
import Login from "./layout/login/Login";
import VideoWatch from "./views/shared/videoWatch/VideoWatch";
import SearchView from "./views/guestView/search/SearchView";

import { CompareView } from "./views/guestView/compare/CompareView";
import CourseGuestView from "./views/guestView/course/CourseGuestView";
import { CartDetails } from "./views/student/cart/CartDetails";
import Checkout from "./templates/checkout/Checkout";
import StudyPlans from "./views/student/StudyPlans";
import { Box } from "@material-ui/core";
import PromoContainer from "./views/student/promo/PromoContainer";
import TrackYourProgressContainer from "./views/student/trackYourProgress/TrackYourProgressContainer";

function MainComponent() {
  const [{ isSignedIn, userRole }, dispatch] = useLoginContext();
  const [isLoading, setIsLoading] = React.useState(true);

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
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    checkLogin().then(r => {
      // console.log(r);
    });
  }, [isSignedIn, dispatch]);

  // useEffect(() => {}, [isSignedIn]);

  return (
    <Provider store={store}>
      {!isLoading && (
        <div className="">
          <MuiNavbar />
          <Box minHeight={600}>
            <Routes>
              {/* all acceess */}

              <Route path="/test" element={<Test />}></Route>
              <Route path="/server" element={<TestServerConncetion />} />

              {!isSignedIn && (
                <>
                  <Route path="/register" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<GuestView />} />
                </>
              )}

              {isSignedIn && (
                <>
                  <Route path="/course/search" element={<SearchView />}></Route>
                  <Route
                    path="/course/compare"
                    element={<CompareView />}
                  ></Route>
                  <Route path="/watchVideo/:videoId" element={<VideoWatch />} />
                </>
              )}
              {isSignedIn && userRole === ROLE_STUDENT && (
                <>
                  <Route path="/promo" element={<PromoContainer/>} />
                  <Route path={'/track-progress'} element={<TrackYourProgressContainer/>} />
                  <Route
                    path="/courses/:courseId"
                    element={<CourseGuestView />}
                  />
                  <Route path="/cartDetails" element={<CartDetails />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="*" element={<StudentView />} />
                </>
              )}

              {isSignedIn && userRole === ROLE_INSTRUCTOR && (
                <>
                  <Route path="/add-course" element={<AddCourse />} />
                  <Route
                    path="/edit-course/:courseId"
                    element={<EditCourse />}
                  />
                  <Route
                    path="/courses/:courseId"
                    element={<InstructorCourseDetails />}
                  />
                  <Route path="*" element={<InstructorHome />} />
                </>
              )}

              {isSignedIn && userRole === ROLE_STUDENT && (
                <>
                  <Route path="/" element={<StudentView />} />
                  <Route path="/plans" element={<StudyPlans />} />
                </>
              )}

              {/* <Route exact path="/instr" element={<InstructorHome />} /> */}
            </Routes>
          </Box>
          <Footer
            title={"CourseMela"}
            description={"We are course providing site"}
          />
        </div>
      )}
    </Provider>
  );
}

export default MainComponent;
