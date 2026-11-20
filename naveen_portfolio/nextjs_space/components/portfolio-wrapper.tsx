'use client';

import dynamic from 'next/dynamic';

const PortfolioApp = dynamic(() => import('@/components/portfolio-app'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-primary neon-glow mb-2">
          NAVEEN SIVAKUMAR
        </h1>
        <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-8">
          Loading Portfolio...
        </p>
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent gta-load-bar rounded-full" />
        </div>
      </div>
    </div>
  ),
});

export default function PortfolioWrapper() {
  return <PortfolioApp />;
}
