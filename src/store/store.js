import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../featuers/login-slice/loginSlice";
import staffSlice from "../featuers/staff-slice/staffSlice";
import studentsSlice from "../featuers/students-slice/studentsSlice";
import subjectsSlice from "../featuers/subjects-slice/subjectsSlice";
import studyYearsSlice from "../featuers/study-years-slice/studyYearsSlice";
import studyStagesSlice from "../featuers/study-stages-slice/studyStagesSlice";
import gradesSlice from "../featuers/grades-slice/gradesSlice";
import sectionsSlice from "../featuers/sections-slice/sectionsSlice";
import postsSlice from "../featuers/posts-slice/postsSlice";
import scheduleSlice from "../featuers/schedule-slice/scheduleSlice";

// Configure the store
const store = configureStore({
  reducer: {
    login: loginSlice,
    staff: staffSlice,
    students: studentsSlice,
    subjects: subjectsSlice,
    studyYears: studyYearsSlice,
    studyStages: studyStagesSlice,
    grades: gradesSlice,
    sections: sectionsSlice,
    posts: postsSlice,
    schedule: scheduleSlice,
  },
});

export default store;
