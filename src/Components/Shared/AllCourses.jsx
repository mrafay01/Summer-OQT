import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Shared/sharedStyles.css";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost/OnlineQuranServer/api/tutor/AllCourses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  // Save course info to localStorage and navigate
  const handleCourseClick = (courseId) => {
    localStorage.setItem("selected_course_id", courseId);
    localStorage.setItem("student_id", localStorage.getItem("id"));
    localStorage.setItem("userrole", localStorage.getItem("Role"));
    navigate("/set-student-schedule");
  };

  const handleViewLessons = (course) => {
    localStorage.setItem("selected_course_id", course.id);
    localStorage.setItem("selected_course_name", course.name);
    localStorage.setItem("student_id", localStorage.getItem("id"));
    localStorage.setItem("userrole", localStorage.getItem("Role"));
    if (course.id === 5) {
      console.log("courseId:", course.id);
      navigate("/hadith-books");
    } else {
      navigate("/view-lessons");
    }
  };

  return (
    <div>
      <h1>All Courses</h1>
      <h3 className="subheading">Click on the course you want to study</h3>
      <div className="grid">
        {courses.map((course) => (
          <div
            className="cards"
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="title">{course.name}</div>
            <div>
              <strong>Description:</strong> {course.description}
            </div>
            <div>
              <strong>Sub Title:</strong> {course.Sub_title}
            </div>
          </div>
        ))}
      </div>

       <h3 className="subheading"> To view lessons, Select the Course from below</h3>
      <div className="grid">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleViewLessons(course)}
            className="cards"
          >
            <h3>{course.name}</h3>
            <p>{course.Sub_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
