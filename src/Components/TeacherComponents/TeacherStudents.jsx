import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TeacherStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost/OnlineQuranServer/api/tutor/GetTeacherCurrentEnrollments?teacher_id=${localStorage.getItem("id")}`)
            .then((response) => {
                const selectedCourseId = Number(localStorage.getItem("selected_course_id"));
                // Filter students whose course_id matches selectedCourseId
                const filteredStudents = response.data.filter(
                    (student) => Number(student.course_id) === selectedCourseId
                );
                setStudents(filteredStudents);
            })
            .catch((error) => {
                console.error("Error fetching teacher courses:", error);
            });
    }, []);

    const handleStudentClick = (studentId) => {
        // Implement your logic here
        console.log("Clicked student:", studentId);
    };

    return (
        <div>
            <h1>Your Students for {localStorage.getItem("course_name")}</h1>
            <h3 className='subheading'>Click on the Student to view their progress and Course lessons</h3>
            <div className='grid'>
                {students.map((student) => (
                    <div className='cards' key={student.student_id} onClick={() => handleStudentClick(student.student_id)}>
                        <h3 className='title'>{student.StudentName}</h3>
                        <p>{student.CourseName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherStudents;