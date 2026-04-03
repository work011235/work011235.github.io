import { defineConfig } from 'astro/config';
import mdx      from '@astrojs/mdx';
import sitemap   from '@astrojs/sitemap';

// ⚠️  Replace with your actual GitHub Pages URL
//     e.g. https://yourusername.github.io
//     or   https://yourusername.github.io/repo-name  if repo isn't <username>.github.io
export default defineConfig({
  site: 'https://work011235.github.io',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
