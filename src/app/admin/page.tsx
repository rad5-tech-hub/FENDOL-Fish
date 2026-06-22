import React from 'react';
import { Metadata } from 'next';
import AdminContent from '@/src/components/ui/AdminContent';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminPage() {
  return <AdminContent />;
}
