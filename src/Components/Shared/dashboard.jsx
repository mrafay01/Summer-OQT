import React, { useState, useEffect } from "react";

const dashboard = () => {
  const [id, setId] = useState(0);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getrole = localStorage.getItem("role");
    if (getrole) {
      setRole(getrole);
    }
    const getname = localStorage.getItem("name");
    if (getname) {
      setName(getname);
    }
    const getusername = localStorage.getItem("username");
    if (getusername) {
      setUsername(getusername);
    }
    const getid = Number(localStorage.getItem("id"));
    if (getid) {
      setId(getid);
    }
  }, []);


  return (
    <div>
      <h1>{name} Dashboard</h1>
      <div className="grid">
        <div className="cards">
          <h3 className="title">
            {role === "Teacher"
              ? "My Students"
              : role === "Student"
              ? "Browse Teachers"
              : "My Kids"}
          </h3>
        </div>
        <div className="cards">
          <h3 className="title">
            {role === "Teacher" || role === "Student"
              ? "View/Set Schedule"
              : "View Schedule"}
          </h3>
        </div>
        <div className="cards">
          <h3 className="title">
            {role === "Parent" ? "Kid's " : ""}Courses
          </h3>
        </div>
        <div className="cards">
          <h3 className="title">
            {role === "Teacher"
              ? "Start Class"
              : role === "Student"
              ? "Join Class"
              : "View Class"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
