'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume-data';
import { githubRepos } from '@/data/github-projects';
import { MapPin, Briefcase, ExternalLink, Download, Mail } from 'lucide-react';

export default function ProfileHeader() {
  const totalProjects = (githubRepos?.length ?? 0) + (resumeData?.projects?.length ?? 0);
  const allSkills = [
    ...(resumeData?.skills?.languages ?? []),
    ...(resumeData?.skills?.frameworks ?? []),
    ...(resumeData?.skills?.cloud ?? []),
  ];

  return (
    <motion.section
      className="py-8 border-b border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-[86px] h-[86px] md:w-[150px] md:h-[150px] rounded-full story-ring p-[3px]">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <span className="font-display text-2xl md:text-5xl font-extrabold text-primary neon-glow">
                NS
              </span>
            </div>
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Stats row (mobile: below name, desktop: beside) */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
            <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight">
              {resumeData?.name ?? 'Naveen Sivakumar'}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <a
                href={resumeData?.linkedin ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-sans text-xs font-semibold hover:bg-primary/80 transition-colors flex items-center gap-1"
              >
                <ExternalLink size={12} /> LinkedIn
              </a>
              <a
                href={resumeData?.github ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-muted text-foreground font-sans text-xs font-semibold hover:bg-muted/70 transition-colors flex items-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 mb-3">
            <div className="text-center">
              <span className="font-display text-lg font-bold">{totalProjects}</span>
              <span className="text-muted-foreground text-sm ml-1">projects</span>
            </div>
            <div className="text-center">
              <span className="font-display text-lg font-bold">1+</span>
              <span className="text-muted-foreground text-sm ml-1">years exp</span>
            </div>
            <div className="text-center">
              <span className="font-display text-lg font-bold">{allSkills?.length ?? 0}</span>
              <span className="text-muted-foreground text-sm ml-1">skills</span>
            </div>
          </div>

          {/* Bio */}
          <p className="font-sans text-sm font-semibold mb-1">{resumeData?.title ?? ''}</p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-2 max-w-lg">
            {resumeData?.summary?.slice(0, 200) ?? ''}...
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {resumeData?.location ?? ''}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={12} /> {resumeData?.title ?? ''}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
            <a
              href="/resume.pdf"
              download
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-sans text-xs font-semibold hover:bg-accent/80 transition-colors flex items-center gap-1.5"
            >
              <Download size={14} /> Download Resume
            </a>
            <a
              href={`mailto:${resumeData?.email ?? ''}`}
              className="px-4 py-2 rounded-lg border border-border text-foreground font-sans text-xs font-semibold hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
