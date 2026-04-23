// src/pages/feed.xml.ts
import rss           from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title:       'work011235.github.io',
    description: 'Electronic lab notebook with roadmap, lessons learned, and splotches and spills along the way.',
    site:        context.site!,
    items: posts.map(post => ({
      title:       post.data.title,
      pubDate:     post.data.date,
      description: post.data.description,
      link:        `/blog/${post.slug}/`,
      categories:  post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
