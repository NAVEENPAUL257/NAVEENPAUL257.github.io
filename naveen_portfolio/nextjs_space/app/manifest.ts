import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Naveen Sivakumar — Portfolio',
    short_name: 'NS Portfolio',
    description: 'AI/LLM Analyst portfolio — GTA Vice City themed',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0E1A',
    theme_color: '#FF2D78',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
