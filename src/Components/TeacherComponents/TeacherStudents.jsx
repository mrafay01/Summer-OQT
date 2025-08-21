import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/GetTeacherCurrentEnrollmentsDetail`,
        {
          params: {
            teacher_id: localStorage.getItem("id")
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teacher courses:", error);
      });
  }, []);

  return (
    <div className="schedule-container">
      <h2>Your Students Slots & Schedule</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Day</th>
            <th>Time Slot</th>
            <th>Start Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx} onClick={() => handleStudentClick(student)} style={{ cursor: 'pointer' }}>
              <td>{student.StudentName}</td>
              <td>{student.CourseName}</td>
              <td>{student.Day}</td>
              <td>{`${student.from_time?.substring(0, 5)} - ${student.to_time?.substring(0, 5)}`}</td>
              <td>{student.start_date ? new Date(student.start_date).toLocaleDateString() : ""}</td>
              <td>
                {student.finish_date ? (
                  <span style={{ color: 'red' }}>Completed</span>
                ) : (
                  <span style={{ color: 'green' }}>Active</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {students.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No students found</p>
      )}
    </div>
  );
};

export default TeacherStudents;
