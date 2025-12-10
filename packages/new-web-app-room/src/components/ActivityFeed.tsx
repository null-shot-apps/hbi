'use client';

import { useState } from 'react';

interface Activity {
  id: string;
  type: 'badge_earned' | 'project_added' | 'community_joined' | 'skill_verified' | 'profile_updated';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

export default function ActivityFeed() {
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      type: 'profile_updated',
      title: 'Profile Created',
      description: 'Welcome to Nexar! Your Web3 passport is now live.',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'badge_earned',
      title: 'Earned "First Passport" Badge',
      description: 'Congratulations on creating your first Nexar passport!',
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
    {
      id: '3',
      type: 'badge_earned',
      title: 'Earned "Early Adopter" Badge',
      description: 'You joined during the beta phase. Thank you for being an early supporter!',
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
  ]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'badge_earned':
        return '🏆';
      case 'project_added':
        return '📁';
      case 'community_joined':
        return '👥';
      case 'skill_verified':
        return '✅';
      case 'profile_updated':
        return '✏️';
      default:
        return '📌';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'badge_earned':
        return 'from-yellow-500 to-orange-500';
      case 'project_added':
        return 'from-blue-500 to-cyan-500';
      case 'community_joined':
        return 'from-purple-500 to-pink-500';
      case 'skill_verified':
        return 'from-green-500 to-emerald-500';
      case 'profile_updated':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="relative">
          {/* Timeline Line */}
          {index < activities.length - 1 && (
            <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent" />
          )}

          {/* Activity Card */}
          <div className="flex gap-4 group">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center text-xl flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform`}>
              {getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">{activity.title}</h3>
                <span className="text-xs text-gray-500">{getTimeAgo(activity.timestamp)}</span>
              </div>
              <p className="text-sm text-gray-400">{activity.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Load More */}
      {activities.length > 0 && (
        <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
          Load More Activity
        </button>
      )}
    </div>
  );
}

