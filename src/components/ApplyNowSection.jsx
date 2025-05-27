import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyNowSection.css';
import applyNowImage from '../assets/Hero BG.png';
import boltLogo from '../assets/logoapply.svg';

function ApplyNowSection() {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply');
  };

  return (
    <section className="apply-now-section">
      <div className="container">
        <div className="apply-content">
          
          <div className="apply-image">
            <img src={applyNowImage} alt="Apply Now Illustration" />
            <div className="apply-overlay">
              <p className="apply-subtitle">Get your finances protected in minutes</p>
              <h1 className="apply-title">Apply Now For Your<br />Credit Card</h1>
              <button className="apply-now-button" onClick={handleApplyClick}>
                <img src={boltLogo} alt="Apply Logo" className="apply-logo" style={{marginRight: '12px', width: '28px', height: '28px'}} />
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplyNowSection; 