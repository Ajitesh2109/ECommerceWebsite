import React from "react";
import "./Hero.css";
import arrow_icon from "../Assets/arrow.png";
import model_img from "../Assets/model_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>latest</p>
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-button">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={model_img} alt="" width="800px" />
      </div>
    </div>
  );
};

export default Hero;
