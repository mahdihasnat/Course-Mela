import React from "react";
import { createContext, useContext, useReducer } from "react";
import SelectedCourseReducer, {
  courseSelectedState,
} from "../database/course/CourseReducer";

const SelectedCourseContext = createContext();

const SelectedCourseContextProvider = ({ children }) => {
  return (
    <SelectedCourseContext.Provider
      value={useReducer(SelectedCourseReducer, courseSelectedState)}
    >
      {children}
    </SelectedCourseContext.Provider>
  );
};

export default SelectedCourseContextProvider;
export const useSelectedCourseContext = () => useContext(SelectedCourseContext);
