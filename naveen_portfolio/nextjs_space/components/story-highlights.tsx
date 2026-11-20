'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code, GraduationCap, Award, Mail } from 'lucide-react';

const stories = [
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'skills', label: 'Skills', icon: Code },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'certifications', label: 'Certs', icon: Award },
  { key: 'contact', label: 'Contact', icon: Mail },
];

export default function StoryHighlights({ onStoryClick }: { onStoryClick: (key: string) => void }) {
  return (
    <div className="py-6 border-b border-border">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide justify-center md:justify-start">
        {(stories ?? []).map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={s.key}
              onClick={() => onStoryClick?.(s.key)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-[66px] h-[66px] rounded-full story-ring p-[2px] group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <Icon size={22} className="text-foreground" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-sans">{s.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
