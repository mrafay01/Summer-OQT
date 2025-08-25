import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const FilteredTeachers = () => {
  const [groupedTeachers, setGroupedTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilteredTeachers = async () => {
      try {
        const course_id = sessionStorage.getItem("selected_course_id");
        const student_id = sessionStorage.getItem("student_id");
        const selected_slots = JSON.parse(sessionStorage.getItem("selected_slots"));

        // Transform selected_slots data to match API format
        const from_time = [];
        const to_time = [];
        const day = [];

        selected_slots.forEach(slot => {
          // console.log("Selected Slots:", selected_slots);
          Object.keys(slot).forEach(dayKey => {
            if (dayKey !== 'timeSlot' && slot[dayKey] === true) {
              
              const timeParts = slot.timeSlot.split('-');
              if (timeParts.length === 2) {
                from_time.push(timeParts[0].trim());
                to_time.push(timeParts[1].trim());
                day.push(dayKey);
              }
            }
          });
        });

        // Prepare payload for API call
        const payload = {
          course_id: parseInt(course_id),
          student_id: parseInt(student_id),
          from_time: from_time,
          to_time: to_time,
          day: day
        };

        console.log("API Payload:", payload);

        // Make API call
        const response = await axios.post(
          'http://localhost/OnlineQuranServer/api/tutor/SearchTeacherMultipleSlots',
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("API Response:", response.data);
        setGroupedTeachers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching filtered teachers:", err);
        setError("Failed to fetch teachers. Please try again.");
        setLoading(false);
      }
    };

    fetchFilteredTeachers();
  }, []);

  const handleTeacherSelect = async (teacher) => {
    try {
      const student_id = sessionStorage.getItem("student_id");
      const course_id = sessionStorage.getItem("selected_course_id");
      
      // Get slot IDs from the teacher data
      const slotIds = teacher.id || [];
      
      // Call the enrollment API
      const response = await axios.get(
        `http://localhost/OnlineQuranServer/api/tutor/EnrollMultipleSlotsCourse`,
        {
          params: {
            slotids: slotIds,
            student_id: parseInt(student_id),
            course_id: parseInt(course_id),
            teacher_id: teacher.teacher_id
          }
        }
      );
      
      console.log("Enrollment successful:", response.data);
      alert("Successfully enrolled with teacher!");
      
    } catch (error) {
      console.error("Enrollment failed:", error);
      if (error.response?.status === 400 && error.response.data === "Already Enrolled") {
        alert("You are already enrolled with this teacher for this course.");
      } else {
        alert("Failed to enroll. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Filtered Teachers</h1>
        <p>Loading available teachers...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Filtered Teachers</h1>
      <h3 className="subheading">Click on a teacher to hire</h3>
      <div className="grid">
        {groupedTeachers && groupedTeachers.length > 0 ? (
          groupedTeachers.map((teacher, index) => (
            <div 
              key={index} 
              className="cards"
              onClick={() => handleTeacherSelect(teacher)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{teacher.name}</h3>
              <p><strong>Rating:</strong> {teacher.ratings || 'N/A'}</p>
              <p><strong>Available Slots:</strong></p>
              <span>
                {teacher.day && teacher.day.map((day, i) => (
                  <p key={i}>
                    {day} - {teacher.from_time[i].substring(0, 5)} to {teacher.to_time[i].substring(0, 5)}
                  </p>
                ))}
              </span>
            </div>
          ))
        ) : (
          <p>No teachers found for selected slots.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredTeachers;