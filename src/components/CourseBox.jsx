import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function CourseBox(props) {
  const styles = {
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

  const { course, type, updateCourse, removeCourse, createCourse, from } =
    props;
  let newStatus = type;
  let color = "";

  switch (newStatus) {
    case "enrolled":
      color = "info.main";
      break;
    case "interested":
      color = "warning.main";
      break;
    case "taken":
      color = "success.main";
      break;
    default:
      color = "#9E9E9E";
  }

  const changeStatus = (e) => {
    newStatus = e.currentTarget.dataset.value;
    if (!course.status && newStatus !== "none") {
      course.status = e.currentTarget.dataset.value;
      createCourse(course);
    } else {
      if (newStatus !== "none") {
        course.status = e.currentTarget.dataset.value;
        updateCourse(course, newStatus);
      } else {
        course.status = "none";
        removeCourse(course, from);
      }
    }
  };

  return (
    <Grid item>
      <Card style={styles.card}>
        <Box bgcolor={color}>
          <CardContent style={styles.cardContent}>
            <Typography color="textSecondary" gutterBottom>
              {course.number}
            </Typography>
            <Typography variant="h5">{course.title}</Typography>
          </CardContent>
        </Box>
        <CardActions style={styles.cardActions}>
          <Button disabled>{course.term}</Button>
          <IconButton style={styles.iconButton}>
            <ExpandMore style={styles.expandMore} />
            <Select style={styles.select} value={"enrolled"}>
              <MenuItem value="move" disabled>
                <Typography variant="body1">Move to...</Typography>
              </MenuItem>
              <MenuItem value="enrolled" onClick={changeStatus}>
                <Typography variant="body1">Currently Enrolled</Typography>
              </MenuItem>
              <MenuItem value="interested" onClick={changeStatus}>
                <Typography variant="body1">Want to Take</Typography>
              </MenuItem>
              <MenuItem value="taken" onClick={changeStatus}>
                <Typography variant="body1">Already Took</Typography>
              </MenuItem>
              <MenuItem value="none" onClick={changeStatus}>
                <Box fontStyle="italic">
                  <Typography variant="body1">None</Typography>
                </Box>
              </MenuItem>
            </Select>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

CourseBox.propTypes = {
  course: PropTypes.object,
  type: PropTypes.string,
  updateCourse: PropTypes.func,
  removeCourse: PropTypes.func,
  createCourse: PropTypes.func,
  from: PropTypes.bool,
};

export default CourseBox;
