import React from 'react';
import { Metadata } from 'next';
import DashboardContent from '@/src/components/ui/DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
