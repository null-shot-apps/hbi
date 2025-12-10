'use client';

import { useState } from 'react';

interface WalletSetupProps {
  onConnect: (address: string) => void;
  onBack: () => void;
}

export default function WalletSetup({ onConnect, onBack }: WalletSetupProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState<'crypto' | 'email' | null>(null);
  const [email, setEmail] = useState('');

  const handleCryptoWallet = async () => {
    setIsConnecting(true);
    // Mock wallet connection - will be replaced with real Web3Modal
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
      onConnect(mockAddress);
      setIsConnecting(false);
    }, 1500);
  };

  const handleEmailWallet = async () => {
    if (!email) return;
    setIsConnecting(true);
    // Mock custodial wallet creation - will be replaced with real service
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
      onConnect(mockAddress);
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
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
            Connect Your Wallet
          </h1>
          <p className="text-lg text-gray-400">
            Choose how you want to create your passport
          </p>
        </div>

        {!connectionMethod ? (
          <div className="space-y-4">
            {/* Crypto Wallet Option */}
            <button
              onClick={() => setConnectionMethod('crypto')}
              className="w-full group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20"
            >
              <div className="flex items-center gap-6">
                <div className="text-5xl">🔐</div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Crypto Wallet
                  </h3>
                  <p className="text-gray-400">
                    Connect with MetaMask, Coinbase Wallet, or WalletConnect
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Email Wallet Option */}
            <button
              onClick={() => setConnectionMethod('email')}
              className="w-full group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20"
            >
              <div className="flex items-center gap-6">
                <div className="text-5xl">📧</div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Email Wallet
                  </h3>
                  <p className="text-gray-400">
                    Create a custodial wallet with just your email
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        ) : connectionMethod === 'crypto' ? (
          <div className="space-y-6">
            <button
              onClick={() => setConnectionMethod(null)}
              className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to options
            </button>

            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Select Your Wallet
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleCryptoWallet}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-3xl">🦊</div>
                  <span className="text-lg font-semibold text-white">MetaMask</span>
                </button>

                <button
                  onClick={handleCryptoWallet}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-3xl">🔵</div>
                  <span className="text-lg font-semibold text-white">Coinbase Wallet</span>
                </button>

                <button
                  onClick={handleCryptoWallet}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-3xl">🔗</div>
                  <span className="text-lg font-semibold text-white">WalletConnect</span>
                </button>
              </div>

              {isConnecting && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="mt-2 text-gray-400">Connecting...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setConnectionMethod(null)}
              className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to options
            </button>

            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Create Email Wallet
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <button
                  onClick={handleEmailWallet}
                  disabled={!email || isConnecting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? 'Creating Wallet...' : 'Create Wallet'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  A secure wallet will be created and linked to your email
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

