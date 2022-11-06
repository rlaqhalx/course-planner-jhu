import { InputAdornment, TextField } from "@mui/material";
import CourseBox from "../components/CourseBox.jsx";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";


const styles = {
  textfield: {
    width: "90%",
    top: "15px",
    maxWidth: "1100px",
    display: "flex",
    margin: "auto",
  },
  grid: {
    width: "90%",
    maxWidth: "1100px",
    display: "flex",
    margin: "auto",
    marginTop: "20px",
  },
  pagination: {
    display: "flex",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "45px",
  },
};

function Search(props) {
  const {
    updateCourse,
    removeCourse,
    createCourse,
    searchedCourses,
    settingSearchedCourses,
    pageNumber,
    setPageNumber,
  } = props;
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const from = false;

  const handleSearchInput = (event) => {
    setInput(event.target.value);
    handleSearch(event.target.value, 1, 9);
    setPage(1);
    if (event.target.value == "") {
      setPageNumber(0);
    }
  };

  const handleSearch = (input, page, limit) => {
    settingSearchedCourses(input, page, limit);
  };

  const handlePagination = (event, value) => {
    setPage(value);
    handleSearch(input, value, 9);
  };

  const handleClearClick = () => {
    setInput("");
    handleSearch("", 1, 9);
    setPageNumber(0);
    setPage(1);
  };

  return (
    <>
      <TextField
        style={styles.textfield}
        label="Search"
        focused
        onChange={handleSearchInput}
        value={input}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon
                sx={{
                  visibility: input ? "visible" : "hidden",
                  fontSize: 20,
                  color: "#1876D1",
                }}
                onClick={handleClearClick}
                size="sm"
              />
            </InputAdornment>
          ),
        }}
      ></TextField>

      <Pagination
        style={styles.pagination}
        count={pageNumber}
        page={page}
        onChange={handlePagination}
        size="large"
      />

      <Grid
        style={styles.grid}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {searchedCourses.length > 0 &&
          searchedCourses.map((course, index) => {
            return (
              <div key={index}>
                <CourseBox
                  course={course}
                  type={course.status}
                  updateCourse={updateCourse}
                  removeCourse={removeCourse}
                  createCourse={createCourse}
                  from={from}
                ></CourseBox>
              </div>
            );
          })}
      </Grid>
    </>
  );
}

export default Search;

Search.propTypes = {
    updateCourse: PropTypes.func,
    removeCourse: PropTypes.func,
    createCourse: PropTypes.func,
    searchedCourses: PropTypes.array,
    settingSearchedCourses: PropTypes.func,
    pageNumber: PropTypes.number,
    setPageNumber: PropTypes.func,
};
