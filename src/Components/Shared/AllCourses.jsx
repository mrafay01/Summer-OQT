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

  // Save course info to sessionStorage and navigate
  const handleCourseClick = (courseId) => {
    sessionStorage.setItem("selected_course_id", courseId);
    sessionStorage.setItem("student_id", sessionStorage.getItem("id"));
    sessionStorage.setItem("userrole", sessionStorage.getItem("Role"));
    navigate("/set-student-schedule");
  };

  const handleViewLessons = () => {
    sessionStorage.setItem("student_id", sessionStorage.getItem("id"));
    sessionStorage.setItem("userrole", sessionStorage.getItem("Role"));
    navigate("/view-courses-progress");
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
      <div className="lesson-text">
        <h3> Check your Course Progress</h3>
        <button
          className="submit"
          style={{ width: "30%" }}
          onClick={handleViewLessons}
        >
          Check Course Progress
        </button>
      </div>
    </div>
  );
};

export default AllCourses;
