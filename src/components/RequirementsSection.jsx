import React from 'react';
import './RequirementsSection.css';
import applySvg from '../assets/apply.svg';

function RequirementsSection() {
  return (
    <section className="requirements-section">
      <div className="container">
        <div className="requirements-grid">
          <img src={applySvg} alt="Apply" className="apply-image" />
        </div>
      </div>
    </section>
  );
}

export default RequirementsSection; 