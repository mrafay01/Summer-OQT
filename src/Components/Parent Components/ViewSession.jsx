import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewSession = () => {
  const [students, setStudents] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsAndSessions = async () => {
      try {
        const parentId = localStorage.getItem("id");
        
        if (!parentId) {
          console.error("Parent ID not found");
          setLoading(false);
          return;
        }

        // Get parent's students
        const studentsResponse = await axios.get(
          `http://localhost/OnlineQuranServer/api/tutor/GetParentStudents`,
          {
            params: {
              parent_id: parseInt(parentId)
            }
          }
        );

        setStudents(studentsResponse.data);
        console.log("Students:", studentsResponse.data);
        console.log("First student structure:", studentsResponse.data[0]);
        console.log("Students type:", typeof studentsResponse.data);
        console.log("Is array:", Array.isArray(studentsResponse.data));

        // Check for active sessions for each student
        const sessions = [];
        for (const student of studentsResponse.data) {
          try {
            const sessionResponse = await axios.get(
              `http://localhost/OnlineQuranServer/api/tutor/CheckAnyStartedSession`,
              {
                params: {
                  studentId: student.id || student
                }
              }
            );

            if (sessionResponse.data) {
              console.log("Session Found for student:", student.id || student, sessionResponse.data);
              sessions.push({
                studentId: student.id || student,
                session: sessionResponse.data
              });
            }
          } catch (err) {
            console.error("Error checking session for student:", student.id || student, err);
            // Log the specific error details for debugging
            if (err.response) {
              console.error("Response status:", err.response.status);
              console.error("Response data:", err.response.data);
            }
          }
        }

        setActiveSessions(sessions);
        setLoading(false);
      } catch (error) {
        console.error("Can't fetch students!", error);
        setLoading(false);
      }
    };

    fetchStudentsAndSessions();
  }, []);

  const handleJoinSession = (sessionData) => {
    if (sessionData) {
      // Store session info and navigate to lesson
      localStorage.setItem("enrollment_slot_id", sessionData.session.EnrollmentSlot_Id);
      localStorage.setItem("session_id", sessionData.session.id);
      localStorage.setItem("user_role", "Parent");
      navigate("/view-quran-lesson-text");
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading Sessions...</h1>
        <p>Please wait while we check for active sessions...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Active Sessions</h1>
      <h3 className="subheading">View and join active Quran sessions</h3>
      
      {students.length === 0 ? (
        <p>No students found</p>
      ) : activeSessions.length === 0 ? (
        <p>No active sessions found for any students</p>
      ) : (
        <div className="grid">
          {activeSessions.map((sessionData, index) => (
            <div key={index} className="cards">
              <h3>Student ID: {sessionData.studentId}</h3>
              <p>Session ID: {sessionData.session.id}</p>
              <p>
                Session Started at:{" "}
                {new Date(sessionData.session.CallStartTime).toLocaleString()}
              </p>

              <button
                className="submit"
                style={{ width: "100%" }}
                onClick={() => handleJoinSession(sessionData)}
              >
                Join Session
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSession;
