import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const FilteredTeachers = () => {
  const [groupedTeachers, setGroupedTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const course_id = localStorage.getItem("selected_course_id");
    const student_id = localStorage.getItem("student_id");
    const selected_slots = JSON.parse(localStorage.getItem("selected_slots"));

    // Collect all selected slot/day combinations
    let slotRequests = [];
    if (selected_slots && selected_slots.length > 0) {
      selected_slots.forEach(slot => {
        Object.keys(slot).forEach(key => {
          if (
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(key) &&
            slot[key]
          ) {
            slotRequests.push({
              from_time: slot.from_time,
              to_time: slot.to_time,
              day: key
            });
          }
        });
      });
    }

    if (course_id && student_id && slotRequests.length > 0) {
      Promise.all(
        slotRequests.map(req =>
          axios.get(
            `http://localhost/OnlineQuranServer/api/tutor/SearchTeacherMultipleSlots?course_id=${course_id}&student_id=${student_id}&from_time=${req.from_time}&to_time=${req.to_time}&day=${req.day}`
          )
        )
      )
        .then(responses => {
          const allTeachers = responses.flatMap(res => res.data);

          // Group by teacher name (and teacher_id for uniqueness)
          const grouped = {};
          allTeachers.forEach(teacher => {
            const key = `${teacher.teacher_id}_${teacher.name}`;
            if (!grouped[key]) {
              grouped[key] = {
                name: teacher.name,
                teacher_id: teacher.teacher_id,
                ratings: teacher.ratings,
                slots: []
              };
            }
            grouped[key].slots.push({
              from_time: teacher.from_time,
              to_time: teacher.to_time,
              day: teacher.day,
              id: teacher.id
            });
          });

          setGroupedTeachers(Object.values(grouped));
        })
        .catch(error => {
          console.error("Error fetching teachers:", error);
        });
    }
  }, []);

  const HandleHireTeacher = (teacher) => {
    // Gather all slot ids for this teacher
    const slotids = teacher.slots.map(slot => slot.id);

    console.log(slotids, localStorage.getItem("student_id"), localStorage.getItem("selected_course_id"), teacher.teacher_id);

    const params = new URLSearchParams();
    slotids.forEach(id => params.append('slotids', id));
    params.append('student_id', localStorage.getItem("student_id"));
    params.append('course_id', localStorage.getItem("selected_course_id"));
    params.append('teacher_id', teacher.teacher_id);

    axios.get(
      `http://localhost/OnlineQuranServer/api/tutor/EnrollMultipleSlotsCourse?${params.toString()}`
    )
      .then((response) => {
        alert("Teacher hired successfully!");
        console.log("Teacher hired successfully:", response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.Message || "Error hiring teacher!");
        } else {
          alert("Error hiring teacher!");
        }
      });
  };

  return (
    <div>
      <h1>Filtered Teachers</h1>
      <h3 className="subheading">Click on a teacher to hire</h3>
      <div className="grid">
        {groupedTeachers.length === 0 && <p>No teachers found for selected slots.</p>}
        {groupedTeachers.map((teacher) => (
          <div className="cards" key={teacher.teacher_id} onClick={() => { HandleHireTeacher(teacher); }}>
            <div className="title">{teacher.name}</div>
            <div>
              <strong>Ratings:</strong> {teacher.ratings}
            </div>
            <div>
              <strong>Slots:</strong>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {teacher.slots.map((slot, idx) => (
                  <li key={idx}>
                    <span>
                      <strong>Day:</strong> {slot.day} &nbsp;
                      <strong>Time:</strong> {slot.from_time} - {slot.to_time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredTeachers;