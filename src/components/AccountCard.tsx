import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}>;

export default function AccountCard({ title, icon, children, className = '' }: Props) {
  return (
    <div className={`bg-surface border border-primary/5 p-8 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-black">{title}</h2>
          {icon && <div className="text-secondary">{icon}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
