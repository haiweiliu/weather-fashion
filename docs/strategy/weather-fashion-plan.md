# Weather Fashion: Strategy and Operating Plan

## Strategic thesis

Weather Fashion should own the decision layer between a person's real closet and
the next thing they can confidently wear. Weather is the immediate trigger; the
reviewed personal archive is the long-term advantage.

The strategy is therefore **local-first memory plus server-side assistance**:

1. Capture the user's own garments.
2. Preserve source evidence and ask for approval.
3. Generate a modeled, searchable representation.
4. Recommend a look for a concrete day and context.
5. Learn from edits, saves, and rejected suggestions without exporting the whole
   closet by default.

## Wedge

The first useful promise is narrow: “Help me decide what to wear from what I
already own when the weather changes.” That is more defensible than trying to be
a general fashion social network or an undifferentiated image generator.

## Plan

### Phase 0 — Trust foundation

- Keep the repository free of secrets and private wardrobe data.
- Make brand identity and source lineage machine-checkable.
- Make the first import action obvious and reversible.
- Keep provider calls behind a server boundary with explicit configuration.

### Phase 1 — Personal archive quality

- Preserve original uploads alongside derived cutouts and modeled previews.
- Require review before an item becomes part of the active archive.
- Track provenance and approval state for every generated asset.
- Add deletion and regeneration paths that do not destroy source evidence.

### Phase 2 — Weather decisions

- Start with one city, one forecast window, and one context question.
- Explain why a recommendation fits the forecast and the user's preferences.
- Measure accepted, edited, and rejected looks rather than vanity image counts.
- Keep stale weather or generated output visibly labeled.

### Phase 3 — Compounding intelligence

- Use the user's corrections to improve ranking and context selection.
- Keep personal data local by default; export only an intentional, minimized
  learning signal.
- Add trip planning and multi-day packing only after the single-day loop is useful.
- Promote only features that pass source, security, and behavioral QA.

## Decision rules

- A polished image without source identity is a demo, not a wardrobe record.
- A passing static scan is not live deployment proof.
- A provider fallback is not expert consensus.
- A new metric must be tied to a user decision or a verifiable quality outcome.
- A public example must be safe to share without exposing a password, token,
  personal email, model reference, or private closet.

## Success signals

The next meaningful signals are:

- time from first import to first approved item;
- percentage of generated items accepted without identity correction;
- percentage of outfit suggestions saved or edited into a usable look;
- repeat use when the forecast changes;
- zero secret findings and zero unverified public assets.

These signals measure decision quality and trust. Total generated images is not a
success metric on its own.

## Current recommendation

Ship the public knowledge and QA layer now. Keep the existing host migration as a
separate, explicitly verified deployment task because the known host and this
repository have previously served different app generations. Do not publish the
attached GitHub security screenshots as fashion assets; use redacted, purpose-built
brand imagery if an editorial “behind the build” section is desired.
