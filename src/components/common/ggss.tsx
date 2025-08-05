import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, User, LogOut, Menu, X, Home,
  MapPin, BarChart3, Settings, Users, Wrench,
  ChevronDown, ChevronUp,  Award,
  Smartphone, Camera, Bell, Layers, Shield, 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navigationbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowUserMenu(false);
  };

  // Feature categories matching home page
  const features = [
    { icon: Smartphone, title: 'Mobile Reporting', to: '/features/mobile' },
    { icon: Camera, title: 'Visual Evidence', to: '/features/visual' },
    { icon: Bell, title: 'Real-time Alerts', to: '/features/alerts' },
    { icon: BarChart3, title: 'Analytics', to: '/features/analytics' },
    { icon: Layers, title: 'Multi-Department', to: '/features/departments' },
    { icon: Shield, title: 'Security', to: '/features/security' }
  ];

  const mainLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/how-it-works', label: 'How It Works', icon: MapPin },
    { to: '/success-stories', label: 'Success Stories', icon: Award },
    { to: '/contact', label: 'Contact', icon: Users }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-blue-900/90 backdrop-blur-sm border-b border-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-900" />
              </div>
              <span className="text-xl font-bold text-white">PublicCare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  location.pathname === link.to
                    ? 'text-yellow-400'
                    : 'text-white hover:text-yellow-300'
                }`}
              >
                <link.icon className="w-5 h-5 mr-2" />
                {link.label}
              </Link>
            ))}
            
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  showFeaturesMenu || location.pathname.startsWith('/features')
                    ? 'text-yellow-400'
                    : 'text-white hover:text-yellow-300'
                }`}
              >
                <span>Services</span>
                {showFeaturesMenu ? (
                  <ChevronUp className="w-5 h-5 ml-1" />
                ) : (
                  <ChevronDown className="w-5 h-5 ml-1" />
                )}
              </button>

              {showFeaturesMenu && (
                <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl z-10 border border-gray-200">
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {features.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <Link
                          key={feature.to}
                          to={feature.to}
                          onClick={() => setShowFeaturesMenu(false)}
                          className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {feature.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Report Issue Button */}
            <Link
              to="/report-issue"
              className="ml-4 bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Report Issue
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-white">{user.name}</span>
                  <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                        <hr className="border-gray-200 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center px-4 py-2 text-white hover:text-yellow-300 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900 to-blue-800 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium ${
                  location.pathname === link.to
                    ? 'bg-white/10 text-yellow-400'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <link.icon className="w-6 h-6 mr-3" />
                {link.label}
              </Link>
            ))}

            {/* Features Mobile Accordion */}
            <div className="px-4 py-3">
              <button
                onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
                className={`flex items-center justify-between w-full text-lg font-medium ${
                  showFeaturesMenu ? 'text-yellow-400' : 'text-white'
                }`}
              >
                <div className="flex items-center">
                  <Wrench className="w-6 h-6 mr-3" />
                  <span>Services</span>
                </div>
                {showFeaturesMenu ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {showFeaturesMenu && (
                <div className="mt-2 pl-4 space-y-2">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <Link
                        key={feature.to}
                        to={feature.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-white/10"
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {feature.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Report Issue Button (Mobile) */}
            <Link
              to="/report-issue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center mx-4 mt-4 bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              Report Issue
            </Link>

            {/* User Section (Mobile) */}
            {user ? (
              <div className="border-t border-white/20 pt-4 mt-4 px-4">
                <div className="flex items-center px-4 py-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <User className="w-10 h-10 rounded-full bg-white/10 p-2 mr-3 text-white" />
                  )}
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-xs text-blue-200 capitalize">{user.role}</div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg text-center font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigationbar;