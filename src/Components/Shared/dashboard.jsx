import React, {useState, useEffect} from 'react'

const dashboard = () => {
    const [selectUser, setSelectUser] = useState('');

  return (
    <div>
        <h1>{selectUser} Dashboard</h1>
        <div className="grid">
            <div className="cards">
                <h3 className="title">{ selectUser === "Teacher"? "My Students" : selectUser === "Student"? "Browse Teachers" : ""}</h3>
            </div>
            <div className="cards">
                <h3 className="title">{ selectUser === "Teacher" || "Student" ? "View/Set Schedule" : "View Schedule"}</h3>
            </div>
            <div className="cards">
                <h3 className="title">{ selectUser === "Parent" ? "Kid's ":""}Courses</h3>
            </div>
            <div className="cards">
                <h3 className="title">{ selectUser === "Teacher" ? "Start Class" : selectUser === "Student" ? "Join Class" : "View Class"}</h3>
            </div>
        </div>
    </div>
  )
}

export default dashboard;
