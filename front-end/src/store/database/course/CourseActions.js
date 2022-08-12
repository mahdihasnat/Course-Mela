import {
  ADD_COURSE_TO_CART,
  ADD_COURSE_TO_COMPARE,
  REMOVED_COURSE_FROM_CART,
  REMOVED_COURSE_FROM_COMPARE,
} from "./CourseTypes";

export const addCourseToCompare = (course) => {
  return {
    type: ADD_COURSE_TO_COMPARE,
    payload: course,
  };
};

export const removeCourseFromCompare = (course) => {
  return {
    type: REMOVED_COURSE_FROM_COMPARE,
    payload: course,
  };
};

export const addCourseToCart = (course) => {
  return {
    type: ADD_COURSE_TO_CART,
    payload: course,
  };
};

export const removeCourseFromCart = (course) => {
  return {
    type: REMOVED_COURSE_FROM_CART,
    payload: course,
  };
};
