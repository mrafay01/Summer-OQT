import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HadithBooks = () => {
  const [hadithBooks, setHadithBooks] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const courseId = Number(sessionStorage.getItem("selected_course_id"));
    setCourseId(courseId);
    console.log("Selected at useEffect course ID:", courseId);
    axios
      .get(`http://localhost/OnlineQuranServer/api/tutor/GetHadithBooks`)
      .then((res) => {
        console.log("Hadith books fetched successfully:", res.data);
        setHadithBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching Hadith books:", err);
      });
  }, []);

  const handleBookClick = (bookName) => {
    console.log("Selected after setting Book course ID:", courseId);
    sessionStorage.setItem("selected_course_id", courseId);
    sessionStorage.setItem("selected_book_name", bookName);
    navigate("/view-lessons");
  };

  return (
    <div>
      <h1>Hadith Books</h1>
      <h3 className="subheading">Select Hadith Book to view Lessons</h3>
      <div className="grid">
        {hadithBooks.map((book, idx) => (
          <div key={idx} onClick={() => handleBookClick(book)} className="cards">
            <h3>{book}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HadithBooks;
