import React from 'react';
import { Metadata } from 'next';
import ContactContent from '@/src/components/ui/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function ContactPage() {
  return <ContactContent />;
}
