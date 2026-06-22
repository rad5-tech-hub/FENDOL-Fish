import React from 'react';
import { Metadata } from 'next';
import SignupContent from '@/src/components/ui/SignupContent';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return <SignupContent />;
}
