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
import placementDatesSlice from "../featuers/placement-dates-slice/placementDatesSlice";
import placementTestsSlice from "../featuers/placement-tests-slice/placementTestsSlice";
import programsSlice from "../featuers/programs-slice/programsSlice";
import activitiesSlice from "../featuers/activities-slice/activitiesSlice";
import visitDatesSlice from "../featuers/visit-dates-slice/visitDatesSlice";
import visitsSlice from "../featuers/visits-slice/visitsSlice";
import incidentsSlice from "../featuers/incidents-slice/incidentsSlice";
import attendancesSlice from "../featuers/attendances-slice/attendancesSlice";
import marksSlice from "../featuers/marks-slice/marksSlice";
import discountsSlice from "../featuers/discounts-slice/discountsSlice";
import feesSlice from "../featuers/fees-slice/feesSlice";
import paymentsSlice from "../featuers/payments-slice/paymentsSlice";
import feeAssignmentsSlice from "../featuers/fee-assignments-slice/feeAssignmentsSlice";

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
    placementDates: placementDatesSlice,
    placementTests: placementTestsSlice,
    programs: programsSlice,
    activities: activitiesSlice,
    visitDates: visitDatesSlice,
    visits: visitsSlice,
    incidents: incidentsSlice,
    attendances: attendancesSlice,
    marks: marksSlice,
    discounts: discountsSlice,
    fees: feesSlice,
    payments: paymentsSlice,
    feeAssignments: feeAssignmentsSlice,
  },
});

export default store;
