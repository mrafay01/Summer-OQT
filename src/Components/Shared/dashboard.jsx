import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const dashboard = () => {
  const [selectUser, setSelectUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setSelectUser(userRole ? userRole : "Student");
  }, []);

  // Handles navigation and saves parameters to sessionStorage
  const handleCardClick = (cardIndex) => {
    sessionStorage.setItem("role", selectUser);
    sessionStorage.setItem("username", sessionStorage.getItem("username"));
    sessionStorage.setItem("id", sessionStorage.getItem("id"));

    if (cardIndex === 0) {
      if (selectUser === "Teacher") navigate("/Teacher/Students");
      else navigate("/my-kids");
    } else if (cardIndex === 1) {
      if (selectUser === "Teacher" || selectUser === "Student")
        navigate(`/${selectUser}/schedule`);
      else navigate("/kids-schedule");
    } else if (cardIndex === 2) {
      // All parameters are already in sessionStorage
      if (selectUser === "Teacher") navigate("/Teacher-courses");
      else navigate(`/Student-courses`);
    } else if (cardIndex === 3) {
      if (selectUser === "Student") navigate("/join-session");
      else navigate("/view-session");
    }
  };

  return (
    <div>
      <h1>{selectUser} Dashboard</h1>
      <h3 className="subheading">
        Click on the cards below to navigate
      </h3>
      <div className="grid">
        {selectUser != "Student" ? <div className="cards" onClick={() => handleCardClick(0)}>
          <h3 className="title">
             {selectUser === "Teacher" ? "My Students" : "Kids Progress"}
          </h3>
        </div> : ""}
        <div className="cards" onClick={() => handleCardClick(1)}>
          <h3 className="title">
            {selectUser === "Teacher"
              ? "View/Set Schedule"
              : "Kids Schedule"}
          </h3>
        </div>
        {selectUser != "Parent" ? <div className="cards" onClick={() => handleCardClick(2)}>
          <h3 className="title">
             Courses 
          </h3>
        </div>: "" }
        { selectUser != "Teacher" ? <div className="cards" onClick={() => handleCardClick(3)}>
          <h3 className="title">
              View/Join Sessions
          </h3>
        </div> : ""}
      </div>
    </div>
  );
};

export default dashboard;
