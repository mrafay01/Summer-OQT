import React, { useState, useEffect } from 'react';
import axios from "axios"
import './sharedStyles.css'

const loginsignup = () => {
    const [selectCourse, setSelectCourse] = useState('-- Select Course --'); 
    const [selectAction, setSelectAction] = useState('');
    const [selectUser, setSelectUser] = useState('');
    const [selectGender, setSelectGender] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [apiUser, setApiUser] = useState('');
    const [signupData, setSignupData] = useState({
        name: "",
        username: "",
        dob: "",
        hourlyRate: 0,
        timeZone: 0,
        course: [],
        password: "",
        gender: '',
        cnic: "" 
    });


    const HandleLogin = ()=>{
        axios.get(`http://localhost/OnlineQuranServer/api/tutor/UserLogin?userName=${username}&password=${password}`)
        .then(response => {
            localStorage.setItem("username", username);
            localStorage.setItem("name", JSON.stringify(response.data.name));
            localStorage.setItem("role", selectUser);
            navigate(`/${selectUser}/dashboard`);
        })
        .catch(response=> {console.log(response.data);})
    };

    const CheckLogin = (data)=>{
        if (selectUser === "Teacher" && data.type == 'T')
            {
                setApiUser(data);
                console.log("Successful")
            }
        else if (selectUser === "Parent" && data.type == 'P')
            {
                setApiUser(data);
                console.log("Successful")
            }
        else if (selectUser === "Student" && data.type == 'S')
            {
                setApiUser(data);
                console.log("Successful")
            }
        else{
            console.log("User Not found!")
        }
    }    

    const HandleSignup = ()=>{

        let payload = {}

        if (selectUser==="Teacher"){
            payload = signupData;
        }

        if (selectUser==="Student"){
            payload = {
                name : signupData.name,
                cnic : signupData.cnic,
                username : signupData.username,
                password : signupData.password,
                dob : signupData.dob,
                timeZone : signupData.timeZone,
                course : signupData.course,
                gender : signupData.gender
            };
        }

        if (selectUser==="Parent"){
            payload = {
                name : signupData.name,
                cnic : signupData.cnic,
                username : signupData.username,
                password : signupData.password,
                dob : signupData.dob,
                timeZone : signupData.timeZone,
                gender : signupData.gender
            };
        }

        console.log(payload)

        axios.post(
        `http://localhost/OnlineQuranServer/api/tutor/Register${selectUser}`,
        payload,
        { headers: { "Content-Type": "application/json" }})
        .then(response => 
        {
            localStorage.setItem("username", JSON.stringify(response.data.username));
            localStorage.setItem("name", JSON.stringify(response.data.name));
            localStorage.setItem("role", selectUser);
            navigate(`/${selectUser}/dashboard`);
        }
        )
        .catch(response=> {console.log(response.data);})
    };

    const handleChangeCourse = (event) => {
        setSelectCourse(event.target.value);
    };

    const handleChangeAction = (value) => {
        setSelectAction(value);
    };

    const handleChangeUser = (value) => {
        setSelectUser(value);
    };

    const handleChangeGender = (event) => {
        setSelectGender(event.target.value);
    };  
  
  return (
    <>
        <div className="user">
            <button className="user" onClick={()=>handleChangeUser('Student')}>Student</button>
            <button className="user" onClick={()=>handleChangeUser('Parent')}>Parent</button>
            <button className="user" onClick={()=>handleChangeUser('Teacher')}>Teacher</button>
        </div>
        { selectUser && <div className="action">
            <button className="loginsignup" onClick={()=>handleChangeAction('Login')}>Login</button>
            <button className="loginsignup" onClick={()=>handleChangeAction('Signup')}>Signup</button>
        </div>}
        { selectAction && <div className="formbox">
            <h2>{selectAction} as {selectUser}</h2>
            {selectAction==="Login"? <form action="" className="login">
                <div className="username">
                    <input required type="text" placeholder='Username' onChange={(e)=> setUsername(e.target.value)} />
                </div>
                <div className="password">
                    <input required type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
                </div>
            </form>: selectAction==="Signup"?

            <form action="" className="signup">
                <div className="name">
                    <input type="text" placeholder='Name' onChange={(e)=>setSignupData(prev=>({...prev, name: e.target.value}))} />
                </div>
                <div className="DOB">
                    <input type="date" placeholder='Date of Birth' onChange={(e)=>setSignupData(prev=>({...prev, dob: Date(e.target.value)}))}/>
                </div>
                <div className="timezone">
                    <input type="number" placeholder='Time Zone' onChange={(e)=>setSignupData(prev=>({...prev, timeZone: Number(e.target.value)}))}/>
                </div>
                { selectUser != "Parent" && <div multiple value={signupData.course} className="course" onChange={(e) => {
                    const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);
                    setSignupData(prev => ({...prev,
                    course: selectedCourses
                    }));
                    }}>
                    <select
                        value={selectCourse}
                        onChange={handleChangeCourse}
                        >
                        <option value="Tajweed Course">Tajweed</option>
                        <option value="Hifz Course">Hifz</option>
                        <option value="Nazra Course">Nazra</option>
                        <option value="Qiraat Course">Qiraat</option>
                        <option value="Hadith Course">Hadith</option>
                    </select>
                </div>}
                <div className="cnic">
                    <input type="text" placeholder='CNIC' onChange={(e)=>setSignupData(prev=>({...prev, cnic: e.target.value}))} />
                </div>
                <div className="gender" onChange={(e)=>setSignupData(prev=>({...prev, gender: e.target.value}))} >
                    <select
                        value={selectGender}
                        onChange={handleChangeGender}
                        >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                {selectUser == "Teacher" && <div className="hourlyrate" onChange={(e)=>setSignupData(prev=>({...prev, hourlyRate: Number(e.target.value)}))} >
                    <input type="number" placeholder='Hourly Rate' />
                </div>}
                <div className="username"> 
                    <input type="text" placeholder='Username' onChange={(e)=>setSignupData(prev=>({...prev, username: e.target.value}))}/>
                </div>
                <div className="password">
                    <input type="password" placeholder='Password' onChange={(e)=>setSignupData(prev=>({...prev, password: e.target.value}))} />
                </div>
            </form> : ""}
            <button className="submit" onClick={selectAction == "Login" ? HandleLogin : HandleSignup}>{selectAction}</button>
        </div>}
    </>
  );
};

export default loginsignup;