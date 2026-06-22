import React from 'react';
import { Metadata } from 'next';
import MarketContent from '@/src/components/ui/MarketContent';

export const metadata: Metadata = {
  title: 'Market',
};

export default function MarketPage() {
  return <MarketContent />;
}
