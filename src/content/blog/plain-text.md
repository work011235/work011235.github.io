---
title: "The Unreasonable Effectiveness of Plain Text"
date: 2025-07-22
description: "Every note-taking app, every knowledge tool — eventually, I come back to a folder of markdown files and a fast search."
tags: ["tools", "productivity"]
---

I've tried most of the popular tools for capturing and organizing knowledge. Notion, Obsidian, Roam, Bear, Logseq. Each has something genuinely interesting about it. Each has something that eventually makes me feel like I'm doing filing instead of thinking.

I always come back to a folder of plain text files and `grep`.

## Why plain text wins

**It never breaks.** Files written in 2015 still open instantly. No migration path, no export required, no company to go out of business.

**It's portable.** Every device, every OS, every editor. I've opened notes in Vim, VS Code, iA Writer, and Notepad. The file doesn't care.

**Search is solved.** `grep -r "search term" ~/notes` is fast and reliable. So is fuzzy finding with `fzf`. I don't need a proprietary search index.

**It's friction-free.** New note: `touch ~/notes/2025-07-22-idea.md`. Open editor. Write. Done. No templates, no databases, no sync conflicts.

## What I actually do

My system, such as it is:

- One directory: `~/notes/`
- Files named `YYYY-MM-DD-slug.md`
- No subfolders (search is better than hierarchy)
- Synced with whatever cloud filesystem I'm already using
- Edited in whatever editor I have open

That's it. No graph view. No backlinks. No plugins. No "second brain."

The constraint of plain text forces clarity. If a thought is worth keeping, it can be expressed in sentences. If it can't, maybe it wasn't a thought yet.
