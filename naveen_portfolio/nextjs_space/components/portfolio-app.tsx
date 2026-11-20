'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroScene from './hero-scene';
import ProfileHeader from './profile-header';
import StoryHighlights from './story-highlights';
import StoryViewer from './story-viewer';
import TabsSection from './tabs-section';
import ContactSection from './contact-section';
import AiAssistant from './ai-assistant';
import Footer from './footer';

export default function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Palm tree silhouettes */}
          <div className="flex justify-center gap-8 mb-6">
            <svg width="40" height="60" viewBox="0 0 40 60" className="text-primary/30">
              <path d="M20 60V30M20 30C10 20 2 22 0 18c5 2 15 0 20 2M20 30c10-10 18-8 20-12-5 2-15 0-20 2M20 30C15 20 8 18 5 12c3 4 10 6 15 8M20 30c5-10 12-12 15-18-3 4-10 6-15 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <svg width="40" height="60" viewBox="0 0 40 60" className="text-accent/30">
              <path d="M20 60V30M20 30C10 20 2 22 0 18c5 2 15 0 20 2M20 30c10-10 18-8 20-12-5 2-15 0-20 2M20 30C15 20 8 18 5 12c3 4 10 6 15 8M20 30c5-10 12-12 15-18-3 4-10 6-15 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-primary neon-glow mb-2">
            NAVEEN SIVAKUMAR
          </h1>
          <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-1">AI / LLM Analyst</p>
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-10">
            Loading Mission Briefing...
          </p>
          <div className="w-72 h-1.5 bg-muted rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent gta-load-bar rounded-full" />
          </div>
          <p className="font-mono text-[10px] text-muted-foreground mt-4 tracking-widest">
            COIMBATORE, TAMIL NADU
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {activeStory && (
          <StoryViewer storyKey={activeStory} onClose={() => setActiveStory(null)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroScene />

        <main className="relative z-10">
          <div className="max-w-[935px] mx-auto px-4">
            <ProfileHeader />
            <StoryHighlights onStoryClick={setActiveStory} />
            <TabsSection />
          </div>
          <ContactSection />
        </main>

        <Footer />
      </motion.div>

      <AiAssistant />
    </>
  );
}
