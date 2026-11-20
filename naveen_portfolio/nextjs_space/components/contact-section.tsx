'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume-data';
import { Mail, MapPin, Linkedin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-16 mt-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="max-w-[935px] mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight neon-glow mb-2">
            Get In Touch
          </h2>
          <p className="text-sm text-muted-foreground font-mono tracking-wider uppercase">
            Mission: Connect
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          <a
            href={`mailto:${resumeData?.email ?? ''}`}
            className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-all hover:shadow-lg group text-center"
          >
            <Mail className="mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" size={24} />
            <p className="text-sm font-semibold">Email</p>
            <p className="text-xs text-muted-foreground mt-1" suppressHydrationWarning>{resumeData?.email ?? ''}</p>
          </a>
          <a
            href={resumeData?.linkedin ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-xl p-5 border border-border hover:border-accent/50 transition-all hover:shadow-lg group text-center"
          >
            <Linkedin className="mx-auto mb-2 text-accent group-hover:scale-110 transition-transform" size={24} />
            <p className="text-sm font-semibold">LinkedIn</p>
            <p className="text-xs text-muted-foreground mt-1">naveensivakumar257</p>
          </a>
          <div className="bg-card rounded-xl p-5 border border-border text-center">
            <MapPin className="mx-auto mb-2 text-secondary" size={24} />
            <p className="text-sm font-semibold">Location</p>
            <p className="text-xs text-muted-foreground mt-1">{resumeData?.location ?? ''}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
