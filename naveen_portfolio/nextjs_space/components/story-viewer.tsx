'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { resumeData } from '@/data/resume-data';
import { useEffect, useState } from 'react';

interface StoryViewerProps {
  storyKey: string;
  onClose: () => void;
}

export default function StoryViewer({ storyKey, onClose }: StoryViewerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { onClose?.(); return 100; }
        return p + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onClose]);

  const renderContent = () => {
    switch (storyKey) {
      case 'experience':
        return (
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold neon-glow">Experience</h3>
            {(resumeData?.experiences ?? []).map((exp: any, i: number) => (
              <div key={i} className="bg-card/50 rounded-lg p-4 border border-border">
                <p className="font-display font-bold text-primary">{exp?.role ?? ''}</p>
                <p className="text-sm text-accent">{exp?.company ?? ''}</p>
                <p className="text-xs text-muted-foreground">{exp?.period ?? ''} • {exp?.location ?? ''}</p>
                <ul className="mt-2 space-y-1">
                  {(exp?.bullets ?? []).map((b: string, j: number) => (
                    <li key={j} className="text-xs text-foreground/80 flex gap-1.5">
                      <span className="text-primary mt-0.5">▸</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold neon-glow">Skills</h3>
            {Object.entries(resumeData?.skills ?? {}).map(([cat, items]: [string, any]) => (
              <div key={cat}>
                <p className="font-sans text-sm font-semibold text-accent capitalize mb-2">{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {(items ?? []).map((s: string) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold neon-glow">Education</h3>
            {(resumeData?.education ?? []).map((e: any, i: number) => (
              <div key={i} className="bg-card/50 rounded-lg p-4 border border-border">
                <p className="font-display font-bold text-primary">{e?.degree ?? ''}</p>
                <p className="text-sm text-accent">{e?.institution ?? ''}</p>
                <p className="text-xs text-muted-foreground">{e?.gpa ?? ''} • {e?.date ?? ''}</p>
              </div>
            ))}
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold neon-glow">Certifications</h3>
            {(resumeData?.certifications ?? []).map((c: any, i: number) => (
              <div key={i} className="bg-card/50 rounded-lg p-4 border border-border">
                <p className="font-display font-bold text-primary text-sm">{c?.name ?? ''}</p>
                <p className="text-xs text-muted-foreground">{c?.issuer ?? ''} • {c?.date ?? ''}</p>
              </div>
            ))}
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold neon-glow">Contact</h3>
            <div className="bg-card/50 rounded-lg p-4 border border-border space-y-2">
              <p className="text-sm"><span className="text-accent">Email:</span> <span suppressHydrationWarning>{resumeData?.email ?? ''}</span></p>
              <p className="text-sm"><span className="text-accent">Location:</span> {resumeData?.location ?? ''}</p>
              <p className="text-sm"><span className="text-accent">LinkedIn:</span> <a href={resumeData?.linkedin ?? '#'} className="text-primary underline" target="_blank" rel="noopener noreferrer">Profile</a></p>
              <p className="text-sm"><span className="text-accent">GitHub:</span> <a href={resumeData?.github ?? '#'} className="text-primary underline" target="_blank" rel="noopener noreferrer">NAVEENPAUL257</a></p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md max-h-[85vh] bg-background rounded-xl overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="h-0.5 bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">NS</span>
            </div>
            <span className="font-sans text-sm font-semibold">naveen_sivakumar</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
}
