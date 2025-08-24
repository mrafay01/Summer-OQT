import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Shared/sharedStyles.css";

const StudentSchedule = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    let studentid;
    if (localStorage.getItem("role") === "Parent") {
      studentid = localStorage.getItem("student_id");
    } else {
      studentid = localStorage.getItem("id");
    }

    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/GetStudentCurrentEnrollments?student_id=${studentid}`
      )
      .then((res) => {
        setSlots(res.data);
      })
      .catch((err) => {
        console.error("Error fetching slots:", err);
      });
  }, []);

  return (
    <div className="schedule-container">
      <h2>Your Slots & Schedule</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Teacher</th>
            <th>Day</th>
            <th>Time Slot</th>
            <th>Course Started Date</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, idx) => (
            <tr key={idx}>
              <td>{slot.CourseName}</td>
              <td>{slot.TeacherName}</td>
              <td>{slot.Day}</td>
              <td>{`${slot.from_time?.substring(
                0,
                5
              )} - ${slot.to_time?.substring(0, 5)}`}</td>
              <td>{slot.start_date ? slot.start_date.substring(0, 10) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSchedule;
