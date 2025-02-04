import type { PostFilter } from "./utils/posts";

export interface SiteConfig {
  title: string;
  slogan: string;
  description?: string;
  site: string,
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
    rss?: boolean;
  };
  homepage: PostFilter;
  googleAnalysis?: string;
  search?: boolean;
}

export const siteConfig: SiteConfig = {
  site: "https://work011235.github.io/", // your site url
  title: "Cloud Native",
  slogan: "Exploring technology on prem and in the cloud.",
  description: "Outlining current, future, and Edisonian (successfully proven ineffective) home lab lessons.  ",
  social: {
    github: "https://github.com/work011235", // leave empty if you don't want to show the github
    linkedin: "https://www.linkedin.com/in/david-s-02094421", // leave empty if you don't want to show the linkedin
    email: "work011235@gmail.com", // leave empty if you don't want to show the email
    rss: true, // set this to false if you don't want to provide an rss feed
  },
  homepage: {
    maxPosts: 5,
    tags: [],
    excludeTags: [],
  },
  googleAnalysis: "", // your google analysis id
  search: true, // set this to false if you don't want to provide a search feature
};
