import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewHadithLessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [remainingLessons, setRemainingLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const enrollmentId = sessionStorage.getItem("enrollment_id");

        if (!enrollmentId) {
          setError("No enrollment ID found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost/OnlineQuranServer/api/tutor/GetHadithCourseLessonsCompleted`,
          {
            params: {
              enrollmentId: parseInt(enrollmentId),
            },
          }
        );

        console.log(
          "Hadith course lessons fetched successfully:",
          response.data
        );
        setLessons(response.data);
        setLoading(false);

        axios
          .get(
            `http://localhost/OnlineQuranServer/api/tutor/GetHadithCourseLessonsRemaining`,
            {
              params: {
                enrollmentId: parseInt(enrollmentId),
              },
            }
          )
          .then((response) => {
            console.log(
              "Hadith course remaining lessons fetched successfully:",
              response.data
            );
            setRemainingLessons(response.data);
          })
          .catch((err) => {
            console.error(
              "Error fetching Hadith remaining course lessons:",
              err
            );
            setError("Failed to fetch lessons");
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        console.error("Error fetching Hadith course lessons:", err);
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

  const handleLessonClick = (topic) => {
    sessionStorage.setItem("Topic", topic);
    navigate(`/view-hadith-text`);
  };

  return (
    <div>
      <h1>{sessionStorage.getItem("selected_course_name")} Completed Lessons</h1>
      <h3 className="subheading">Select a lesson to view its content</h3>

      {lessons.length > 0 ? (
        <div className="lessons-grid">
          {lessons.map((group, idx) => (
            group && group.length > 0 ? (
              <div key={idx} className="lessons-cards" onClick={() => handleLessonClick(group[0].TopicName)}>
                <h4>Book: {group[0].book_name}</h4>
                <p>Topic: {group[0].TopicName}</p>
              </div>
            ) : null
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>No completed lessons found.</h2>
      )}

      <h3 className="subheading">Remaining Lessons</h3>
      {remainingLessons.length > 0 ? (
        <div className="lessons-grid">
          {remainingLessons.map((group, idx) =>
            group && group.length > 0 ? (
              <div key={idx} className="lessons-cards" onClick={() => handleLessonClick(group[0].TopicName)}>
                <h4>Book: {group[0].book_name}</h4>
                <p>Topic: {group[0].TopicName}</p>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>No remaining lessons found.</h2>
      )}
    </div>
  );
};

export default ViewHadithLessons;
