'use client';

import { useState } from 'react';
import OnboardingFlow from '@/components/OnboardingFlow';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard'>('onboarding');
  const [userProfile, setUserProfile] = useState<any>(null);

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-black">
      {currentView === 'onboarding' ? (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard profile={userProfile} />
      )}
    </div>
  );
}

