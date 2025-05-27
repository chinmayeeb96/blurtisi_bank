import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationForm.css';
import DetailedFooter from '../components/DetailedFooter';
import ApplicationHeader from '../components/ApplicationHeader';
import Navbar from '../components/Navbar';
import formData from '../data/formData.json';
import axios from 'axios';
import boltLogo from '../assets/logoapply.svg';
import hero1 from '../assets/hero1.png';


function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };  

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormState((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormState((prev) => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const convertToApplicationData = (formState) => {
    // Validate required fields
    const requiredFields = [
      'fullName',
      'dateOfBirth',
      'gender',
      'phone',
      'email',
      'residentialAddress',
      'nin',
      'bvn',
      'employmentStatus',
      'employerName',
      'workAddress',
      'employmentStartDate',
      'monthlyIncome',
      'salaryAccountBankName',
      'bankAccountNumber'
    ];

    const missingFields = requiredFields.filter(field => !formState[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Format phone number to remove any spaces or special characters
    const formattedPhone = formState.phone?.replace(/[^\d+]/g, '') || '';

    const data = {
      personal_information: {
        full_name: formState.fullName?.trim(),
        date_of_birth: formState.dateOfBirth,
        gender: formState.gender?.toLowerCase(),
        phone_number: formattedPhone,
        email: formState.email?.toLowerCase().trim(),
        residential_address: formState.residentialAddress?.trim(),
        nin: formState.nin?.trim(),
        bvn: formState.bvn?.trim()
      },
      employment_and_income: {
        employment_status: formState.employmentStatus?.toLowerCase(),
        employer_name: formState.employerName?.trim(),
        work_address: formState.workAddress?.trim(),
        employment_start_date: formState.employmentStartDate,
        monthly_income: Number(formState.monthlyIncome.replace(/[^0-9.]/g, '')) || 0,
        which_Card: formState.whichCard?.toLowerCase()
      },
      banking_information: {
        salary_account_bank_name: formState.salaryAccountBankName?.trim(),
        bank_account_number: formState.bankAccountNumber?.trim()
      },
      financial_history: {
        has_existing_loans: formState.existingLoans === 'yes',
        monthly_loan_repayment: Number(formState.monthlyLoanRepayment?.replace(/[^0-9.]/g, '')) || 0,
        has_loan_defaults: formState.pastLoanDefaults === 'yes',
        owns_credit_cards: formState.ownCreditCards === 'yes'
      },
      lifestyle_information: {
        marital_status: formState.maritalStatus?.toLowerCase(),
        number_of_dependents: parseInt(formState.numberOfDependents) || 0,
        mode_of_transport: formState.modeOfTransport?.toLowerCase(),
        residence_type: formState.rentOrOwnHome?.toLowerCase()
      },
      consents: {
        consent_bvn_access: Boolean(formState.consentBvn),
        consent_credit_history_access: Boolean(formState.consentCreditHistory),
        consent_data_use: Boolean(formState.consentRiskModeling)
      }
    };

    
    // Add files to the request
    const fileMapping = {
      'uploadId': 'means_of_id',
      'uploadPhoto': 'live_photo',
      'uploadEmploymentLetter': 'employment_letter',
      'uploadPayslip': 'payslip',
      'uploadNyscLetter': 'nysc_letter',
      'uploadBankStatement': 'bank_statement',
      'uploadCreditReport': 'credit_report',
      'uploadUtilityBill': 'utility_bill',
      'signatureUpload': 'signature'
    };
    
    // Add files section if there are any files
    const files = {};
    let hasFiles = false;
    
    Object.entries(fileMapping).forEach(([formField, apiField]) => {
      if (formState[formField]) {
        files[apiField] = formState[formField]; // Already base64 from handleInputChange
        hasFiles = true;
      }
    });
    
    if (hasFiles) {
      data.files = files;
    }

    // Remove any undefined or null values
    const cleanData = JSON.parse(JSON.stringify(data));
    return cleanData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const applicationData = convertToApplicationData(formState);
      console.log('Sending application data:', applicationData);

      const response = await axios.post(
        'https://w98jso2pp1.execute-api.us-east-1.amazonaws.com/prod/applications',
        applicationData,
        {
          headers: {
            'x-api-key': 'fF9if66Mw64LuPOtHJS8P9YDCqbWfe2t9gx5YLzw',
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('API response:', response.data);
      navigate('/thank-you');
    } catch (error) {
      console.error('Failed to submit application:', error);
      
      if (error.message.includes('Missing required fields')) {
        alert(error.message);
        return;
      }

      if (error.response?.data?.errors) {
        const errorMessage = Array.isArray(error.response.data.errors) 
          ? error.response.data.errors.join('\n')
          : 'Validation error occurred. Please check all fields.';
        alert(errorMessage);
      } else {
        alert('Failed to submit application. Please ensure all required fields are filled correctly.');
      }
    }
  };

  const renderField = (field) => {
    // Dynamic label for uploadNyscLetter
    let dynamicLabel = field.label;
    if (field.id === 'uploadNyscLetter') {
      if (formState.whichCard === 'bluecard') {
        dynamicLabel = 'MDCN Annual Practicing Licence';
      } else if (formState.whichCard === 'blackcard') {
        dynamicLabel = 'Enrollment/Deployment Letter';
      } else if (formState.whichCard === 'redcard') {
        dynamicLabel = 'Upload NYSC Posting Letter / ID';
      }
    }
    switch (field.type) {
      case 'select':
        return (
          <select 
            id={field.id} 
            name={field.id} 
            required={field.required} 
            value={formState[field.id] || ''} 
            onChange={handleInputChange}
            className={!formState[field.id] ? 'placeholder' : ''}
          >
            <option value="" disabled>
              {field.options[0].label}
            </option>
            {field.options.slice(1).map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="checkbox-group">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                id={field.id}
                name={field.id}
                checked={!!formState[field.id]}
                onChange={handleInputChange}
                required={field.required}
              />
              <span className="checkmark"></span>
              {dynamicLabel}
            </label>
          </div>
        );
      case 'file':
        return (
          <div className="custom-file-dropzone">
            <label htmlFor={field.id} className="file-dropzone-label">
              {formState[field.id]?.name || dynamicLabel || field.placeholder || "Upload file PNG, JPEG, PDF"}
              <span className="file-upload-icon" aria-hidden="true">
                <svg width="28" height="28" fill="none" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 19V6M5 12l7-7 7 7"/>
                </svg>
              </span>
            </label>
            <input
              type="file"
              id={field.id}
              name={field.id}
              accept={field.accept}
              onChange={handleInputChange}
              required={field.required}
              className="file-dropzone-input"
            />
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            value={formState[field.id] || ''}
            onChange={handleInputChange}
            required={field.required}
          />
        );
    }
  };

  const renderStepContent = () => {
    const currentStepData = formData.steps[currentStep - 1];
    // Special handling for Consent & Declarations step
    if (currentStepData.title === 'Consent & Declarations') {
      // Separate signature field from others
      const signatureField = currentStepData.fields.find(f => f.id === 'signatureUpload');
      const otherFields = currentStepData.fields.filter(f => f.id !== 'signatureUpload');
      return (
        <div className="step-content">
          <div className="form-grid">
            {otherFields.map((field) => (
              <div key={field.id} className="form-group">
                {field.type !== 'checkbox' && <label htmlFor={field.id}>{field.label}</label>}
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="form-group signature-bottom-left">
            <label htmlFor={signatureField.id}>{signatureField.label}</label>
            {renderField(signatureField)}
          </div>
        </div>
      );
    }
    // Special handling for Employment & Income step for dynamic label
    if (currentStepData.title === 'Employment & Income') {
      return (
        <div className="step-content">
          <div className="form-grid">
            {currentStepData.fields.map((field) => {
              let dynamicLabel = field.label;
              if (field.id === 'uploadNyscLetter') {
                if (formState.whichCard === 'bluecard') {
                  dynamicLabel = 'MDCN Annual Practicing Licence';
                } else if (formState.whichCard === 'blackcard') {
                  dynamicLabel = 'Enrollment/Deployment Letter';
                } else if (formState.whichCard === 'redcard') {
                  dynamicLabel = 'Upload NYSC Posting Letter / ID';
                }
              }
              return (
                <div key={field.id} className="form-group">
                  {field.type !== 'checkbox' && <label htmlFor={field.id}>{dynamicLabel}</label>}
                  {renderField(field)}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    // Default rendering for other steps
    return (
      <div className="step-content">
        {/* <h2>{currentStepData.title}</h2> */}
        <div className="form-grid">
          {currentStepData.fields.map((field) => (
            <div key={field.id} className="form-group">
              {field.type !== 'checkbox' && <label htmlFor={field.id}>{field.label}</label>}
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStepIndicator = () => {
    return (
      <div className="step-indicator">
        {formData.steps.map((step, index) => (
          <div key={index} className={step-item ${index + 1 <= currentStep ? 'active' : ''}}>
            <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="step-name">{step.title}</div>
          </div>
        ))}
      </div>
    );
  };

  // Utility to convert section title to a valid CSS class
  const getSectionClass = (title) => {
    return title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="application-page-container">
      <Navbar />
      <section className="apply-now-section">
        <div className="container">
          <div className="apply-content">
            <div className="apply-image" style={{ backgroundImage: url(${hero1}), backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="apply-overlay1">
                <h1 className="apply-title1">Apply Now For Your<br />Credit Card</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="form-divider"></div>
      <div className="application-form-content">
        <div className="form-wrapper">
          {renderStepIndicator()}
          <div className="section-label">{formData.steps[currentStep - 1].title}</div>
          <form
            className={application-form ${getSectionClass(formData.steps[currentStep - 1].title)}-section}
            onSubmit={handleSubmit}
          >
            {renderStepContent()}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={handlePreviousStep} className="prev-button">
                  Previous
                </button>
              )}
              {currentStep < formData.steps.length ? (
                <button type="button" onClick={handleNextStep} className="next-button">
                  <span style={{ fontWeight: '700' }}>Next:</span> {formData.steps[currentStep].title} →
                </button>
              ) : (
                <button type="submit" className="submit-button">
                  Submit Form
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <DetailedFooter />
    </div>
  );
}

export default ApplicationForm;
