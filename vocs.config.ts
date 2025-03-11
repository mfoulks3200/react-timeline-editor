import { defineConfig } from 'vocs';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  description: 'A flexible React timeline component based on https://github.com/xzdarcy/react-timeline-editor.',
  title: 'React Timeline Editor',
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/mfoulks3200/react-timeline-editor',
    },
  ],
  sidebar: [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        {
          text: 'Introduction',
          link: '/',
        },
        {
          text: 'Installation & Basic Usage',
          link: '/docs/get-started',
        },
      ],
    },
  ],
  vite: {
    plugins: [
      tsconfigPaths({
        root: __dirname,
      }),
    ],
  },
});
