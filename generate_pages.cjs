const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'about', title: 'About Us' },
  { path: 'admin', title: 'Admin' },
  { path: 'careers', title: 'Careers' },
  { path: 'checkout', title: 'Checkout' },
  { path: 'contact', title: 'Contact Us' },
  { path: 'dashboard', title: 'Dashboard' },
  { path: 'distributors', title: 'Distributors' },
  { path: 'gallery', title: 'Gallery' },
  { path: 'login', title: 'Login' },
  { path: 'market', title: 'Market' },
  { path: 'recipes', title: 'Recipes' },
  { path: 'referral', title: 'Referral' },
  { path: 'signup', title: 'Sign Up' },
  { path: 'track', title: 'Track Order' }
];

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

pages.forEach(page => {
  const contentName = capitalize(page.path) + 'Content';
  const dirPath = path.join('src', 'app', page.path);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const content = `import React from 'react';
import { Metadata } from 'next';
import ${contentName} from '@/src/components/ui/${contentName}';

export const metadata: Metadata = {
  title: '${page.title}',
};

export default function ${capitalize(page.path)}Page() {
  return <${contentName} />;
}
`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

// Home Page
const homeContent = `import React from 'react';
import HomeContent from '@/src/components/ui/HomeContent';

export default function HomePage() {
  return <HomeContent />;
}
`;
fs.writeFileSync(path.join('src', 'app', 'page.tsx'), homeContent);

// Product Detail
const productDir = path.join('src', 'app', 'product', '[id]');
if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });
const productContent = `import React from 'react';
import { Metadata } from 'next';
import ProductDetailContent from '@/src/components/ui/ProductDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: \`Product \${resolvedParams.id}\`,
  };
}

export default function ProductDetailPage(props: { params: any, searchParams?: any }) {
  return <ProductDetailContent {...props} />;
}
`;
fs.writeFileSync(path.join(productDir, 'page.tsx'), productContent);
