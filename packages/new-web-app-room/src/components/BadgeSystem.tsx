'use client';

import { useState } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  issuer: string;
  issuedDate: string;
  category: 'skill' | 'community' | 'project' | 'certification';
  isPermanent: boolean;
  expiryDate?: string;
  metadata: {
    image: string;
    onChainHash?: string;
  };
}

interface BadgeSystemProps {
  userAddress?: string;
}

export default function BadgeSystem({ userAddress }: BadgeSystemProps) {
  // Mock badge data
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'First Passport',
      description: 'Created your first Nexar passport',
      issuer: 'Nexar Protocol',
      issuedDate: new Date().toISOString(),
      category: 'community',
      isPermanent: true,
      metadata: {
        image: '🎉',
      },
    },
    {
      id: '2',
      name: 'Early Adopter',
      description: 'Joined during beta phase',
      issuer: 'Nexar Protocol',
      issuedDate: new Date().toISOString(),
      category: 'community',
      isPermanent: true,
      metadata: {
        image: '🚀',
      },
    },
  ]);

  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'skill':
        return 'from-blue-500 to-cyan-500';
      case 'community':
        return 'from-purple-500 to-pink-500';
      case 'project':
        return 'from-green-500 to-emerald-500';
      case 'certification':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleVerifyOnChain = (badge: Badge) => {
    // Mock verification - will connect to blockchain later
    alert(`Verifying badge "${badge.name}" on-chain...\n\nThis will connect to the blockchain to verify the SBT.`);
  };

  const handleShareBadge = (badge: Badge) => {
    // Mock share functionality
    alert(`Sharing badge "${badge.name}"...\n\nShare link: nexar.passport/${userAddress}/badge/${badge.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className="group cursor-pointer rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all p-6 hover:scale-105"
          >
            {/* Badge Image */}
            <div className={`w-full aspect-square rounded-lg bg-gradient-to-br ${getCategoryColor(badge.category)} flex items-center justify-center text-6xl mb-4`}>
              {badge.metadata.image}
            </div>

            {/* Badge Info */}
            <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
              {badge.name}
            </h3>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">
              {badge.description}
            </p>

            {/* Badge Meta */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">by {badge.issuer}</span>
              <span className={`px-2 py-1 rounded-full ${badge.isPermanent ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {badge.isPermanent ? 'Permanent' : 'Temporary'}
              </span>
            </div>
          </div>
        ))}

        {/* Add Badge Placeholder */}
        <button className="rounded-xl bg-white/5 border-2 border-dashed border-white/20 hover:border-purple-500/50 transition-all p-6 flex flex-col items-center justify-center min-h-[300px] group">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">➕</div>
          <p className="text-gray-400 group-hover:text-purple-400 transition-colors">Request New Badge</p>
        </button>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-6">
              {/* Badge Image */}
              <div className={`w-48 h-48 rounded-xl bg-gradient-to-br ${getCategoryColor(selectedBadge.category)} flex items-center justify-center text-8xl flex-shrink-0`}>
                {selectedBadge.metadata.image}
              </div>

              {/* Badge Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedBadge.name}</h2>
                    <p className="text-gray-400">{selectedBadge.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBadge(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Metadata */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Issued By</span>
                    <span className="font-medium">{selectedBadge.issuer}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Issue Date</span>
                    <span className="font-medium">{new Date(selectedBadge.issuedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Category</span>
                    <span className="font-medium capitalize">{selectedBadge.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${selectedBadge.isPermanent ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {selectedBadge.isPermanent ? 'Permanent SBT' : `Expires ${selectedBadge.expiryDate}`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleVerifyOnChain(selectedBadge)}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    🔗 Verify On-Chain
                  </button>
                  <button
                    onClick={() => handleShareBadge(selectedBadge)}
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
                  >
                    📤 Share Badge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

