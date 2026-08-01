# Weather Fashion QA Record

Date: 2026-07-31

## Scope

This review covers the public `weather-fashion` repository, its branded local-first
workflow, and the knowledge update accompanying this file. It does not claim that
an unrelated production host has been migrated.

## Autoresearch result

The repository-specific autoresearch completed with **13 findings and 0 blocking
failures** before this knowledge layer was added. The checked surfaces include:

- package and page identity;
- PWA manifest, icon, and service-worker namespace;
- absence of upstream brand residue;
- no client-side provider secret pattern;
- React mount and mobile viewport;
- empty-state guidance;
- reduced-motion coverage;
- live endpoint probes when a base URL is supplied.

The same checks are rerun after this documentation change and remain the release
gate for this update.

## Office Hours review

### Round 0 — strategic premise

The product has a credible wedge when it stays focused on a person's own closet,
weather, and an explainable next decision. The risk is drifting into generic AI
fashion imagery or treating the public repository as a data warehouse.

### Round 1 — four-second trust

The brand name is now consistent across the page, package, manifest, icon, and
README. The remaining trust requirement is deployment proof: a live URL must render
the same identity before it is called the canonical product.

### Round 2 — first-use flow

The intended flow is concrete: import, review, approve, then generate or style. The
review gate is important because it prevents a plausible-looking model output from
becoming false wardrobe knowledge.

### Round 3 — failure and security

The public repository must never contain `.env` values, model-reference files,
private wardrobe data, personal email addresses, or raw token-alert screenshots.
If a provider is missing, the app should fail closed or explain the unavailable
capability rather than inventing a completed result.

### Round 4 — craft and shareability

Cold-sky branding, a compact editorial shell, and explicit source/provenance copy
make the project more ownable. Shareable examples should be fashion examples, not
account-security notifications.

### Round 5 — architecture

The current boundary is sound for a local-first prototype: browser UI, server-side
model calls, local data directory, and deterministic checks. The next architecture
gate is a verified deployment recipe that cannot confuse the older host build with
this repository.

## Debate-It review

The live eight-expert runner was started. Its deterministic project gate passed,
but the provider council could not complete because the configured NIM model had
reached end-of-life and fallback model quotas were unavailable. No provider score is
claimed here.

The evidence-led local debate reached these positions:

| Lens | Objection | Decision |
| --- | --- | --- |
| Leverage | Generic generated outfits are easy to copy. | Own the reviewed closet-to-decision loop. |
| First principles | A model result without source identity can be wrong while looking good. | Preserve originals, provenance, and approval state. |
| Ontology | Garment, look, weather, context, and feedback are different objects. | Keep them separate in data and QA. |
| Zero-to-one | The moat is not “AI fashion”; it is trusted personal memory. | Keep local-first behavior visible. |
| Shipping | Too much platform ambition delays the first useful decision. | Prove one import-to-look path before expansion. |
| User trust | A public host mismatch destroys confidence faster than a missing feature. | Add rendered deployment identity checks. |

### Karpathy opposite

The project may still be overfitting to internal process language. The antidote is
behavioral proof: a first-time user should import one garment, approve it, and get a
weather-relevant recommendation with understandable provenance. If that loop is not
fast and useful, more strategy documents do not create product leverage.

## Release decision

**Approved for the public knowledge update; not a claim of production migration.**

Required next proof before calling the live host canonical:

1. deploy the intended repository or explicitly document the host's separate app;
2. verify rendered title, manifest, icon, and branded behavior from the public edge;
3. run the same autoresearch probes against that URL;
4. keep security screenshots private or replace them with safe editorial assets.
