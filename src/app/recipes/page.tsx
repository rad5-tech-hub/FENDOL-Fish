import React from 'react';
import { Metadata } from 'next';
import RecipesContent from '@/src/components/ui/RecipesContent';

export const metadata: Metadata = {
  title: 'Recipes',
};

export default function RecipesPage() {
  return <RecipesContent />;
}
