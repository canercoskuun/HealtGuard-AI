// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Chatbot from './pages/Chatbot';
import Classic from './pages/Classic';

const Home: React.FC = () => {
  const [isHoveringClassic, setIsHoveringClassic] = useState(false);
  const [isHoveringChatbot, setIsHoveringChatbot] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://public.readdy.ai/ai/img_res/bef04168fce08ad306a90a2611ab0bab.jpg')",
          }}

        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/20"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-20 py-6">
          <div className="flex items-center gap-3">
            <i className="fas fa-heartbeat text-3xl text-blue-600"></i>
            <span className="text-2xl font-bold text-gray-800">HealthGuard AI</span>
          </div>
          <nav className="flex items-center gap-8">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">About</button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">Services</button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">Contact</button>
            <button
              className="!rounded-button bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
              onClick={() => setShowEmergencyModal(true)}
            >
              Emergency Help
            </button>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 px-20 mt-20">
          <h1 className="text-5xl font-bold text-gray-800 max-w-2xl leading-tight">
            Advanced AI-Powered Health Diagnosis at Your Fingertips
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl">
            Get instant health insights based on your symptoms using our cutting-edge diagnostic tools. Choose your preferred method below for a personalized health assessment.
          </p>
        </div>
      </div>

      {/* Main Options */}
      <div className="px-20 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Choose Your Diagnosis Method
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div
              className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 cursor-pointer ${isHoveringClassic ? 'transform -translate-y-2' : ''
                }`}
              onMouseEnter={() => setIsHoveringClassic(true)}
              onMouseLeave={() => setIsHoveringClassic(false)}
              onClick={() => handleNavigate('/classic')}
            >
              <div className="flex items-start gap-6">
                <div className="rounded-full bg-blue-100 p-4">
                  <i className="fas fa-clipboard-list text-2xl text-blue-600"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Classic Model</h3>
                  <p className="text-gray-600 mb-4">
                    Traditional symptom-based diagnosis using our comprehensive medical database. Perfect for systematic health assessment.
                  </p>
                  <button className="!rounded-button flex items-center gap-2 bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Start Diagnosis
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 cursor-pointer ${isHoveringChatbot ? 'transform -translate-y-2' : ''
                }`}
              onMouseEnter={() => setIsHoveringChatbot(true)}
              onMouseLeave={() => setIsHoveringChatbot(false)}
              onClick={() => handleNavigate('/chatbot')}
            >
              <div className="flex items-start gap-6">
                <div className="rounded-full bg-green-100 p-4">
                  <i className="fas fa-robot text-2xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">AI Chatbot</h3>
                  <p className="text-gray-600 mb-4">
                    Interactive conversation with our advanced AI system. Natural dialogue for personalized health guidance.
                  </p>
                  <button className="!rounded-button flex items-center gap-2 bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition-colors whitespace-nowrap">
                    Chat Now
                    <i className="fas fa-comment-dots"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose HealthGuard AI?
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-brain',
                title: 'Advanced AI Technology',
                description: 'Powered by cutting-edge artificial intelligence for accurate diagnosis'
              },
              {
                icon: 'fa-shield-alt',
                title: 'Privacy Protected',
                description: 'Your health data is encrypted and secured with military-grade protection'
              },
              {
                icon: 'fa-clock',
                title: '24/7 Availability',
                description: 'Access healthcare insights anytime, anywhere with instant responses'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-block rounded-full bg-blue-100 p-4 mb-4">
                  <i className={`fas ${feature.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-20 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <i className="fas fa-heartbeat text-2xl text-blue-400"></i>
                <span className="text-xl font-bold">HealthGuard AI</span>
              </div>
              <p className="text-gray-400">
                Leading the future of healthcare with AI-powered diagnosis and personalized health insights.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-blue-400 transition-colors">About Us</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Services</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Contact</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Emergency Contact</h4>
              <p className="text-gray-400">24/7 Emergency Hotline</p>
              <p className="text-xl font-bold text-blue-400">1-800-HEALTH-AI</p>
              <div className="mt-4 flex gap-4">
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="fab fa-facebook text-xl"></i>
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 HealthGuard AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-3">
                  <i className="fas fa-exclamation-triangle text-xl text-red-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Emergency Services</h3>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              If you are experiencing a medical emergency, please call your local emergency services immediately:
            </p>
            <div className="bg-red-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <i className="fas fa-phone-alt text-2xl text-red-600"></i>
                <div>
                  <p className="font-bold text-gray-800">Emergency Number</p>
                  <p className="text-2xl font-bold text-red-600">911</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Available 24/7 for immediate medical assistance
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="!rounded-button px-6 py-2 text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Close
              </button>
              <button
                className="!rounded-button bg-red-600 px-6 py-2 text-white hover:bg-red-700 transition-colors whitespace-nowrap"
                onClick={() => window.location.href = 'tel:911'}
              >
                Call Emergency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/classic" element={<Classic />} />
      </Routes>
    </Router>
  );
};

export default App;

