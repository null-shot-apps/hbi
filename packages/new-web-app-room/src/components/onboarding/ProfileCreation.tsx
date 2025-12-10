'use client';

import { useState } from 'react';

interface ProfileCreationProps {
  persona: string;
  onComplete: (profile: any) => void;
  onBack: () => void;
}

const skillsByPersona: Record<string, string[]> = {
  developer: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Solidity', 'Web3', 'Smart Contracts', 'Rust', 'Go'],
  creative: ['UI/UX Design', 'Graphic Design', 'Illustration', 'Animation', '3D Modeling', 'Branding', 'Photography', 'Video Editing'],
  athlete: ['Basketball', 'Soccer', 'Tennis', 'Swimming', 'Running', 'Cycling', 'Martial Arts', 'Fitness Training'],
  gamer: ['FPS', 'MOBA', 'RPG', 'Strategy', 'Battle Royale', 'Speedrunning', 'Esports', 'Game Design'],
  student: ['Mathematics', 'Science', 'Literature', 'History', 'Computer Science', 'Engineering', 'Business', 'Arts'],
};

export default function ProfileCreation({ persona, onComplete, onBack }: ProfileCreationProps) {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');

  const availableSkills = skillsByPersona[persona] || [];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills(prev => [...prev, customSkill]);
      setCustomSkill('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock IPFS upload - will be replaced with real IPFS integration
      const mockIpfsHash = 'Qm' + Math.random().toString(36).substring(2, 15);
      setProfileImage(mockIpfsHash);
    }
  };

  const handleSubmit = () => {
    if (!username) return;

    const profile = {
      username,
      bio,
      skills: selectedSkills,
      profileImage,
      createdAt: new Date().toISOString(),
    };

    onComplete(profile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Create Your Passport
          </h1>
          <p className="text-lg text-gray-400">
            Build your on-chain identity
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 space-y-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl overflow-hidden">
                {profileImage ? (
                  <div className="text-white text-sm p-4 text-center break-all">
                    {profileImage.substring(0, 10)}...
                  </div>
                ) : (
                  <span>👤</span>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-sm font-semibold">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">Click to upload profile image</p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username *
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="yourname"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                .passport
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Your unique on-chain identifier
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              {bio.length}/280 characters
            </p>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Skills & Interests
            </label>
            
            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSkills.includes(skill)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* Selected custom skills */}
            {selectedSkills.filter(s => !availableSkills.includes(s)).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSkills
                  .filter(s => !availableSkills.includes(s))
                  .map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => toggleSkill(skill)}
                        className="hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            )}

            {/* Add custom skill */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                placeholder="Add custom skill..."
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
              <button
                onClick={addCustomSkill}
                className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!username}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Passport
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your passport will be minted as a Soulbound NFT on-chain
          </p>
        </div>
      </div>
    </div>
  );
}

