import React from 'react';
import './ApplicationRequirementsSection.css';
import bvnIcon from '../assets/BVN SVG.svg';
import govtIcon from '../assets/govt.svg';
import proofIcon from '../assets/prrof svg.svg';
import billIcon from '../assets/bill.svg';

function ApplicationRequirementsSection() {
  return (
    <section className="application-requirements">
      <div className="container">
        <h2 className="requirements-title">To apply, you'll need</h2>
        <div className="requirements-grid">
          <div className="requirement-item">
            <div className="requirement-icon">
              <img src={bvnIcon} alt="BVN Icon" />
            </div>
            <div className="requirement-text">
              <div className="requirement-text-row">
                <p className="requirement-main">BVN</p>
                <p className="requirement-sub">(Bank Verification Number)</p>
              </div>
            </div>
          </div>
          <div className="requirement-item">
            <div className="requirement-icon">
              <img src={govtIcon} alt="Government ID Icon" />
            </div>
            <div className="requirement-text">
              <p className="requirement-main">Valid Government-Issued ID</p>
            </div>
          </div>
          <div className="requirement-item">
            <div className="requirement-icon">
              <img src={proofIcon} alt="Proof of Income Icon" />
            </div>
            <div className="requirement-text">
              <p className="requirement-main">Proof Of Income Or Employment</p>
            </div>
          </div>
          <div className="requirement-item">
            <div className="requirement-icon">
              <img src={billIcon} alt="Utility Bill Icon" />
            </div>
            <div className="requirement-text">
              <div className="requirement-text-row">
                <p className="requirement-main">Recent Utility Bill</p>
                <p className="requirement-sub">(Or Proof Of Address)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplicationRequirementsSection; 