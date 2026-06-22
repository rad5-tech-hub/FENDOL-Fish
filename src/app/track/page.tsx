import React from 'react';
import { Metadata } from 'next';
import TrackContent from '@/src/components/ui/TrackContent';

export const metadata: Metadata = {
  title: 'Track Order',
};

export default function TrackPage() {
  return <TrackContent />;
}
