// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import * as echarts from 'echarts';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Chatbot from './pages/Chatbot';
import Classic from './pages/Classic';
interface User {
  email: string;
  password: string;
  name?: string;
}
const Home: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  const [errors, setErrors] = useState<Partial<User>>({});
  const handleButtonHover = (buttonId: string) => {
    setActiveButton(buttonId);
  };
  const handleButtonLeave = () => {
    setActiveButton(null);
  };
  const validateForm = () => {
    const newErrors: Partial<User> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically make an API call to handle authentication
      console.log('Form submitted:', formData);
      setShowAuth(false);
      setFormData({ email: '', password: '', name: '' });
      setIsLoggedIn(true);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ email: '', password: '', name: '' });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof User]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Hero Background */}
      <div
        className="absolute top-0 left-0 w-full h-[800px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://public.readdy.ai/ai/img_res/d46ba79098e922ca98af2b877d26df11.jpg')`,
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white"></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <i className="fas fa-heartbeat text-3xl text-white"></i>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">HealthGuard AI</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">About</a>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</a>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white !rounded-button whitespace-nowrap hover:bg-red-600 transition-colors duration-200"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 bg-blue-500 text-white !rounded-button whitespace-nowrap hover:bg-blue-600 transition-colors duration-200"
              >
                Log In
              </button>
            )}
          </nav>
        </header>
        {/* Hero Section */}
        <main className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How would you like to check your symptoms?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant health insights using our advanced diagnostic tools. Choose your preferred method below.
            </p>
          </div>
          {/* Main Buttons */}
          <div className="max-w-md mx-auto space-y-6">
            <button
              className={`w-full p-6 bg-blue-500 text-white !rounded-button whitespace-nowrap flex items-center justify-center space-x-4 transition-all duration-300 ${activeButton === 'classic' ? 'transform scale-105' : ''
                }`}
              onMouseEnter={() => handleButtonHover('classic')}
              onMouseLeave={handleButtonLeave}
              onClick={() => handleNavigate('/classic')}
            >
              <i className="fas fa-clipboard-list text-2xl"></i>
              <span className="text-xl font-semibold">Classic Model</span>
            </button>
            <button
              className={`w-full p-6 bg-teal-600 text-white !rounded-button whitespace-nowrap flex items-center justify-center space-x-4 transition-all duration-300 ${activeButton === 'chatbot' ? 'transform scale-105' : ''
                }`}
              onMouseEnter={() => handleButtonHover('chatbot')}
              onMouseLeave={handleButtonLeave}
              onClick={() => handleNavigate('/chatbot')}
            >
              <i className="fas fa-robot text-2xl"></i>
              <span className="text-xl font-semibold">Try Chatbot</span>
            </button>
          </div>
          {/* Features Section */}
          <div className="mt-32 grid grid-cols-3 gap-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 rounded-3xl transform -skew-y-2"></div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg relative z-10 hover:transform hover:scale-105 transition-transform duration-300">
              <i className="fas fa-brain text-4xl text-blue-500 mb-4"></i>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600">Advanced algorithms analyze your symptoms for accurate health insights.</p>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg relative z-10 hover:transform hover:scale-105 transition-transform duration-300">
              <i className="fas fa-user-md text-4xl text-blue-500 mb-4"></i>
              <h3 className="text-xl font-semibold mb-3">Medical Expertise</h3>
              <p className="text-gray-600">Backed by professional medical knowledge and latest research.</p>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg relative z-10 hover:transform hover:scale-105 transition-transform duration-300">
              <i className="fas fa-shield-alt text-4xl text-blue-500 mb-4"></i>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-gray-600">Your health data is encrypted and protected with industry standards.</p>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="mt-32 py-8 border-t border-gray-200" id="about">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About Us</h4>
              <p className="text-gray-600">HealthGuard AI is a cutting-edge healthcare technology company dedicated to making healthcare more accessible and efficient through artificial intelligence. Our mission is to empower individuals with instant, accurate health insights while maintaining the highest standards of privacy and security.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" id="contact">Contact Us</h4>
              <ul className="space-y-2 text-gray-600">
                <li><i className="fas fa-envelope mr-2"></i>support@healthguard.ai</li>
                <li><i className="fas fa-phone mr-2"></i>+1 (800) HEALTH</li>
                <li><i className="fas fa-map-marker-alt mr-2"></i>123 Innovation Drive, Silicon Valley, CA 94025</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a className="text-gray-600 hover:text-blue-500"><i className="fab fa-twitter text-xl"></i></a>
                <a className="text-gray-600 hover:text-blue-500"><i className="fab fa-facebook text-xl"></i></a>
                <a className="text-gray-600 hover:text-blue-500"><i className="fab fa-linkedin text-xl"></i></a>
                <a className="text-gray-600 hover:text-blue-500"><i className="fab fa-instagram text-xl"></i></a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            <p>&copy; 2025 HealthGuard AI. All rights reserved.</p>
          </div>
        </footer>
        {/* Auth Modal */}
        {showAuth && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => {
                  setShowAuth(false);
                  setFormData({ email: '', password: '', name: '' });
                  setErrors({});
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Log In' : 'Create Account'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isLogin ? 'Log in to your account' : 'Join our healthcare community'}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white !rounded-button whitespace-nowrap hover:bg-blue-600 transition-colors duration-200"
                >
                  {isLogin ? 'Log In' : 'Create Account'}
                </button>
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    console.log('Google sign in');
                    // Here you would implement Google OAuth
                  }}
                  className="w-full py-2 px-4 bg-white border border-gray-300 !rounded-button whitespace-nowrap hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <i className="fab fa-google text-[#4285f4]"></i>
                  <span className="text-gray-700">Continue with Google</span>
                </button>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setFormData({ email: '', password: '', name: '' });
                      setErrors({});
                    }}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
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

export default App
