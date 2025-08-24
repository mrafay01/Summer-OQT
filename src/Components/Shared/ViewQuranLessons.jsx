import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewQuranLessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [remainingLessons, setRemainingLessons] = useState([]);
  const [inProgressLessons, setInProgressLessons] = useState([]);
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
          `http://localhost/OnlineQuranServer/api/tutor/GetQuranCourseLessonsCompleted`,
          {
            params: {
              enrollmentId: parseInt(enrollmentId),
            },
          }
        );

        const inProgressResponse = await axios.get(
          `http://localhost/OnlineQuranServer/api/tutor/GetQuranCourseLessonWithProgress`,
          {
            params: {
              enrollmentId: parseInt(enrollmentId),
            },
          }
        );

        console.log(
          "Quran course in-progress lessons fetched successfully:",
          inProgressResponse.data
        );
        setInProgressLessons(inProgressResponse.data);

        console.log(
          "Quran course lessons fetched successfully:",
          response.data
        );
        setLessons(response.data);
        setLoading(false);

        axios
          .get(
            `http://localhost/OnlineQuranServer/api/tutor/GetQuranCourseLessonsRemaining`,
            {
              params: {
                enrollmentId: parseInt(enrollmentId),
              },
            }
          )
          .then((response) => {
            console.log(
              "Quran course remaining lessons fetched successfully:",
              response.data
            );
            setRemainingLessons(response.data);
          })
          .catch((err) => {
            console.error(
              "Error fetching Quran remaining course lessons:",
              err
            );
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

  const handleLessonClick = (lesson) => {
    localStorage.setItem("ruku_id", lesson.RukuNo);
    localStorage.setItem("surah_id", lesson.SurahNo);
    navigate(`/view-quran-text`);
  };

  return (
    <div>
      <h1>{localStorage.getItem("selected_course_name")} Lessons</h1>
      <h3 className="subheading">Completed Lessons</h3>

      {lessons.length > 0 ? (
        <div className="lessons-grid">
          {lessons.map((lesson, idx) => (
            <div
              key={idx}
              className="lessons-cards"
              onClick={() => handleLessonClick(lesson)}
            >
              <h3>Surah: {lesson.SurahName}</h3>
              <p>Ruku: {lesson.RukuNo}</p>
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>No completed lessons found.</h2>
      )}

      {inProgressLessons.length > 0 ? (
        <>
          <h3 className="subheading">In-Progress Lessons</h3>
          <div className="lessons-grid">
            {inProgressLessons.map((lesson, idx) => (
              <div
                key={idx}
                className="lessons-cards"
                onClick={() => handleLessonClick(lesson)}
              >
                <h3>Surah: {lesson.SurahName}</h3>
                <p>Ruku: {lesson.RukuNo}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      <h3 className="subheading">Remaining Lessons</h3>
      {remainingLessons.length > 0 ? (
        <div className="lessons-grid">
          {remainingLessons.map((remaininglesson, idx) => (
            <div
              key={idx}
              className="lessons-cards"
              onClick={() => handleLessonClick(remaininglesson)}
            >
              <h3>Surah {remaininglesson.SurahName}</h3>
              <p>Ruku: {remaininglesson.RukuNo}</p>
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>No remaining lessons found.</h2>
      )}
    </div>
  );
};

export default ViewQuranLessons;
