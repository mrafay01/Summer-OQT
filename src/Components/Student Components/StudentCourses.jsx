import React, {useState, useEffect, use} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const StudentCourses = () => {
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    axios.get(`http://localhost/OnlineQuranServer/api/tutor/GetStudentCurrentEnrollments?student_id=${localStorage.getItem("student_id")}`)
    .then(response => {
        const uniqueCourses = response.data.filter((course, index, self) =>
            index === self.findIndex((t) => (
                t.course_id === course.course_id
            ))
        );
        console.log(uniqueCourses);
        setData(uniqueCourses);
    })
    .catch(error => {
        console.log(error.response.data)
    })
  }, [])

  const handleCardClick = (course) => {
    localStorage.setItem("enrollment_id", course.enrollment_id);
    localStorage.setItem("course_id", course.course_id);
    if(course.course_id == 5)
      navigate(`/view-hadith-lessons`);
    else
      navigate(`/view-quran-lessons`);
  };

    return (
    <div>
        <h1>Student Enrolled Courses</h1>
        <h3 className='subheading'>Click on a course to view lessons</h3>
        <div className="grid">
            {
                data.length > 0 ? data.map((course, idx) => (
                    <div key={idx} className="cards" onClick={() => handleCardClick(course)}>
                        <h3>{course.CourseName}</h3>
                        <p>By Teacher: <i>{course.TeacherName}</i></p>
                    </div>
                )) : <p>No courses found</p>
            }
        </div>
    </div>
  )
}

export default StudentCourses
