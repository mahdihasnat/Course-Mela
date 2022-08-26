import {
  ADD_COURSE_TO_COMPARE,
  REMOVED_COURSE_FROM_COMPARE,
  SELECTED_COURSE_FOR_SEARCH,
  ADD_COURSE_TO_CART,
  REMOVED_COURSE_FROM_CART,
  REMOVE_ALL_COURSE_FROM_CART,
  REMOVE_ALL_COURSE_FROM_COMPARE,
  REMOVE_PROMO,
  ADD_PROMO, ADD_PAYMENT_ACCOUNT_NO, ADD_PAYMENT_ACCOUNT_TYPE,
} from "./CourseTypes";

// both for cart and search
export const courseSelectedState = {
  cartCourses: [],
  searchCourses: [],
  compareCourses: [],
  selectedPromo: null,
  paymentAccountNo: "",
  paymentType: "Bkash",
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
    case REMOVE_ALL_COURSE_FROM_CART:
      return {
        ...state,
        cartCourses: [],
      };
    case REMOVE_ALL_COURSE_FROM_COMPARE:
      return {
        ...state,
        compareCourses: [],
      };

    case ADD_PROMO:
      return {
        ...state,
        selectedPromo: action.payload,
      };
    case REMOVE_PROMO:
      return {
        ...state,
        selectedPromo: null,
      };
    case ADD_PAYMENT_ACCOUNT_NO:
        return {
            ...state,
          paymentAccountNo: action.payload,
        };
    case ADD_PAYMENT_ACCOUNT_TYPE:
        return {
            ...state,
            paymentType: action.payload,
        }


    default:
      return state;
  }
};

export default SelectedCourseReducer;
