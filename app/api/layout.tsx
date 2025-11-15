import './globals.css';
import '../styles/brand.css';
import { Inter } from 'next/font/google';
import { Libre_Baskerville } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const libre = Libre_Baskerville({ weight: ['700'], subsets: ['latin'], variable: '--font-libre' });

export const metadata = {
  title: 'Trails & Tails',
  description: 'Private yards. Big adventures.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${libre.variable}`}>
      <body>
        <header style={{ background: 'var(--bb-bg-surface)', borderBottom: '1px solid var(--bb-border)' }}>
          <div style={{ maxWidth: 1144, margin: '0 auto', padding: '12px 16px', display: 'flex', gap: 16, alignItems: 'center' }}>
            <img src="/emblem.svg" width={32} height={32} alt="Trails & Tails emblem" />
            <a href="/" style={{ fontFamily: 'var(--bb-font-heading)', color: 'var(--bb-brand-2)', fontWeight: 700 }}>Trails &amp; Tails</a>
            <nav style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
              <a href="/search">Find a yard</a>
              <a href="/host">Become a Host</a>
              <a href="/account">Account</a>
              <a href="/flutter-demo">Try Flutter UI</a>
            </nav>
          </div>
        </header>
        <main style={{ maxWidth: 1144, margin: '0 auto', padding: '24px 16px' }}>{children}</main>
        <footer style={{ maxWidth: 1144, margin: '0 auto', padding: '24px 16px', color: 'var(--bb-brand-2)' }}>
          <small>© {new Date().getFullYear()} Trails &amp; Tails</small>
        </footer>
      </body>
    </html>
  );
}
