---
title: "SQLite is Underrated. No, Really."
date: 2025-10-03
description: "A single file. Zero config. Surprisingly capable. The more I use it, the more I think the industry overcomplicated the database question."
tags: ["databases", "sqlite", "opinion"]
---

Every time I reach for SQLite on a project and it actually works — which is almost always — I feel a quiet kind of vindication.

The conventional wisdom is that SQLite is a toy. It's the embedded database you use when you're building a mobile app, or running tests, or prototyping something you'll "eventually" replace with Postgres. It's fine for small things. It doesn't scale.

This is mostly wrong.

## What SQLite actually is

SQLite is a file-based relational database with full SQL support, ACID transactions, and — as of recent versions — WAL mode for concurrent reads. It is the [most widely deployed database engine in the world](https://www.sqlite.org/mostdeployed.html) by a significant margin. It runs in every iPhone, every Android device, every browser, every Electron app.

It is not a toy. It is a deliberate design choice with real tradeoffs that happen to be favorable for a much larger class of applications than people assume.

## The actual tradeoffs

SQLite has real limitations. It doesn't support multiple concurrent writers (WAL mode helps, but there's still a write lock). It doesn't support replication natively. If your application genuinely needs to scale writes across multiple machines, you need something else.

But ask yourself honestly: does your application need that? Most internal tools, most side projects, most early-stage products, and many production applications with modest write loads do not.

The things SQLite gives you in exchange are significant:

- **Zero operational overhead.** No server to run, no connection pooling to configure, no backups to orchestrate beyond copying a file.
- **Trivial deployment.** Your database ships with your application. sqlite3 is available everywhere.
- **Surprisingly fast reads.** For read-heavy workloads on a single machine, SQLite is often faster than a networked database because there's no round-trip latency.
- **A single file.** You can inspect it, copy it, diff it (with tools), move it. The entire state of your application is in one place.

## When I use it now

These days I default to SQLite for:

- Any internal tooling or admin interface
- Side projects unless I have a specific reason not to
- Early product development, even when I expect to "graduate" to Postgres later (I often don't need to)
- Anything that runs on a single machine with predictable write volumes

Postgres when I need it. SQLite when I don't. The instinct to reach for Postgres by default — before there's any evidence that SQLite won't work — is a form of premature optimization.

```sql
-- This is all you need to get started
CREATE TABLE posts (
  id        INTEGER PRIMARY KEY,
  title     TEXT    NOT NULL,
  body      TEXT    NOT NULL,
  published INTEGER NOT NULL DEFAULT 0,
  created   TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

Start here. Add complexity when you have evidence you need it.
