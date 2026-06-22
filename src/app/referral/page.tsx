import React from 'react';
import { Metadata } from 'next';
import ReferralContent from '@/src/components/ui/ReferralContent';

export const metadata: Metadata = {
  title: 'Referral',
};

export default function ReferralPage() {
  return <ReferralContent />;
}
