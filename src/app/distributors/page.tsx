import React from 'react';
import { Metadata } from 'next';
import DistributorsContent from '@/src/components/ui/DistributorsContent';

export const metadata: Metadata = {
  title: 'Distributors',
};

export default function DistributorsPage() {
  return <DistributorsContent />;
}
