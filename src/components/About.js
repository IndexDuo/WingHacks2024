import React from "react";
import "../styles/About.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  return (
    <main className="about-screen">
      <button aria-label="Back to home" className="about-back" onClick={navigateBack}>
        <IoIosArrowBack aria-hidden="true" />
      </button>
      <section className="about-card">
        <p className="about-eyebrow">How to play</p>
        <h1>Fast face.<br />Faster answer.</h1>
        <p className="about-lead">BiasGuessr is a quick-fire character quiz inspired by Korean variety shows.</p>
        <ol className="rules-list">
          <li><span>1</span><p>A celebrity photo appears.</p></li>
          <li><span>2</span><p>Tap the mic and say the name as you know it in English.</p></li>
          <li><span>3</span><p>Type your answer if voice recognition is unavailable.</p></li>
        </ol>
        <div className="pronunciation-note">
          <strong>Pronunciation-friendly</strong>
          <p>Common English pronunciations and spellings of K-pop names count. Perfect Korean is never required.</p>
        </div>
        <div className="team-links">
          <p>Created at WiNGHacks 2024 by</p>
          <div>
            <a href="https://github.com/IndexDuo" target="_blank" rel="noreferrer">Jing</a>
            <a href="https://github.com/lindsey-nielsen" target="_blank" rel="noreferrer">Lindsey</a>
            <a href="https://github.com/ca764763" target="_blank" rel="noreferrer">Casandra</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
