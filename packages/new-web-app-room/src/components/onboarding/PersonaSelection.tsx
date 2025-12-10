'use client';

import { useState } from 'react';

interface PersonaSelectionProps {
  onSelect: (persona: string) => void;
}

const personas = [
  {
    id: 'developer',
    title: 'Developer',
    icon: '💻',
    description: 'Build and showcase your code projects',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'creative',
    title: 'Creative',
    icon: '🎨',
    description: 'Display your design portfolio',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    id: 'athlete',
    title: 'Athlete',
    icon: '⚡',
    description: 'Track your sports achievements',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'gamer',
    title: 'Gamer',
    icon: '🎮',
    description: 'Show off your gaming stats',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'student',
    title: 'Student',
    icon: '📚',
    description: 'Build your learning journey',
    gradient: 'from-indigo-500 to-blue-500',
  },
];

export default function PersonaSelection({ onSelect }: PersonaSelectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Nexar</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Choose your identity to get started
          </p>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => onSelect(persona.id)}
              onMouseEnter={() => setHoveredId(persona.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/20"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {persona.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {persona.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {persona.description}
                </p>
              </div>

              {/* Animated border effect */}
              {hoveredId === persona.id && (
                <div className="absolute inset-0 rounded-2xl">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${persona.gradient} opacity-20 blur-xl`} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Don&apos;t worry, you can always change this later
          </p>
        </div>
      </div>
    </div>
  );
}

