import React from 'react';
import type { Metadata } from 'next';
import { UserProvider } from '../providers/userProvider';

export const metadata: Metadata = {
  title: 'Bienvenue sur KeepFit | Configuration du profil',
  description: 'Finalisez la création de votre compte KeepFit en quelques étapes.',
};

export default function OnboardingLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <UserProvider>
        <div className="onboarding-layout-root">
          {children}
        </div>
      </UserProvider>
    </>
  );
}