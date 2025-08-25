import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewChild = () => {
  const [students, setStudents] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/GetParentStudents?parent_id=${sessionStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Can't Attach the Parent!", error);
      });
  }, []);

const handleViewSchedule = (studentId) => {
    sessionStorage.setItem("student_id", studentId);
    sessionStorage.setItem("role", "Parent");
    Navigate("/Student/Schedule");
  };

  return (
    <div>
      <h1>Your Children</h1>
      <h3 className="subheading">Click on the student to view their schedule</h3>
      {students.length > 0 ? (
        <div className="grid">
          {students.map((student, idx) => (
            <div key={idx} className="cards" onClick={() => handleViewSchedule(student.id)}>
              <h3>{student.name}</h3>
              <p>
                <strong>Username:</strong> {student.username}
              </p>
              <p><strong>Gender:</strong> {student.gender === "F"?"Female":"Male"}</p>
            </div>
          ))}
        </div>
      ) : (
        <h3>No children found.</h3>
      )}

    </div>
  );
};

export default ViewChild;
