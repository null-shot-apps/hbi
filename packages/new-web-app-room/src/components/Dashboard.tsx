'use client';

import { useState } from 'react';

interface DashboardProps {
  profile: any;
}

export default function Dashboard({ profile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'projects'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
              Nexar
            </div>
            <nav className="flex items-center gap-4">
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Home
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Profile
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Communities
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
              Settings
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              {profile.username[0].toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
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
    </div>
  );
}


