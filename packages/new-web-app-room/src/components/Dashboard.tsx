'use client';

import { useState } from 'react';

interface DashboardProps {
  profile: any;
}

export default function Dashboard({ profile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'projects'>('overview');
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'communities'>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-sm flex flex-col">
        <div className="p-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nexar
          </div>
          <p className="text-xs text-gray-500 mt-1">Web3 Social Passport</p>
        </div>

        <nav className="flex-1 px-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              currentView === 'dashboard'
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-xl">🏠</span>
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentView('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              currentView === 'profile'
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-xl">👤</span>
            <span className="font-medium">Profile</span>
          </button>

          <button
            onClick={() => setCurrentView('communities')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              currentView === 'communities'
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-xl">👥</span>
            <span className="font-medium">Communities</span>
          </button>

          <div className="my-4 border-t border-white/10"></div>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <span className="text-xl">⚙️</span>
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
              {profile.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{profile.username}</div>
              <div className="text-xs text-gray-500 truncate">{profile.persona}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {currentView === 'dashboard' && (
          <main className="max-w-7xl mx-auto px-8 py-8">

        {/* Profile Header */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl flex-shrink-0">
              {profile.profileImage ? '🖼️' : '👤'}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{profile.username}.passport</h1>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                  {profile.persona}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{profile.bio || 'No bio yet'}</p>
              
              {/* Skills */}
              {profile.skills && profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">0</div>
                <div className="text-xs text-gray-500">Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">0</div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">1</div>
                <div className="text-xs text-gray-500">Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'overview'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'badges'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Badges
            {activeTab === 'badges' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'projects'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Projects
            {activeTab === 'projects' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                  Add Achievement
                </h3>
                <p className="text-sm text-gray-400">
                  Showcase your latest accomplishment
                </p>
              </button>

              <button className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group">
                <div className="text-3xl mb-3">📁</div>
                <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                  Add Project
                </h3>
                <p className="text-sm text-gray-400">
                  Display your work portfolio
                </p>
              </button>

              <button className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                  Join Community
                </h3>
                <p className="text-sm text-gray-400">
                  Connect with like-minded people
                </p>
              </button>
            </div>

            {/* Activity Feed */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="text-center py-12 text-gray-500">
                <div className="text-5xl mb-4">📊</div>
                <p>No activity yet. Start building your passport!</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="rounded-xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Badges</h2>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                Request Badge
              </button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-4">🎖️</div>
              <p>No badges earned yet</p>
              <p className="text-sm mt-2">Complete achievements to earn your first badge</p>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="rounded-xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Projects</h2>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                Add Project
              </button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-4">📂</div>
              <p>No projects yet</p>
              <p className="text-sm mt-2">Showcase your work to build your portfolio</p>
            </div>
          </div>
        )}
          </main>
        )}

        {currentView === 'profile' && (
          <main className="max-w-7xl mx-auto px-8 py-8">
            <div className="rounded-xl bg-white/5 border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Full Profile View</h2>
              <p className="text-gray-400">Detailed profile page coming soon...</p>
            </div>
          </main>
        )}

        {currentView === 'communities' && (
          <main className="max-w-7xl mx-auto px-8 py-8">
            <div className="rounded-xl bg-white/5 border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">Communities</h2>
              <p className="text-gray-400">Join and manage communities...</p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}







