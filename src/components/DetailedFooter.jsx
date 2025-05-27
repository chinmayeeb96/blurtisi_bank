import React from 'react';
import './DetailedFooter.css';
import logo from '../assets/Blue-removebg-preview1.png'; // Assuming a specific logo name for the footer
import { FaLinkedin, FaYoutube  } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function DetailedFooter({ isLandingPage = false }) {
  return (
    <footer className="detailed-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={logo} alt="Blue Tisi Company Logo" className="footer-logo-img" />
            <div className="footer-tagline">
              <p>Own Your Future. Get Smartest Credit Card.</p>
            </div>
          </div>
          <div className="footer-right-group">
            <div className="footer-contact">
              <p>+1 (234) 400-7648</p>
              <p>hello@bluetisi.com</p>
            </div>

            
              
            

            
            <div className="footer-social">
              {/* Social media icons */}
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" style={{ color: 'black' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaYoutube  className="social-icon" style={{ color: 'black' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaSquareXTwitter  className="social-icon" style={{ color: 'black' }} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>
        
        {isLandingPage && <div className="footer-divider"></div>}
        
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Terms of use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">GDPR</a>
            <a href="#">System Status</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 Blue Tisi Company, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DetailedFooter; 