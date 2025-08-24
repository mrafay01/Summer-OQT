import React, { useState, useEffect } from "react";
import axios from "axios";

const Hadiths = () => {
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const topic = localStorage.getItem("Topic");

    axios.get(`http://localhost/OnlineQuranServer/api/tutor/GetHadith?topicName=${topic}`)
      .then((response) => {
        console.log("Hadith lesson data fetched successfully:", response.data);
        setLessonData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERRROOORRRR", error);
        setError("Failed to load Hadith data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="hadith-loading">
        Loading Hadith lessons...
      </div>
    );
  }

  if (error) {
    return (
      <div className="hadith-container">
        <div className="hadith-header">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!lessonData || lessonData.length === 0) {
    return (
      <div className="hadith-container">
        <div className="hadith-header">
          <h1>No Hadith Found</h1>
          <p>No Hadith lessons available for this topic.</p>
        </div>
      </div>
    );
  }

  const topic = localStorage.getItem("Topic");

  return (
    <div className="hadith-container">
      <div className="hadith-header">
        <h1>Hadith Lessons</h1>
        <div className="topic-info">Topic: {topic}</div>
      </div>
      
      <div className="hadith-content">
        {lessonData.map((hadith, index) => (
          <div key={hadith.id} className="hadith-card">
            <div className="hadith-number">{hadith.hadith_index}</div>
            
            <div className="hadith-meta">
              <span className="hadith-book">{hadith.book_name}</span>
              <span className="hadith-volume">Volume {hadith.Volume}</span>
            </div>
            
            <div className="narrator-text">
              {hadith.narrator}
            </div>
            
            <div className="hadith-text">
              {hadith.hadith_text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hadiths;
