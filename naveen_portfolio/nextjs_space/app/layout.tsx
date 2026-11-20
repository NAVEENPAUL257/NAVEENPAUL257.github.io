export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Naveen Sivakumar — AI/LLM Analyst Portfolio',
  description:
    'MLOps-focused AI/LLM Analyst portfolio with a GTA Vice City inspired design. Explore projects, experience, and skills.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: 'Naveen Sivakumar — AI/LLM Analyst Portfolio',
    description: 'Explore projects, experience, and skills.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className="font-sans antialiased min-h-screen">
        <ChunkLoadErrorHandler />
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
