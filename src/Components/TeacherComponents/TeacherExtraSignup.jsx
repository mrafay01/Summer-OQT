import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherExtraSignup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [selectCourse, setSelectCourse] = useState([]);
  const courses = [
    "Tajweed Course",
    "Hifz Course",
    "Nazra Course",
    "Qiraat Course",
    "Hadith Course",
  ];

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

  const HandleAddCourses = () => {
    selectCourse.forEach((course) => {
      axios
        .get(
          `http://localhost/OnlineQuranServer/api/tutor/TeacherRegisterCourse?teacherId=${id}&courseId=${course.index}`
        )
        .then((response) => {
          console.log(response.data);
          navigate(`/${role}/Dashboard`, {
            state: { id, name, role, username },
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  const handleCheckboxChange = (event, index) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectCourse((prev) => [...prev, { index, name: value }]);
    } else {
      setSelectCourse((prev) =>
        prev.filter((course) => course.index !== index)
      );
    }
  };

  return (
    <div className="formbox">
      <form className="Signup">
        <h2>Select Courses to Teach</h2>
        <div className="course">
          {courses.map((course, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={course}
                checked={selectCourse.includes(course)}
                onChange={(e) => handleCheckboxChange(e, index)}
              />
              {course.replace(" Course", "")}
            </label>
          ))}
        </div>
        {console.log(selectCourse)}
        <button className="submit" onClick={HandleAddCourses}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default TeacherExtraSignup;
