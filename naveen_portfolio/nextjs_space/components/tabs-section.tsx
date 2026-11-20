'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, Briefcase, Code, Star, ExternalLink } from 'lucide-react';
import { resumeData } from '@/data/resume-data';
import { githubRepos } from '@/data/github-projects';

const tabs = [
  { key: 'posts', label: 'Projects', icon: Grid3X3 },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'skills', label: 'Skills', icon: Code },
];

const projectColors = [
  'from-primary/30 to-secondary/20',
  'from-accent/30 to-primary/20',
  'from-secondary/30 to-accent/20',
  'from-primary/20 to-accent/30',
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const allProjects = [
    ...(resumeData?.projects ?? []).map((p: any) => ({
      name: p?.name ?? '',
      subtitle: p?.subtitle ?? '',
      description: p?.description ?? '',
      tech: p?.tech ?? [],
      type: 'resume' as const,
      url: null,
      language: (p?.tech ?? [])?.[0] ?? 'Python',
      stars: 0,
    })),
    ...(githubRepos ?? []).map((r: any) => ({
      name: r?.name ?? '',
      subtitle: '',
      description: r?.description ?? 'GitHub project',
      tech: r?.topics ?? [],
      type: 'github' as const,
      url: r?.url ?? '',
      language: r?.language ?? 'Unknown',
      stars: r?.stars ?? 0,
    })),
  ];

  return (
    <div className="py-4">
      {/* Tab nav */}
      <div className="flex justify-center border-t border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-6 py-3 text-xs font-sans font-semibold uppercase tracking-wider border-t-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={14} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'posts' && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-3 gap-1 mt-1"
          >
            {allProjects.map((p: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedProject(p)}
                className="relative aspect-square overflow-hidden rounded group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${projectColors?.[i % (projectColors?.length ?? 1)] ?? projectColors[0]} flex flex-col items-center justify-center p-2 transition-all group-hover:scale-105`}>
                  <div className="text-primary font-mono text-lg md:text-2xl font-bold mb-1">
                    {(p?.name ?? '??')?.slice(0, 2)?.toUpperCase()}
                  </div>
                  <p className="text-[10px] md:text-xs text-foreground/80 text-center font-sans leading-tight line-clamp-2">
                    {p?.name ?? ''}
                  </p>
                  <span className="mt-1 text-[9px] text-accent font-mono">{p?.language ?? ''}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-sans font-semibold">View</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 mt-4"
          >
            {(resumeData?.experiences ?? []).map((exp: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-lg p-5 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-bold text-primary">{exp?.role ?? ''}</h4>
                    <p className="text-sm text-accent">{exp?.company ?? ''}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{exp?.period ?? ''}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{exp?.location ?? ''}</p>
                <ul className="mt-3 space-y-1.5">
                  {(exp?.bullets ?? []).map((b: string, j: number) => (
                    <li key={j} className="text-sm text-foreground/80 flex gap-2">
                      <span className="text-primary flex-shrink-0 mt-0.5">▸</span> {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 space-y-6"
          >
            {Object.entries(resumeData?.skills ?? {}).map(([cat, items]: [string, any], i: number) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent mb-3">{cat}</h4>
                <div className="flex flex-wrap gap-2">
                  {(items ?? []).map((skill: string, j: number) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 text-sm font-mono transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="w-full max-w-lg bg-background rounded-xl overflow-hidden border border-border"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Header gradient */}
              <div className="h-32 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 flex items-center justify-center">
                <span className="font-display text-4xl font-extrabold text-primary neon-glow">
                  {(selectedProject?.name ?? '??')?.slice(0, 3)?.toUpperCase()}
                </span>
              </div>
              <div className="p-5">
                {/* Instagram-style header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">NS</span>
                  </div>
                  <span className="font-sans text-sm font-semibold">naveen_sivakumar</span>
                </div>
                <h3 className="font-display text-lg font-bold">{selectedProject?.name ?? ''}</h3>
                {selectedProject?.subtitle && <p className="text-sm text-accent mb-2">{selectedProject.subtitle}</p>}
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">{selectedProject?.description ?? ''}</p>
                {(selectedProject?.tech?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(selectedProject?.tech ?? []).map((t: string) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-mono">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star size={12} /> {selectedProject?.stars ?? 0}</span>
                  <span className="font-mono">{selectedProject?.language ?? ''}</span>
                </div>
                {selectedProject?.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/80 transition-colors"
                  >
                    <ExternalLink size={14} /> View on GitHub
                  </a>
                )}
              </div>
              <div className="border-t border-border p-3 text-center">
                <button onClick={() => setSelectedProject(null)} className="text-sm text-muted-foreground hover:text-foreground">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
