import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYouPage.css';
import checkmarkIcon from '../assets/tick.svg'; // Assuming you have a checkmark icon image
import googlePlayBadge from '../assets/google-play-badge.png'; // Assuming you have the Google Play badge image
import appStoreBadge from '../assets/app-store-badge.png'; // Assuming you have the App Store badge image
import DetailedFooter from '../components/DetailedFooter';
import logoSvg from '../assets/applynowsvg.svg';

function ThankYouPage() {
  return (
    <div className="thank-you-page-container">
      <div className="logo-container">
        <img src={logoSvg} alt="Blue TISI Logo" className="header-logo" />
      </div>
      <div className="thank-you-content">
        <div className="thank-you-wrapper">
          <img src={checkmarkIcon} alt="Checkmark Icon" className="checkmark-icon" />
          <h2>Thank You For Submitting <br></br>Your Application!</h2>
          <p>You'll receive a decision within 2 business days</p>
          <Link to="/" className="back-to-home-link">← Back to home</Link>

          <div className="download-app-section">
            <p>Download our mobile app</p>
            <div className="app-badges">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={googlePlayBadge} alt="Get it on Google Play" className="app-badge" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={appStoreBadge} alt="Download on the App Store" className="app-badge" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <DetailedFooter />
    </div>
  );
}

export default ThankYouPage; 