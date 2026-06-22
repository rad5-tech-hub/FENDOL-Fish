import React from 'react';
import { Metadata } from 'next';
import ProductDetailContent from '@/src/components/ui/ProductDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Product ${resolvedParams.id}`,
  };
}

export default function ProductDetailPage(props: { params: any, searchParams?: any }) {
  return <ProductDetailContent {...props} />;
}
