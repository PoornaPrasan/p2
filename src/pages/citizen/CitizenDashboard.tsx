import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Plus,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react';
import { useComplaints } from '../../contexts/ComplaintContext';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

const CitizenDashboard: React.FC = () => {
  const { complaints, myComplaints, analytics } = useComplaints();
  const { user } = useAuth();
  
  const userComplaints = myComplaints.slice(0, 5);
  const recentComplaints = complaints.slice(0, 6);

  const stats = [
    {
      name: 'My Complaints',
      value: myComplaints.length,
      icon: FileText,
      color: 'text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      href: '/citizen/track'
    },
    {
      name: 'In Progress',
      value: myComplaints.filter(c => c.status === 'in_progress').length,
      icon: Clock,
      color: 'text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      href: '/citizen/track'
    },
    {
      name: 'Resolved',
      value: myComplaints.filter(c => c.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-gradient-to-br from-green-50 to-green-100',
      borderColor: 'border-green-200',
      href: '/citizen/track'
    },
    {
      name: 'Community Issues',
      value: complaints.length,
      icon: Users,
      color: 'text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      href: '/citizen/community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with enhanced styling */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl"></div>
          <div className="relative p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600 mt-1 font-medium">Track your complaints and stay updated on community issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Report a New Issue</h2>
                  <p className="text-blue-100 text-lg">Help improve your community by reporting problems</p>
                </div>
                <Link
                  to="/citizen/submit"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Submit Complaint</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.name}
                to={stat.href}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.color} border ${stat.borderColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced My Recent Complaints */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">My Recent Complaints</h3>
                </div>
                <Link
                  to="/citizen/track"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {userComplaints.length > 0 ? (
                <div className="space-y-3">
                  {userComplaints.map((complaint, index) => (
                    <div 
                      key={complaint.id} 
                      className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/50 transition-all duration-300 border border-transparent hover:border-blue-100"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className={`p-2 rounded-lg ${complaint.isEmergency ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                          {complaint.isEmergency ? (
                            <AlertTriangle className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-200">
                          {complaint.title}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{complaint.location.address}</span>
                        </div>
                        <div className="flex items-center mt-2 space-x-3">
                          <StatusBadge status={complaint.status} />
                          <div className="flex items-center text-xs text-gray-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium mb-3">No complaints submitted yet</p>
                  <Link
                    to="/citizen/submit"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Submit your first complaint</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Community Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Community Activity</h3>
                </div>
                <Link
                  to="/citizen/community"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentComplaints.map((complaint, index) => (
                  <div 
                    key={complaint.id} 
                    className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50/50 transition-all duration-300 border border-transparent hover:border-purple-100"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-purple-700 transition-colors duration-200">
                        {complaint.title}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{complaint.location.address}</span>
                      </div>
                      <div className="flex items-center mt-2 space-x-3">
                        <StatusBadge status={complaint.status} />
                        <span className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-1 rounded-full">
                          {complaint.category.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Community Overview */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Community Overview</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-1">{analytics.totalComplaints}</div>
                <div className="text-sm font-medium text-blue-700">Total Complaints</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl font-bold text-green-600 mb-1">{analytics.resolvedComplaints}</div>
                <div className="text-sm font-medium text-green-700">Resolved</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {Math.round(((analytics.resolvedComplaints / analytics.totalComplaints) * 100) || 0)}%
                </div>
                <div className="text-sm font-medium text-orange-700">Success Rate</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-1">{analytics.averageResolutionTime}d</div>
                <div className="text-sm font-medium text-purple-700">Avg Resolution</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;