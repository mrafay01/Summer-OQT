import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherStudentsbyCourse = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/GetTeacherCurrentEnrollmentsDetail?teacher_id=${localStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        const filteredStudents = response.data.filter(
          enrollment => enrollment.course_id === parseInt(localStorage.getItem("selected_course_id"))
        );
        setStudents(filteredStudents);
      })
      .catch((error) => {
        console.error("Error fetching teacher courses:", error);
      });
  }, []);

  const handleStudentClick = (stude) => {
    localStorage.setItem("id", localStorage.getItem("id"));
    localStorage.setItem("enrollment_slot_id", stude.enrollment_slot_id);
    localStorage.setItem("user_role", "Teacher");
    navigate("/view-quran-lesson-text");
  };

  return (
    <div>
      <h1>Your Students for {localStorage.getItem("course_name")}</h1>
      <h3 className="subheading">
        Click on the Student to view their progress and Course lessons
      </h3>
      <div className="grid">
      {students.length > 0 ? (
        students.map((stude, idx) => (
          <div className="cards" key={idx} onClick={() => handleStudentClick(stude)}>
            <h3>{stude.StudentName}</h3>
            <p>{stude.CourseName}</p>
            <p>
              Slot: {stude.from_time.substring(0, 5)} - {stude.to_time.substring(0, 5)} on {stude.Day}
            </p>
          </div>
        ))
      ) : (
        <p>No students found.</p>
      )}
      </div>
    </div>
  );
};

export default TeacherStudentsbyCourse;
