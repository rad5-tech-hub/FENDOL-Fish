import React from 'react';
import { Metadata } from 'next';
import LoginContent from '@/src/components/ui/LoginContent';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return <LoginContent />;
}
