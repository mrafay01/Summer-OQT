import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const FilteredTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const course_id = localStorage.getItem("selected_course_id");
    const student_id = localStorage.getItem("student_id");
    const selected_slots = JSON.parse(localStorage.getItem("selected_slots"));

    // Debug logs
    console.log("Received course_id:", course_id);
    console.log("Received student_id:", student_id);
    console.log("Received selected_slots:", selected_slots);

    // Find the first selected slot and day
    let from_time = "";
    let to_time = "";
    let day = "";

    // Find the first slot and day that is selected (true)
    if (selected_slots && selected_slots.length > 0) {
      for (let slot of selected_slots) {
        for (let key of Object.keys(slot)) {
          if (
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(key) &&
            slot[key]
          ) {
            from_time = slot.from_time;
            to_time = slot.to_time;
            day = key;
            break;
          }
        }
        if (day) break;
      }
    }

    // Only call API if all parameters are available
    if (course_id && student_id && from_time && to_time && day) {
      axios
        .get(
          `http://localhost/OnlineQuranServer/api/tutor/SearchTeacherSlots?course_id=${course_id}&student_id=${student_id}&from_time=${from_time}&to_time=${to_time}&day=${day}`
        )
        .then((response) => {
          setTeachers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching teachers:", error);
        });
    }
  }, []);

  const HandleHireTeacher = (teacher) => {
    localStorage.setItem("selected_teacher", JSON.stringify(teacher));
    
    alert("Teacher hired successfully!");
    // Navigate to the next screen or perform any other action
    navigate(`/${localStorage.getItem("role")}/dashboard`);
};

  return (
    <div>
      <h1>Filtered Teachers</h1>
      <div className="grid">
        {teachers.length === 0 && <p>No teachers found for selected slot.</p>}
        {teachers.map((teacher) => (
          <div className="cards" key={teacher.id} onClick={HandleHireTeacher}>
            <div className="title">{teacher.name}</div>
            <div>
              <strong>Day:</strong> {teacher.day}
            </div>
            <div>
              <strong>Time:</strong> {teacher.from_time} - {teacher.to_time}
            </div>
            <div>
              <strong>Ratings:</strong> {teacher.ratings}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredTeachers;