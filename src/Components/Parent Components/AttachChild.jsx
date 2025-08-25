import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AttachChild = () => {
  const [studentUserName, setStudentUserName] = useState("");
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

  const handleAttach = (studentUserName) => {
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/AttachParentToStudent?studentUserName=${studentUserName}&parent_id=${sessionStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        alert("Parent attached to student successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Can't Attach the Parent!", error);
      });
  };

  const handleCourseProgress = (sid) => {
    sessionStorage.setItem("student_id", sid);
    Navigate("/view-kids-courses");
  };

  return (
    <div>
      <h1>Your Children</h1>
      {students.length > 0 ? (
        <div className="grid">
          {students.map((student, idx) => (
            <div key={idx} className="cards">
              <h3>{student.name}</h3>
              <p>
                <strong>Username:</strong> {student.username}
              </p>
              <button className="submit" style={{width: "20%"}} onClick={() => handleCourseProgress(student.id)}>Check Progress</button>
            </div>
          ))}
        </div>
      ) : (
        <h3>No children found.</h3>
      )}

      <h3 className="subheading">Select a child to attach</h3>
      <div className="lesson-text">
        <input
          type="text"
          style={{width: "50%", padding: "10px"}}
          placeholder="Enter child username"
          onChange={(e) => setStudentUserName(e.target.value)}
        />
        <button className="submit" style={{width: "30%"}} onClick={() => handleAttach(studentUserName)}>
          Attach Child
        </button>
      </div>
    </div>
  );
};

export default AttachChild;
