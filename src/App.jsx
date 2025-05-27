import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import CardComparisonSection from './components/CardComparisonSection';
import ApplicationRequirementsSection from './components/ApplicationRequirementsSection';
import FAQSection from './components/FAQSection';
import ApplyNowSection from './components/ApplyNowSection';
import DetailedFooter from './components/DetailedFooter';
import ApplicationForm from './pages/ApplicationForm';
import ThankYouPage from './pages/ThankYouPage';

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhyChooseUsSection />
      <CardComparisonSection />
      <ApplicationRequirementsSection />
      <FAQSection />
      <ApplyNowSection />
      <DetailedFooter />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="landing-page">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
