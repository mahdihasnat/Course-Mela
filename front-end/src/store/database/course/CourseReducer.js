import {
  ADD_COURSE_TO_COMPARE,
  REMOVED_COURSE_FROM_COMPARE,
  SELECTED_COURSE_FOR_SEARCH,
  ADD_COURSE_TO_CART,
  REMOVED_COURSE_FROM_CART,
} from "./CourseTypes";

// both for cart and search
export const courseSelectedState = {
  cartCourses: [],
  searchCourses: [],
  compareCourses: [],
};

const SelectedCourseReducer = (state = courseSelectedState, action) => {
  console.log({
    Reducer: "SelectedCourseReducer",
    action: action,
    state: state,
  });
  switch (action.type) {
    case ADD_COURSE_TO_COMPARE:
      return {
        ...state,
        compareCourses: [...state.compareCourses, action.payload],
      };
    case REMOVED_COURSE_FROM_COMPARE:
      return {
        ...state,
        compareCourses: state.compareCourses.filter(
          (course) => course.id !== action.payload.id
        ),
      };
    case SELECTED_COURSE_FOR_SEARCH:
      return {
        ...state,
        searchCourses: [...state.searchCourses, action.payload],
      };
    case ADD_COURSE_TO_CART:
      return {
        ...state,
        cartCourses: [...state.cartCourses, action.payload],
      };
    case REMOVED_COURSE_FROM_CART:
      return {
        ...state,
        cartCourses: state.cartCourses.filter(
          (course) => course.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default SelectedCourseReducer;
