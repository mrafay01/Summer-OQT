import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./sharedStyles.css";

const loginsignup = () => {
  const navigate = useNavigate();
  const [selectAction, setSelectAction] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    dob: "",
    hourlyRate: 0,
    timeZone: 0,
    password: "",
    gender: "",
    cnic: "",
  });

  const HandleLogin = () => {
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/UserLogin?userName=${username}&password=${password}`
      )
      .then((response) => {
        const data = response.data;
        if (CheckLogin(response.data)) {
          localStorage.setItem("id", data.id);
          localStorage.setItem("username", data.username);
          localStorage.setItem("name", data.name);
          localStorage.setItem("role", selectUser);
          navigate(`/${selectUser}/${username}/dashboard`);
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  function CheckLogin(data) {
    if (selectUser === "Teacher" && data.type === "T") {
      alert("Successfully Logged in!");
      return true;
    } else if (selectUser === "Parent" && data.type === "P") {
      alert("Successfully Logged in!");
      return true;
    } else if (selectUser === "Student" && data.type === "S") {
      alert("Successfully Logged in!");
      return true;
    } else {
      alert("User Not found!");
      return false;
    }
  };

  const HandleSignup = () => {
    let payload = {};

    if (selectUser === "Teacher") {
      payload = signupData;
    }

    if (selectUser === "Student") {
      payload = {
        name: signupData.name,
        cnic: signupData.cnic,
        username: signupData.username,
        password: signupData.password,
        dob: signupData.dob,
        timeZone: signupData.timeZone,
        gender: signupData.gender,
      };
    }

    if (selectUser === "Parent") {
      payload = {
        name: signupData.name,
        cnic: signupData.cnic,
        username: signupData.username,
        password: signupData.password,
        dob: signupData.dob,
        timeZone: signupData.timeZone,
        gender: signupData.gender,
      };
    }

    console.log(payload);

    axios
      .post(
        `http://localhost/OnlineQuranServer/api/tutor/Register${selectUser}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", selectUser);
        if (selectUser !== "Teacher") navigate(`/${selectUser}/${username}/dashboard`);
        else navigate(`/teacherextrasignup`);
      })
      .catch((response) => {
        console.log(response.data);
      });
  };

  const handleChangeAction = (value) => {
    setSelectAction(value);
    console.log(value);
  };

  const handleChangeUser = (value) => {
    setSelectUser(value);
    console.log(value);
  };

  const handleChangeGender = (event) => {
    setSelectGender(event.target.value);
  };

  return (
    <>
      <div className="user">
        <button className="user" onClick={() => handleChangeUser("Student")}>
          Student
        </button>
        <button className="user" onClick={() => handleChangeUser("Parent")}>
          Parent
        </button>
        <button className="user" onClick={() => handleChangeUser("Teacher")}>
          Teacher
        </button>
      </div>
      {selectUser && (
        <div className="action">
          <button
            className="loginsignup"
            onClick={() => handleChangeAction("Login")}
          >
            Login
          </button>
          <button
            className="loginsignup"
            onClick={() => handleChangeAction("Signup")}
          >
            Signup
          </button>
        </div>
      )}
      {selectAction && (
        <div className="formbox">
          <h2>
            {selectAction} as {selectUser}
          </h2>
          {selectAction === "Login" ? (
            <form
              action=""
              className="login"
              onSubmit={(e) => {
                e.preventDefault();
                HandleLogin();
              }}
            >
              <div className="username">
                <input
                  required
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="password">
                <input
                  required
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="submit" type="submit">
                {selectAction}
              </button>
            </form>
          ) : selectAction === "Signup" ? (
            <form action="" className="signup">
              <div className="name">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setSignupData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="DOB">
                <input
                  type="date"
                  placeholder="Date of Birth"
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      dob: Date(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="timezone">
                <input
                  type="number"
                  placeholder="Time Zone"
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      timeZone: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="cnic">
                <input
                  type="text"
                  placeholder="CNIC"
                  onChange={(e) =>
                    setSignupData((prev) => ({ ...prev, cnic: e.target.value }))
                  }
                />
              </div>
              <div
                className="gender"
                onChange={(e) =>
                  setSignupData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <select value={selectGender} onChange={handleChangeGender}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              {selectUser == "Teacher" && (
                <div
                  className="hourlyrate"
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      hourlyRate: Number(e.target.value),
                    }))
                  }
                >
                  <input type="number" placeholder="Hourly Rate" />
                </div>
              )}
              <div className="username">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <button className="submit" onClick={HandleSignup}>
                {selectAction}
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default loginsignup;
