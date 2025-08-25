import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const TeacherCourses = () => {
    
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost/OnlineQuranServer/api/tutor/GetTeacherCourses?teacher_id=${sessionStorage.getItem("id")}`)
        .then((response) => {
            console.log(response.data);
            setCourses(response.data);
        })
        .catch((error) => {
            console.error("Error fetching teacher courses:", error);
        });
    }, []);

    const handleCourseClick = (courseId) => {
        const course = courses.find((c) => c.id === courseId);
        sessionStorage.setItem("selected_course_id", courseId);
        sessionStorage.setItem("teacher_id", sessionStorage.getItem("id"));
        sessionStorage.setItem("role", sessionStorage.getItem("role"));
        sessionStorage.setItem("course_name", course.name);
        navigate(`/Teacher/students-by-course`);
    };

    return (
    <div>
        <h1>Teacher Courses</h1> 
        <h3 className='subheading'>Click on the course name to view students</h3>
        <div className='grid'>
            {courses.map((course) => (
                <div className='cards' key={course.id} onClick={() => handleCourseClick(course.id)}>
                    <h3 className='title'>{course.name}</h3>
                </div>  
            ))}
        </div>
    </div>
  )
}

export default TeacherCourses