import Home from "./pages/Home";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAll, update, remove, create, search } from "./api/index.js";

function App() {
  const [courses, setCourses] = useState([]);
  const [searchedCourses, setSearchedCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const getAllCourses = async () => {
    const allCourses = await getAll();
    setCourses([...allCourses]);
  };

  const updateCourse = async (course, status) => {
    course.status = status;
    await update(course, status);
    getAllCourses();
  };

  const removeCourse = async (course, from) => {
    if (from) {
      await remove(course);
    } else {
      delete course.status;
      await remove(course);
    }
    getAllCourses();
  };

  const createCourse = async (course) => {
    if (!checkDuplicate(course)) {
      const created = await create(course);
      course._id = created._id;
      getAllCourses();
    }
  };

  const checkDuplicate = (checkThis) => {
    for (let item of courses) {
      if (
        checkThis.title === item.title &&
        checkThis.term === item.term &&
        checkThis.number === item.number
      ) {
        return item;
      }
    }
    return false;
  };

  const searchCourses = async (query, page, limit) => {
    const searched = await search(query, page, limit);

    for (let item of searched.data) {
      let duplicated = checkDuplicate(item);
      if (duplicated) {
        item.status = duplicated.status;
        item._id = duplicated._id;
      }
    }

    if (searched.pagination.total) {
      setPageNumber(
        Math.ceil(searched.pagination.total / searched.pagination.limit)
      );
    }
    return [...searched.data];
  };

  const settingSearchedCourses = async (query, page, limit) => {
    const data = await searchCourses(query, page, limit);
    setSearchedCourses([...data]);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const currentEnrolled = courses.filter((course) => {
    return course.status === "enrolled";
  });

  const wantToTake = courses.filter((course) => {
    return course.status === "interested";
  });

  const alreadyTaken = courses.filter((course) => {
    return course.status === "taken";
  });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              getAllCourses={getAllCourses}
              updateCourse={updateCourse}
              removeCourse={removeCourse}
              enrolled={currentEnrolled}
              interested={wantToTake}
              taken={alreadyTaken}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              updateCourse={updateCourse}
              removeCourse={removeCourse}
              createCourse={createCourse}
              searchedCourses={searchedCourses}
              searchCourses={searchCourses}
              settingSearchedCourses={settingSearchedCourses}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            ></Search>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
