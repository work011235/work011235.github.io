---
title: "On Writing Software That Doesn't Apologize"
date: 2025-09-12
description: "Confidence in design isn't arrogance — it's clarity of intent. Software that hedges every decision communicates nothing."
tags: ["craft", "design", "ux"]
---

Good software makes choices.

It doesn't ask "are you sure?" before every action. It doesn't present five ways to do the same thing and ask you to pick. It doesn't surface every configuration option at once, or warn you about edge cases you'll never encounter, or hedge its own output with "this might not be right for you."

Good software has a point of view, and it commits to it.

## The apologetic interface

The apologetic interface is everywhere. You know it when you see it:

- The onboarding flow with twelve steps asking you to configure things you don't understand yet
- The settings panel with 40 toggles, each turned off by default
- The dialog that warns you about something and then asks you to confirm the warning
- The feature that does three different things depending on a preference you set eighteen months ago and have forgotten

These patterns come from good instincts — respecting user autonomy, avoiding data loss, surfacing options — applied without discipline. The result is software that communicates anxiety instead of confidence.

## Confidence is a design choice

When Stripe launched, their API had one way to charge a card. Not three. Not a "classic" and a "modern" mode. One. That clarity was a design choice, and it was right. It forced the team to make the defaults excellent, because there was nowhere to hide.

When Linear ships a keyboard shortcut, they ship it. They don't add a setting to disable it and a warning dialog explaining that it replaces the old shortcut. They make the choice and stand behind it.

This takes courage. Every hedge in a product is someone avoiding a decision. Every "advanced settings" panel is a place where the team wasn't willing to commit to a default.

## What committing actually looks like

Committing to a design means:

1. **Choosing good defaults and not apologizing for them.** If your default is wrong for some users, that's okay. You can't optimize for everyone.
2. **Removing choices that don't meaningfully differ.** If two options produce nearly identical outcomes, pick one and remove the other.
3. **Writing error messages that help, not just warn.** "Something went wrong" is an apology. "The API key format is invalid — it should start with `sk_`" is a decision.
4. **Trusting your users to undo.** Most of the "are you sure?" dialogs exist because undo is broken. Fix undo. Remove the dialog.

Software that doesn't apologize isn't arrogant — it's respectful. It respects that your users' time and attention are finite, and it doesn't waste them on decisions the software should have already made.
