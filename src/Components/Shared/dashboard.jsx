import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const dashboard = () => {
  const [selectUser, setSelectUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setSelectUser(userRole ? userRole : "Student");
  }, []);

  // Handles navigation and saves parameters to localStorage
  const handleCardClick = (cardIndex) => {
    localStorage.setItem("role", selectUser);
    localStorage.setItem("username", localStorage.getItem("username"));
    localStorage.setItem("id", localStorage.getItem("id"));

    if (cardIndex === 0) {
      if (selectUser === "Teacher") navigate("/my-students");
      else if (selectUser === "Student") navigate("/browse-teachers");
      else navigate("/my-kids");
    } else if (cardIndex === 1) {
      if (selectUser === "Teacher" || selectUser === "Student")
        navigate(`/${selectUser}/schedule`);
      else navigate("/kids-schedule");
    } else if (cardIndex === 2) {
      // All parameters are already in localStorage
      if (selectUser === "Parent") navigate("/Kids-courses");
      if (selectUser === "Teacher") navigate("/Teacher-courses");
      else navigate(`/Student-courses`);
    } else if (cardIndex === 3) {
      if (selectUser === "Teacher") navigate("/start-class");
      else if (selectUser === "Student") navigate("/join-class");
      else navigate("/view-class");
    }
  };

  return (
    <div>
      <h1>{selectUser} Dashboard</h1>
      <h3 className="subheading">
        Click on the cards below to navigate
      </h3>
      <div className="grid">
        <div className="cards" onClick={() => handleCardClick(0)}>
          <h3 className="title">
            {selectUser === "Teacher"
              ? "My Students"
              : selectUser === "Student"
              ? "Your Progress"
              : "My Kids"}
          </h3>
        </div>
        <div className="cards" onClick={() => handleCardClick(1)}>
          <h3 className="title">
            {selectUser === "Teacher"
              ? "View/Set Schedule"
              : "View Schedule"}
          </h3>
        </div>
        <div className="cards" onClick={() => handleCardClick(2)}>
          <h3 className="title">
            {selectUser === "Parent" ? "Kid's " : ""}Courses
          </h3>
        </div>
        <div className="cards" onClick={() => handleCardClick(3)}>
          <h3 className="title">
            {selectUser === "Teacher"
              ? "Start Class"
              : selectUser === "Student"
              ? "Join Class"
              : "View Class"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
