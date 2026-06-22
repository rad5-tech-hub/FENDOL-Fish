import React from 'react';
import { Metadata } from 'next';
import GalleryContent from '@/src/components/ui/GalleryContent';

export const metadata: Metadata = {
  title: 'Gallery',
};

export default function GalleryPage() {
  return <GalleryContent />;
}
