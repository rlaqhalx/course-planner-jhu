import Add from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import CourseSection from "../components/CourseSection";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const styles = {
  fab: {
    position: "fixed",
    bottom: "3rem",
    right: "3rem",
  },
  card: {
    margin: "1rem",
    width: "16rem",
  },
  cardContent: {
    minHeight: "8rem",
  },
  cardActions: {
    height: "3rem",
  },
  iconButton: {
    marginLeft: "auto",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
  },
  expandMore: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    padding: "0.5rem",
  },
  select: {
    width: "100%",
    height: "100%",
    opacity: "0",
    cursor: "pointer",
  },
};

function Home(props) {
  
  const {
    getAllCourses,
    updateCourse,
    removeCourse,
    enrolled,
    interested,
    taken,
  } = props;

  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate("/search", { state: { enrolled, interested, taken } });
  };

  return (
    <Container>
      <Header></Header>

      <CourseSection
        getAllCourses={getAllCourses}
        updateCourse={updateCourse}
        removeCourse={removeCourse}
        type="enrolled"
        courses={enrolled}
      ></CourseSection>

      <CourseSection
        getAllCourses={getAllCourses}
        updateCourse={updateCourse}
        removeCourse={removeCourse}
        type="interested"
        courses={interested}
      ></CourseSection>

      <CourseSection
        getAllCourses={getAllCourses}
        updateCourse={updateCourse}
        removeCourse={removeCourse}
        type="taken"
        courses={taken}
      ></CourseSection>

      <Fab style={styles.fab} color="primary" onClick={navigateToSearch}>
        <Add />
      </Fab>
    </Container>
  );
}

export default Home;

Home.propTypes = {
  getAllCourses: PropTypes.func,
  updateCourse: PropTypes.func,
  removeCourse: PropTypes.func,
  enrolled: PropTypes.array,
  interested: PropTypes.array,
  taken: PropTypes.array
};
