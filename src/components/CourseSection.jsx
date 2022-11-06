import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import CourseList from "./CourseList";
import PropTypes from "prop-types";

function CourseSection(props) {
  const { type, courses, updateCourse, removeCourse } = props;

  let section = "";

  switch (type) {
    case "enrolled":
      section = "Currently Enrolled";
      break;
    case "interested":
      section = "Want to Take";
      break;
    case "taken":
      section = "Already Took";
  }

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box py={2}>
          <Typography variant="h6">{section}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {courses.length > 0 && (
          <CourseList
            type={type}
            courses={courses}
            updateCourse={updateCourse}
            removeCourse={removeCourse}
          ></CourseList>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default CourseSection;

CourseSection.propTypes = {
  type: PropTypes.string,
  courses: PropTypes.array,
  updateCourse: PropTypes.func,
  removeCourse: PropTypes.func,
};
