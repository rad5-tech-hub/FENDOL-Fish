import React from 'react';
import { Metadata } from 'next';
import CheckoutContent from '@/src/components/ui/CheckoutContent';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
