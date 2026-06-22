import React from 'react';
import { Metadata } from 'next';
import AboutContent from '@/src/components/ui/AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function AboutPage() {
  return <AboutContent />;
}
