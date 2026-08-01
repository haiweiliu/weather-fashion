# Security and Credential Boundaries

Weather Fashion is designed so the public repository can explain the workflow
without containing the user's private wardrobe or provider credentials.

## Never commit

- `.env` files or copied environment values;
- API keys, access tokens, passwords, cookies, or private SSH material;
- `data/` contents, including model-reference images and generated private assets;
- personal email addresses or private notification destinations;
- raw screenshots of account security events or token-creation alerts.

## Safe operating model

- Copy `.env.example` to a local `.env`; keep the real file untracked.
- Make provider calls only through the server-side boundary.
- Treat generated images as untrusted until a person reviews identity and quality.
- Keep source images, derived assets, and approvals attributable to one local job.
- Use least-privilege, short-lived credentials where the provider supports them.
- Revoke any temporary credential created during setup once the repository is
  pushed and verified.

## Public screenshot rule

A screenshot is not automatically safe because its secret value is not visible. It
may still reveal account identity, timing, scopes, security events, or operational
metadata. Do not publish a security screenshot in the product gallery. If a
behind-the-build image is important, make a separate redacted editorial asset and
review it for names, addresses, account identifiers, token notes, and timestamps.

## Pre-push checklist

1. Run `git status --short` and inspect the exact files being staged.
2. Run the repository autoresearch in strict mode.
3. Search the staged diff for credential-shaped values and private paths.
4. Confirm `data/` and `.env` remain untracked.
5. Rotate or revoke temporary credentials after a successful push.

The goal is not merely to hide a password. The goal is to keep the repository
unable to reconstruct a private account or wardrobe from its public history.
