'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function HeroButton({ href, children }: HeroButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        backgroundColor: isHovered ? 'var(--bb-ridge)' : 'var(--bb-brand)',
        color: '#FFFFFF',
        padding: '16px 32px',
        borderRadius: 'var(--bb-radius-card)',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '18px',
        transition: 'all 160ms cubic-bezier(0.2,0.8,0.2,1)',
        display: 'inline-block',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}
