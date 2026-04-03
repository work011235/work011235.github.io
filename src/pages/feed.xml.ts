// src/pages/feed.xml.ts
import rss           from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title:       'yourname.github.io',
    description: 'Writing about software, systems, and ideas.',
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
