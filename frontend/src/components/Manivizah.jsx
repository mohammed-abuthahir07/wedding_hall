
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
            ஆன்மீக நிகழ்வுகள், குடும்ப விழாக்கள் மற்றும் சுப நிகழ்ச்சிகள்
            சிறப்பாக நடைபெற, 60 பேர் வரை அமரக்கூடிய வசதியுடன் கூடிய
            விசாலமான மணிமண்டபம். அனைவரும் ஒன்றுகூடி இறைவனைப் போற்றி
            மகிழும் வகையில், அமைதியான சூழலுடன் சிறப்பான வசதிகள்
            ஏற்பாடு செய்யப்பட்டுள்ளன.
          </p>
        </div>

      </section>
    </main>
  );
};

export default Manivizah;
