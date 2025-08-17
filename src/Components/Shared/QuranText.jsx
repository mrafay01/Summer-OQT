import axios from "axios";
import React, { useState, useEffect } from "react";

const QuranText = () => {
  const [ruku, setRuku] = useState(0);
  const [surahNo, setSurahNo] = useState(0);
  const [lessonData, setLessonData] = useState("");

  useEffect(() => {
    const rukuNo = Number(localStorage.getItem("selected_Ruku_No"));
    const surahno = Number(localStorage.getItem("selected_Surah_No"));
    setRuku(rukuNo);
    setSurahNo(surahno);
    axios
      .get(
        `http://localhost/OnlineQuranServer/api/tutor/GetQuranLessonText?ruku_id=${rukuNo}&surah_id=${surahno}`
      )
      .then((res) => {
        console.log("Lesson Data Fetched Successfully:", res.data);
        setLessonData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching Lesson Data:", err);
      });
  }, []);

  return (
    <div>
      <h1>
        Ruku {ruku} - Surah {surahNo}
      </h1>
      <h3 className="subheading">Quran Lesson Text</h3>
      <div className="lesson-text">
        {Array.isArray(lessonData) && lessonData.length > 0 ? (
          lessonData.map((ayah) => (
            <div key={ayah.id} className="ayah-card">
              <div className="ayah-number">Ayah {ayah.Ayah_id}</div>
              <div className="ayah-text">{ayah.AyahText}</div>
            </div>
          ))
        ) : (
          <p>No lesson data available.</p>
        )}
      </div>
    </div>
  );
};

export default QuranText;
