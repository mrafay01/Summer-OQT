import React, { useState, useEffect } from "react";
import axios from "axios";

const QuranText = () => {
  const [lessonData, setLessonData] = useState(null);
  const [selectedAyahId, setSelectedAyahId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const userRole = localStorage.getItem("user_role");
        const enrollmentSlotId = localStorage.getItem("enrollment_slot_id");

        if (!enrollmentSlotId) {
          setError("No enrollment slot ID found");
          setLoading(false);
          return;
        }

        if (userRole === "Teacher") {
          // Teacher starts a new session
          const response = await axios.get(
            `http://localhost/OnlineQuranServer/api/tutor/StartSession`,
            {
              params: {
                enrollment_slot_id: parseInt(enrollmentSlotId),
              },
            }
          );

          console.log("Session started by teacher:", response.data);
          setLessonData(response.data);
        } else if (userRole === "Parent" || userRole === "Student") {
          // Parent or Student joins an existing session
          const sessionId = localStorage.getItem("session_id");
          
          if (!sessionId) {
            setError("No session ID found");
            setLoading(false);
            return;
          }

          const response = await axios.get(
            `http://localhost/OnlineQuranServer/api/tutor/JoinSession`,
            {
              params: {
                sessionId: parseInt(sessionId),
              },
            }
          );

          console.log("Session joined by", userRole + ":", response.data);
          setLessonData(response.data);
        } else {
          setError("Invalid user role");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error initializing session:", err);
        setError("Failed to initialize session");
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  const handleSubmit = () => {
    if (!lessonData || !lessonData[0]?.sessionId) {
      alert("No active session to end");
      return;
    }

    const sessionId = lessonData[0].sessionId;
    const ayatNo = selectedAyahId || 0;

    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/EndSession`,
        {
          params: {
            sessionId: parseInt(sessionId),
            ayatNo: parseInt(ayatNo)
          }
        }
      )
      .then((response) => {
        alert("Session ended successfully!");
        // Clear session data and redirect
        localStorage.removeItem("enrollment_slot_id");
        localStorage.removeItem("session_id");
        localStorage.removeItem("user_role");
        window.location.href = "/dashboard"; // or wherever you want to redirect
      })
      .catch((error) => {
        console.error("Error ending session:", error);
        alert("Failed to end session");
      });
  };

  const handleAyahClick = (ayahId) => {
    console.log(`Ayah ${ayahId} clicked`);
    setSelectedAyahId(ayahId);
  };

  if (loading) {
    return (
      <div className="lesson-container">
        <h1>Initializing Session...</h1>
        <p>Please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lesson-container">
        <h1>Error</h1>
        <p className="error">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h1>Quran Lesson</h1>
        <h3 className="subheading">Session ID: {lessonData?.[0]?.sessionId}</h3>
        <div className="lesson-info">
          <span>Surah {lessonData?.[0]?.surah_id} - Al-Fatiha</span>
          <span>Ruku {lessonData?.[0]?.Ruku_id}</span>
        </div>
      </div>

      {lessonData && lessonData.length > 0 ? (
        <div className="lesson-content">
          {lessonData.map((ayah, index) => (
            <div
              key={index}
              className={`ayah-card ${
                selectedAyahId === ayah.Ayah_id ? "ayah-selected" : ""
              }`}
              onClick={() => handleAyahClick(ayah.Ayah_id)}
            >
              <div className="ayah-number">{ayah.Ayah_id}</div>
              <div className="ayah-content">
                <p className="arabic-text">{ayah.AyahText}</p>
                <div className="ayah-details">
                  <span className="surah-name">Surah {ayah.surah_id}</span>
                  <span className="ruku-name">Ruku {ayah.Ruku_id}</span>
                  <span className="ayah-id">Ayah {ayah.Ayah_id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No lesson content available</p>
      )}
      {localStorage.getItem("user_role") === "Teacher" && <button className="floating-button" onClick={handleSubmit}>
        End Session
      </button>}
    </div>
  );
};

export default QuranText;
