import React, { useState, useEffect } from "react";
import axios from "axios";

const HadithText = () => {
  const [lessonData, setLessonData] = useState(null);
  const [selectedHadithId, setSelectedHadithId] = useState(null);
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
    if (!lessonData || !lessonData[0]?.sessonId) {
      alert("No active session to end");
      return;
    }

    const sessionId = lessonData[0].sessonId;
    const hadithNo = selectedHadithId || 0;

    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/EndSession`,
        {
          params: {
            sessionId: parseInt(sessionId),
            ayatNo: parseInt(hadithNo)
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

  const handleHadithClick = (hadithId) => {
    console.log(`Hadith ${hadithId} clicked`);
    setSelectedHadithId(hadithId);
  };

  if (loading) {
    return (
      <div className="hadith-loading">
        Initializing Session...
      </div>
    );
  }

  if (error) {
    return (
      <div className="hadith-container">
        <div className="hadith-header">
          <h1>Error</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!lessonData || lessonData.length === 0) {
    return (
      <div className="hadith-container">
        <div className="hadith-header">
          <h1>No Hadith Found</h1>
          <p>No Hadith lessons available for this session.</p>
        </div>
      </div>
    );
  }

  const topic = lessonData[0]?.TopicName || "Hadith Lesson";

  return (
    <div className="hadith-container">
      <div className="hadith-header">
        <h1>Hadith Lessons</h1>
        <div className="topic-info">Topic: {topic}</div>
        <div className="lesson-info">
          <span>Session ID: {lessonData[0]?.sessonId}</span>
          <span>Book: {lessonData[0]?.book_name}</span>
        </div>
      </div>
      
      <div className="hadith-content">
        {lessonData.map((hadith, index) => (
          <div 
            key={hadith.id} 
            className={`hadith-card ${
              selectedHadithId === hadith.id ? "ayah-selected" : ""
            }`}
            onClick={() => handleHadithClick(hadith.id)}
          >
            <div className="hadith-meta">
              <h3>Reference: </h3>
              <span className="hadith-book">Book: {hadith.book_name}</span>
              <span className="hadith-volume">Volume: {hadith.Volume}</span>
              <span className="hadith-book">Hadith: {hadith.hadith_index}</span>
            </div>
            
            <div className="narrator-text">
              {hadith.narrator}
            </div>
            
            <div className="hadith-text">
              {hadith.hadith_text}
            </div>
          </div>
        ))}
      </div>
      
      {localStorage.getItem("user_role") === "Teacher" && (
        <button className="floating-button" onClick={handleSubmit}>
          End Session
        </button>
      )}
    </div>
  );
};

export default HadithText;
