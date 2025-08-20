import axios from "axios";
import React, { useState, useEffect } from "react";

const TeacherStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/GetTeacherCurrentEnrollmentsDetail?teacher_id=${localStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teacher courses:", error);
      });
  }, []);

  const handleStudentClick = (studentId) => {
    // Implement your logic here
    console.log("Clicked student:", studentId);
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
          <div className="cards" key={idx} onClick={() => handleStudentClick(stude.student_id)}>
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

export default TeacherStudents;
