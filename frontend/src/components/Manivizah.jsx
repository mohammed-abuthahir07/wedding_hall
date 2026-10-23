
import React from "react";
import "./Manivizah.css";
import hallImage from "../assets/img6.jpeg";

const Manivizah = () => {
  return (
    <main className="manivizah-page">
      <section className="mv-layout">

        {/* Image with hover title */}
        <div className="mv-image-wrapper">
          <img
            src={hallImage}
            alt="மணிவிழா மண்டபம்"
            className="mv-image"
          />

          <div className="mv-image-overlay">
            <h2>மணிவிழா மண்டபம்</h2>
          </div>
        </div>

        {/* Tamil content inside a box */}
        <div className="mv-content-box">
          <span className="mv-content-label">எங்கள் மண்டபம்</span>

          <h1>மணிவிழா மண்டபம்</h1>

          <p>
  ஆன்மீக நிகழ்வுகள், மணிவிழா மற்றும் குடும்ப சுப காரியங்களை விமரிசையாகக் கொண்டாட ஏதுவான பிரம்மாண்டமான அரங்கம்  <br /> 60 நபர்கள் வரை சொகுசாக அமரக்கூடிய வசதியுடன், மனதிற்கு அமைதி தரும் தூய்மையான சூழல்.உங்கள் சொந்தங்களும் பந்தங்களும் ஒன்றிணைந்து, மகிழ்ச்சியான நிகழ்வுகளை இனிய நினைவுகளாக மாற்ற இன்றே முன்பதிவு செய்யுங்கள்!
          </p>
        </div>

      </section>
    </main>
  );
};

export default Manivizah;
