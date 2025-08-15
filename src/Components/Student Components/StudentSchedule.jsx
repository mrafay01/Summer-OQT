import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Shared/sharedStyles.css";

const StudentSchedule = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [days, setDays] = useState([]);
  const courseId = localStorage.getItem("selected_course_id");

  useEffect(() => {
    axios
      .get(`http://localhost/OnlineQuranServer/api/tutor/GetDummySlots`)
      .then((res) => {
        setSlots(res.data);

        // Dynamically get days from API response keys
        if (res.data.length > 0) {
          const slotKeys = Object.keys(res.data[0]);
          // Filter keys that match day names (Mon, Tue, ...)
          const dayKeys = slotKeys.filter((key) =>
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(key)
          );
          setDays(dayKeys);
        }
      })
      .catch((err) => {
        console.error("Error fetching slots:", err);
      });
  }, []);

  // Handler to toggle checkbox value
  const handleCheckboxChange = (slotIndex, day) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot, idx) =>
        idx === slotIndex ? { ...slot, [day]: !slot[day] } : slot
      )
    );
    console.log("Selected Slots:", slots);
    console.log("Course ID:", courseId);
  };

  // Handler to save and send selected slots to next screen
  const handleSaveChanges = () => {
    localStorage.setItem("selected_slots", JSON.stringify(slots));
    localStorage.setItem("selected_course_id", courseId);

    // Debug logs
    console.log("Saved selected_slots:", slots);
    console.log("Saved selected_course_id:", courseId);

    navigate("/browse-teachers");
  };

  return (
    <div className="student-schedule-container">
      <h2>Weekly Schedule</h2>
      <table className="student-schedule-table">
        <thead>
          <tr>
            <th>Time Slot</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, slotIndex) => (
            <tr key={slotIndex}>
              <td>{slot.timeSlot}</td>
              {days.map((day) => (
                <td key={day}>
                  <input
                    type="checkbox"
                    checked={!!slot[day]}
                    onChange={() => handleCheckboxChange(slotIndex, day)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="submit" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default StudentSchedule;
