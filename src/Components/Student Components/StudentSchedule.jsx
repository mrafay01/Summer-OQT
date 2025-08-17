import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Shared/sharedStyles.css";

const StudentSchedule = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost/OnlineQuranServer/api/tutor/GetStudentCurrentEnrollments?student_id=${localStorage.getItem("id")}`)
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
            <th>Start Date</th>
            <th>Finish Date</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, idx) => (
            <tr key={idx}>
              <td>{slot.CourseName}</td>
              <td>{slot.TeacherName}</td>
              <td>{slot.Day}</td>
              <td>{`${slot.from_time?.substring(0,5)} - ${slot.to_time?.substring(0,5)}`}</td>
              <td>{slot.start_date ? slot.start_date.substring(0, 10) : ""}</td>
              <td>{slot.finish_date ? slot.finish_date.substring(0, 10) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSchedule;
