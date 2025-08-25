import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Shared/sharedStyles.css";

const TeacherSchedule = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost/OnlineQuranServer/api/tutor/GetTeacherSlots?teacher_id=${sessionStorage.getItem("id")}`)
      .then((res) => {
        setSlots(res.data);

        // Dynamically extract day keys from first slot
        if (res.data.length > 0) {
          const excludeKeys = ["timeSlot", "from_time", "to_time", "teacher_id"];
          const days = Object.keys(res.data[0]).filter(
            key => !excludeKeys.includes(key) && typeof res.data[0][key] === "boolean"
          );
          setDaysOfWeek(days);
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
  };

  // Handler to save and send selected slots to next screen
  const handleSaveChanges = async () => {
    try {
      // POST the slots array to your API
      await axios.post(
        "http://localhost/OnlineQuranServer/api/tutor/ManageMultipleSlot",
        slots
      );
      sessionStorage.setItem("selected_slots", JSON.stringify(slots));
      alert("Slots saved successfully!");
    } catch (error) {
      console.error("Error saving slots:", error);
      alert("Failed to save slots. Please try again.");
    }
  };

  return (
    <div className="schedule-container">
      <h2>Weekly Schedule</h2>
      <h3 className="subheading">Select your available time slots</h3>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Time Slot</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, slotIndex) => (
            <tr key={slotIndex}>
              <td>{slot.timeSlot}</td>
              {daysOfWeek.map((day) => (
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

export default TeacherSchedule;
