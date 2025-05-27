import React from 'react';
import './WhyChooseUsSection.css';
import decorativeSvg from '../assets/rgb.svg';
import periodIcon from '../assets/period.svg';
import onlineIcon from '../assets/online.svg';
import requiredIcon from '../assets/required.svg';
import rebatesIcon from '../assets/rebates.svg';
import controlIcon from '../assets/control.svg';
import limitIcon from '../assets/limit.svg';

function WhyChooseUsSection() {
  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="decorative-image">
          <img src={decorativeSvg} alt="Decorative pattern" />
        </div>
        <div className="subtitle">WHY CHOOSE US?</div>
        <h2 className="section-title">Making Your Life Easier</h2>
        <div className="features-grid">

          <div className="feature-item feature-item-1">
            <p>30-45 Days Interest-Free Period</p>
            <div className="feature-icon">
              <img src={periodIcon} alt="Interest-free period icon" />
            </div>
          </div>

          <div className="feature-item feature-item-2">
            <p>Accepted Nationwide & Online</p>
            <div className="feature-icon">
              <img src={onlineIcon} alt="Nationwide acceptance icon" />
            </div>
          </div>

          <div className="feature-item feature-item-3">
            <p>No Collateral Required</p>
            <div className="feature-icon">
              <img src={requiredIcon} alt="No collateral icon" />
            </div>
          </div>

          <div className="feature-item feature-item-4">
            <p>Earn Cashback & Airtime Rebates</p>
            <div className="feature-icon">
              <img src={rebatesIcon} alt="Cashback and rebates icon" />
            </div>
          </div>

          <div className="feature-item feature-item-5">
            <p>Fraud Protection & Card Controls</p>
            <div className="feature-icon">
              <img src={controlIcon} alt="Fraud protection icon" />
            </div>
          </div>

          <div className="feature-item feature-item-6">
            <p>Up To ₦1,000,000 Limit</p>
            <div className="feature-icon">
              <img src={limitIcon} alt="Credit limit icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection; 