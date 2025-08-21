import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChildCourses = () => {
    const [details, setDetails] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/GetStudentCurrentEnrollments?student_id=${localStorage.getItem("student_id")}`
      )
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("No Data found", error);
      });
  }, []);

  const handleCourseClick = (course) => {
    localStorage.setItem("enrollment_id", course.enrollment_id);
    Navigate("/view-lessons");
  };

  return (
    <div>
      <h1>Kids Courses and slots</h1>
      <h3 className="subheading">
        Click on the Course to view its progress and Course lessons
      </h3>
      <div className="grid">
      {details.length > 0 ? (
        details.map((course, idx) => (
          <div className="cards" key={idx} onClick={() => handleCourseClick(course)}>
            <h3>{course.CourseName}</h3>
            <p>
              Slot: {course.from_time.substring(0, 5)} - {course.to_time.substring(0, 5)} on {course.Day}
            </p>
          </div>
        ))
      ) : (
        <p>No courses found.</p>
      )}
      </div>
    </div>
  );
};

export default ChildCourses;
