'use client';

import { useState } from 'react';
import PersonaSelection from './onboarding/PersonaSelection';
import WalletSetup from './onboarding/WalletSetup';
import ProfileCreation from './onboarding/ProfileCreation';

type OnboardingStep = 'persona' | 'wallet' | 'profile';

interface OnboardingFlowProps {
  onComplete: (profile: any) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('persona');
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona);
    setCurrentStep('wallet');
  };

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setCurrentStep('profile');
  };

  const handleProfileComplete = (profileData: any) => {
    const completeProfile = {
      ...profileData,
      persona: selectedPersona,
      walletAddress,
    };
    onComplete(completeProfile);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        {currentStep === 'persona' && (
          <PersonaSelection onSelect={handlePersonaSelect} />
        )}
        {currentStep === 'wallet' && (
          <WalletSetup onConnect={handleWalletConnect} onBack={() => setCurrentStep('persona')} />
        )}
        {currentStep === 'profile' && (
          <ProfileCreation 
            persona={selectedPersona}
            onComplete={handleProfileComplete}
            onBack={() => setCurrentStep('wallet')}
          />
        )}
      </div>
    </div>
  );
}

