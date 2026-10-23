import React from "react";
import "./Guests.css";

import guestImage1 from "../assets/img7.jpg";
import guestImage2 from "../assets/img21.jpg";

const guestAreas = [
  {
    image: guestImage2,
    title: "விருந்தினர்கள் அமரும் இடத்திற்குச் செல்லும் வழி",
    description:
      "மண்டபத்தின் உள்ளே விருந்தினர்கள் எளிதாகச் சென்று வருவதற்காக அழகாகவும் விசாலமாகவும் அமைக்கப்பட்ட நடைபாதை. ",
    alt: "மண்டபத்தின் உட்புற நடைபாதை",
  },
  {
    image: guestImage1,
    title: "விருந்தினர்கள் அமரும் இடம்",
    description:
      "திருமணம் மற்றும் குடும்ப நிகழ்ச்சிகளுக்கு வருகை தரும் விருந்தினர்கள் வசதியாக அமர்ந்து நிகழ்ச்சிகளை மகிழ்ச்சியுடன் கண்டுகளிக்க விசாலமான அமரும் இடம்.",
    alt: "விருந்தினர்கள் அமரும் இடம்",
  }
];

const Guests = () => {
  return (
    <section id="guests" className="guests-page" aria-label="விருந்தினர் வசதிகள்">
      <div className="guests-section">
        <div className="guests-heading">
          <h2>விருந்தினர் வசதிகள்</h2>
          <p>
            விருந்தினர்களின் வசதியையும் மகிழ்ச்சியையும்
            கருத்தில் கொண்டு அமைக்கப்பட்ட இடங்கள்.
          </p>
        </div>

        <div className="guests-grid">
          {guestAreas.map((area) => (
            <article className="guest-card" key={area.title}>
              <div className="guest-image-wrapper">
                <img
                  src={area.image}
                  alt={area.alt}
                  className="guest-image"
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                />

                <div className="guest-image-overlay" aria-hidden="true">
                  <p>{area.title}</p>
                </div>
              </div>

              <div className="guest-card-content">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guests;
