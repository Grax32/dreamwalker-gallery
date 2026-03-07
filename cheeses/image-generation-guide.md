# Shot Brief Image Generation Guide

Yes — we can generate images directly from `shot-briefs.md` using all locked constraints (reference look, framing, setting, and waiter presence).

## Required inputs for every generation
1. **Reference image:** `reference-image.md` (authoritative waiter look).
2. **Character/framing rules:** `waiter-characters.md`.
3. **Shot content:** `shot-briefs.md`.

## Global generation settings
- Tone: playful, instantly readable, fast-music-video clarity.
- Environment: warm elegant restaurant interior.
- Costume continuity: classic black vest, white shirt, bow tie.
- Image readability: clean silhouette, clear foreground subject, minimal clutter.

## Guardrails
- If the shot names one waiter, do not include the other waiters.
- Keep framing identity consistent:
  - Jacques: slightly low camera; top hat cropped at top edge.
  - Marco: comfortably centered and fully in frame.
  - Gus: slightly higher camera with visible space above head.

## Ready-to-use prompt pack
Use `shot-brief-image-prompts.json` for direct copy/paste prompts, negatives, and per-shot checks.
