import React from 'react';
import { useNavigate } from 'react-router-dom';
import gradientBg from '../assets/Hero BG.png';
import cardsImg from '../assets/Card Designs 2.png';
import arrowImg from '../assets/Mask group.png';
import boltLogo from '../assets/logoapply.svg';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply');
  };

  return (
    <section className="hero-content">
      
      <div className="overlay-container">
        <img src={gradientBg} alt="Overlay Background" className="overlay-bg" style={{width:'100rem', height:'50rem'}}/>
        <div className="overlay-text">
          <h1>Own Your Future.<br/>Get Smartest<br/>Credit Card.</h1>
          <p>Apply in minutes. Earn rewards. Build your credit history</p>
          <button className="apply-button" onClick={handleApplyClick}>
            <img src={boltLogo} alt="Apply Logo" className="apply-logo" style={{marginRight: '12px', width: '28px', height: '28px', fontSize: '28px'}} />
            <span className="apply-now-text">Apply Now</span>
          </button>
          <img src={arrowImg} alt="Arrow pointing to Apply Now" className="apply-arrow" />
          <img src={cardsImg} alt="Main" className="main-image" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 