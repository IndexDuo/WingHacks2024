import React from "react";
import star from "../images/Colored_Badge.png";
import "../styles/About.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  return (
    <div className="about">
      <button className="back" onClick={navigateBack}>
        <IoIosArrowBack /> {/* Back icon */}
      </button>
      <h1>About the app</h1>
      <div className="para">
        <p>
          Say the name of the celebrity and see if you're correct! We use voice
          recognition to see if you got it right.
        </p>
      </div>
      <h1>Team Members</h1>
      <p>Click our names to go to our GitHub!</p>
      <div className="team">
        <div className="member">
          <img src={star} alt="hi" />
          <a href="https://github.com/IndexDuo" target="_blank">
            Jing
          </a>
        </div>
        <div className="member">
          <img src={star} alt="hi" />
          <a href="https://github.com/lindsey-nielsen" target="_blank">
            Lindsey
          </a>
        </div>
        <div className="member">
          <img src={star} alt="hi" />
          <a href="https://github.com/ca764763" target="_blank">
            Casandra
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
