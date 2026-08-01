# Weather Fashion: Development Knowledge

This document is the public, non-secret record of how Weather Fashion evolved and
what the current repository is meant to preserve.

## Product identity

Weather Fashion is a local-first wardrobe archive that helps a person turn real
clothing into a usable, weather-aware visual collection. The important unit is
not a generic outfit image; it is a reviewed relationship between:

`source garment → approved item → modeled reference → outfit decision`

That relationship gives the product a durable memory. A new generation may improve
the styling, but it must not silently replace the user's source identity.

## Lineage

| Generation | What it taught us | What remains useful |
| --- | --- | --- |
| Wardrobe source | A strong import/review loop is more valuable than a large empty catalog. | Keep originals, jobs, generated images, and approvals local. |
| WeatherFashion V2 | Weather, trip context, and user-controlled representation belong in the same decision loop. | Keep prompt helpers and user preferences explicit and inspectable. |
| Weather Fashion | The product needs a clear owner brand and a compact local-first surface. | Prove identity through package metadata, title, manifest, icon, and regression checks. |

The generations are related, but they are not interchangeable deployments. A
public host must be checked for the same build identity as this repository before
it is described as the Weather Fashion product.

## Current architecture

- Vite + React provides the browser surface.
- The importer uses a server-side API boundary for model calls; provider keys do
  not belong in client code.
- `data/` is intentionally local and is excluded from the public repository.
- The bundled Codex skills provide two deliberate workflows: import reviewed
  clothing items and generate modeled outfit ideas.
- The public repository contains the workflow and safeguards, not a user's closet,
  model reference, generated private images, or provider credentials.

## New knowledge created in this iteration

1. **Brand identity is a testable contract.** Package name, document title, PWA
   manifest, icon, service-worker namespace, and upstream-residue checks are now
   part of autoresearch rather than a visual assumption.
2. **Deployment identity must be proven separately.** A GitHub push can succeed
   while an older host continues serving a different app. Public verification
   must check the rendered title and branded assets, not only HTTP 200.
3. **Security events are not product content.** GitHub token-alert screenshots
   belong in private operator notes, if anywhere. They must not be added to a
   public fashion gallery without redaction and an explicit editorial reason.
4. **The moat is the reviewed loop.** The useful compounding data is not raw
   model output; it is the approved mapping from a person's clothing to weather,
   context, fit, and later outfit choices.
5. **Fallbacks need labels.** When a live model council or provider is unavailable,
   the project must record that limitation instead of presenting a default score
   as independent expert consensus.

## Boundaries

Weather Fashion should not become a public dump of private wardrobe photos, a
provider-key proxy, or a gallery of unrelated security notifications. The public
surface should teach the workflow and show safe product examples; the user's
actual closet remains local and controlled by the user.
