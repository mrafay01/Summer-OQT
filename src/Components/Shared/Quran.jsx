import React, { useState, useEffect } from "react";
import axios from "axios";

const Quran = () => {
  const [lessonData, setLessonData] = useState(null);
  const [selectedAyahId, setSelectedAyahId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ruku_id = parseInt(sessionStorage.getItem("ruku_id"));
    const surah_id = parseInt(sessionStorage.getItem("surah_id"));

    axios.get(`http://localhost/OnlineQuranServer/api/tutor/GetQuran?ruku_id=${ruku_id}&surah_id=${surah_id}`)
      .then((response) => {
        console.log("Quran lesson data fetched successfully:", response.data);
        setLessonData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERRROOORRRR", error);
        setError("Failed to load Quran data");
        setLoading(false);
      });
  }, []);

  const handleAyahClick = (ayahId) => {
    console.log(`Ayah ${ayahId} clicked`);
    setSelectedAyahId(ayahId);
  };

  if (loading) {
    return (
      <div className="lesson-loading">
        Loading Quran lessons...
      </div>
    );
  }

  if (error) {
    return (
      <div className="lesson-container">
        <div className="lesson-header">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!lessonData || lessonData.length === 0) {
    return (
      <div className="lesson-container">
        <div className="lesson-header">
          <h1>No Quran Data Found</h1>
          <p>No Quran lessons available for this topic.</p>
        </div>
      </div>
    );
  }

  const surahId = lessonData[0]?.surah_id;
  const rukuId = lessonData[0]?.Ruku_id;

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h1>Quran Lessons</h1>
        <div className="lesson-info">
          <span>Surah {surahId}</span>
          <span>Ruku {rukuId}</span>
        </div>
      </div>
      
      <div className="lesson-content">
        {lessonData.map((ayah, index) => (
          <div
            key={ayah.id}
            className={`ayah-card ${
              selectedAyahId === ayah.Ayah_id ? "ayah-selected" : ""
            }`}
            onClick={() => handleAyahClick(ayah.Ayah_id)}
          >
            <div className="ayah-number">{ayah.Ayah_id}</div>
            <div className="ayah-content">
              <p className="arabic-text">{ayah.AyahText}</p>
              <div className="ayah-details">
                <span>Surah {ayah.surah_id}</span>
                <span>Ruku {ayah.Ruku_id}</span>
                <span>Ayah {ayah.Ayah_id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quran;
