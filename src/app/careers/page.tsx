import React from 'react';
import { Metadata } from 'next';
import CareersContent from '@/src/components/ui/CareersContent';

export const metadata: Metadata = {
  title: 'Careers',
};

export default function CareersPage() {
  return <CareersContent />;
}
