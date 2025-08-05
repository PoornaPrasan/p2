import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'citizen' | 'provider' | 'admin'>('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
      const redirectPath = loggedInUser.role === 'citizen' ? '/citizen' : 
                          loggedInUser.role === 'provider' ? '/provider' : '/admin';
      navigate(redirectPath);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 'citizen',
      label: 'Citizen',
      description: 'Submit and track complaints',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-100'
    },
    {
      id: 'provider',
      label: 'Service Provider',
      description: 'Manage and resolve complaints',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      iconColor: 'text-green-100'
    },
    {
      id: 'admin',
      label: 'Administrator',
      description: 'System administration',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-100'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900" style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <FileText className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">PublicCare</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Your gateway to better public services
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Select your role
                </label>
                <div className="grid gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div
                        key={role.id}
                        className={`relative cursor-pointer transition-all duration-300 ${selectedRole === role.id ? 'scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
                        onClick={() => setSelectedRole(role.id as 'citizen' | 'provider' | 'admin')}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${role.color} rounded-xl`}></div>
                        <div className={`relative flex items-center p-4 rounded-xl border border-transparent ${selectedRole === role.id ? 'bg-white/5 backdrop-blur-sm border-white/20' : 'bg-white/0'}`}>
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${role.color} mr-4`}>
                            <Icon className={`w-6 h-6 ${role.iconColor}`} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-white cursor-pointer">
                              {role.label}
                            </label>
                            <p className="text-xs text-white/70">{role.description}</p>
                          </div>
                          <div className="ml-auto">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedRole === role.id ? 'border-white bg-blue-500' : 'border-white/30'}`}>
                              {selectedRole === role.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email address
                </label>
                <div className="mt-1 relative rounded-lg">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Password
                </label>
                <div className="mt-1 relative rounded-lg">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-400/10 border border-red-400/30 text-red-100 px-4 py-3 text-sm flex items-start">
                  <svg className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign in
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-transparent text-white/70 text-sm font-medium">Demo credentials</span>
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-white/80 bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                  <strong className="font-medium">Citizen:</strong> citizen@demo.com / password
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                  <strong className="font-medium">Provider:</strong> provider@demo.com / password
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <strong className="font-medium">Admin:</strong> admin@demo.com / password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;