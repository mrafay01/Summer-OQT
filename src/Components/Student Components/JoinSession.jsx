import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinSession = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const studentId = localStorage.getItem("id");

        const response = await axios.get(
          `http://localhost/OnlineQuranServer/api/tutor/CheckAnyStartedSession`,
          {
            params: {
              studentId: parseInt(studentId),
            },
          }
        );

        console.log("Session data:", response.data);
        setSession(response.data);
      } catch (err) {
        console.error("Error fetching session:", err);
        setSession(null);
      }
    };

    checkSession();
  }, []);

  const handleJoinSession = () => {
    if (session) {
      // Store session info and navigate to lesson
      localStorage.setItem("enrollment_slot_id", session.EnrollmentSlot_Id);
      localStorage.setItem("session_id", session.id);
      localStorage.setItem("user_role", "Student");
      if(session.isHadith)
        navigate("/view-hadith-lesson-text")
      else
        navigate("/view-quran-lesson-text");
    }
  };

  return (
    <div>
      <h1>Join Session</h1>
      {session ? (
        <div className="cards">
          <h3>Session ID: {session.id}</h3>
          <p>
            Session Started at:{" "}
            {new Date(session.CallStartTime).toTimeString().split(" ")[0]}
          </p>

          <button
            className="submit"
            style={{ width: "20%" }}
            onClick={handleJoinSession}
          >
            Join Session
          </button>
        </div>
      ) : (
        <p>No active session found</p>
      )}
    </div>
  );
};

export default JoinSession;
