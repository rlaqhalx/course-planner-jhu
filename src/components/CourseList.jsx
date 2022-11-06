import CourseBox from "./CourseBox";
import React from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

function CourseList(props) {
  const { type, courses, updateCourse, removeCourse } = props;
  let from = true;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {courses.length &&
        courses.map((course) => {
          return (
            <div key={course._id}>
              <CourseBox
                course={course}
                type={type}
                updateCourse={updateCourse}
                removeCourse={removeCourse}
                from={from}
              ></CourseBox>
            </div>
          );
        })}
    </Grid>
  );
}
export default CourseList;

CourseList.propTypes = {
  type: PropTypes.string,
  courses: PropTypes.array,
  updateCourse: PropTypes.func,
  removeCourse: PropTypes.func,
};
