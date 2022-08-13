import {
  ADD_COURSE_TO_CART,
  ADD_COURSE_TO_COMPARE,
  ADD_PROMO,
  REMOVED_COURSE_FROM_CART,
  REMOVED_COURSE_FROM_COMPARE,
  REMOVE_ALL_COURSE_FROM_CART,
  REMOVE_ALL_COURSE_FROM_COMPARE,
  REMOVE_PROMO,
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

export const removeAllCourseFromCompare = (course) => {
  return {
    type: REMOVE_ALL_COURSE_FROM_COMPARE,
  };
};

export const removeAllCourseFromCart = (course) => {
  return {
    type: REMOVE_ALL_COURSE_FROM_CART,
  };
};

export const addPromo = (promo) => {
  return {
    type: ADD_PROMO,
    payload: promo,
  };
};

export const removePromo = (promo) => {
  return {
    type: REMOVE_PROMO,
    payload: promo,
  };
};
