import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewLessons = () => {
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState(0);
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    const courseId = Number(localStorage.getItem("selected_course_id"));
    setCourseId(courseId);
    console.log("Selected course ID:", courseId);
    if (courseId == 5) {
      axios
        .get(
          `http://localhost/OnlineQuranServer/api/tutor/GetHadithBookLesson?book_name=${localStorage.getItem(
            "selected_book_name"
          )}`
        )
        .then((res) => {
          console.log("Hadith book lessons fetched successfully:", res.data);
          setLessons(res.data);
        })
        .catch((err) => {
          console.error("Error fetching Hadith book lessons:", err);
        });
    } else {
      axios
        .get(
          `http://localhost/OnlineQuranServer/api/tutor/GetQuranCourseLesson?course_id=${courseId}`
        )
        .then((res) => {
          console.log("Quran course lessons fetched successfully:", res.data);
          setLessons(res.data);
        })
        .catch((err) => {
          console.error("Error fetching Quran course lessons:", err);
        });
    }
  }, []);

  const HandleQuranLesson = (lesson) => {

    localStorage.setItem("selected_Ruku_No", lesson.RukuNo);
    localStorage.setItem("selected_Surah_No", lesson.SurahNo);
    navigate("/view-quran-lesson-text");
  };

  return (
    <div>
      {courseId == 5 ? (
        <h1>{localStorage.getItem("selected_book_name")} Lessons</h1>
      ) : (
        <h1>{localStorage.getItem("selected_course_name")} Lessons</h1>
      )}
      <h3 className="subheading">Select a lesson to view its Content</h3>
      {courseId != 5 ? <div className="lessons-grid">
        {lessons.map((lesson, idx) => (
          <div key={idx} onClick={() => HandleQuranLesson(lesson)} className="lessons-cards">
            <h3>{lesson.SurahName}</h3>
            <p>Ruku No: {lesson.RukuNo}</p>
          </div>
        ))}
      </div>:
      <div className="lessons-grid">
        {lessons.map((lesson, idx) => (
          <div key={idx} className="lessons-cards">
            <h3>{lesson.BookName}</h3>
            <p>Chapter No: {lesson.ChapterNo}</p>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default ViewLessons;
