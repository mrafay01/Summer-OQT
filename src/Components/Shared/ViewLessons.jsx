import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewLessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [remainingLessons, setRemainingLessons] = useState([]);
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

        axios.get(`http://localhost/OnlineQuranServer/api/tutor/GetQuranCourseLessonsRemaining`, {
          params: {
            enrollmentId: parseInt(enrollmentId)
          }
        })
        .then(response => {
          console.log("Quran course remaining lessons fetched successfully:", response.data);
          setRemainingLessons(response.data);
        })
        .catch(err => {
          console.error("Error fetching Quran remaining course lessons:", err);
          setError("Failed to fetch lessons");
        })
        .finally(() => {
          setLoading(false);
        });
      } catch (err) {
        console.error("Error fetching Quran course lessons:", err);
        setError("Failed to fetch lessons");
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);


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

      <h3 className="subheading">Remaining Lessons</h3>
      {remainingLessons.length > 0 ? (
        <div className="lessons-grid">
          {remainingLessons.map((remaininglessons, idx) => (
            <div
              key={idx}
              className="lessons-cards"
            >
              <h3>Surah {remaininglessons.SurahName}</h3>
              <p>Lesson: {remaininglessons.SurahNo}</p>
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>No remaining lessons found.</h2>
      )}
    </div>
  );
};

export default ViewLessons;
