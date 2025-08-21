import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewLessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const enrollmentId = localStorage.getItem("enrollment_id");
        
        if (!enrollmentId) {
          setError("No enrollment ID found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost/OnlineQuranServer/api/tutor/GetStudentProgress`,
          {
            params: {
              enrollment_id: parseInt(enrollmentId)
            }
          }
        );

        console.log("Quran course lessons fetched successfully:", response.data);
        setLessons(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Quran course lessons:", err);
        setError("Failed to fetch lessons");
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const HandleQuranLesson = (lesson) => {
    // Store lesson information and navigate to lesson view
    localStorage.setItem("selected_lesson_id", lesson.QuranLessonId);
    localStorage.setItem("selected_lesson_status", lesson.Status);
    localStorage.setItem("selected_enrollment_slot_id", lesson.EnrollmentSlotId);
    
    // Navigate to lesson view (you can customize this route)
    navigate("/lesson-details");
  };

  if (loading) {
    return (
      <div>
        <h1>Loading Lessons...</h1>
        <p>Please wait while we fetch your completed lessons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p className="error">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{localStorage.getItem("selected_course_name")} Completed Lessons</h1>
      <h3 className="subheading">Select a lesson to view its content</h3>

      {lessons.length > 0 ? (
        <div className="lessons-grid">
          {lessons.map((lesson, idx) => (
            <div
              key={idx}
              onClick={() => HandleQuranLesson(lesson)}
              className="lessons-cards"
            >
              <h3>Lesson {idx + 1}</h3>
              <p><strong>Status:</strong> {lesson.Status}</p>
              <p><strong>Started:</strong> {new Date(lesson.CallStartTime).toLocaleDateString()}</p>
              {lesson.CallEndTime && (
                <p><strong>Completed:</strong> {new Date(lesson.CallEndTime).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>No completed lessons found.</h2>
      )}
    </div>
  );
};

export default ViewLessons;
