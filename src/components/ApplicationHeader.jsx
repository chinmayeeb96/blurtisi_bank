import React from 'react';
import './ApplicationHeader.css';

function ApplicationHeader() {
  return (
    <div className="application-header-container">
      <div className="header-top-bar">
        <button className="header-credit-card-button">Get Your Credit Card</button>
      </div>
      <div className="header-title-area">
        <h1>Apply Now For Your <br/> Credit Card</h1>
      </div>
    </div>
  );
}

export default ApplicationHeader; 