# Pupa website

The marketing + docs site for [Pupa](https://github.com/pupa-app) — an
open-source native iOS / macOS agent app.

## What's here

| Route | Page |
|---|---|
| `/` | Home — hero, the four verbs (Use / Build / Share / Contribute), the `.pupa` bundle, open-source repos. |
| `/blog` | Blog index. |
| `/blog/<slug>` | A blog post. |
| `/releases` | Releases, live from GitHub Releases. Unlisted: no nav link, reached from the get-app menu on `/`. |
| `/privacy` | Privacy Policy (Apple App Store requirement). |
| `/support` | Support page (Apple App Store requirement) — GitHub issues, email, FAQ. |
| `/terms` | Terms of Use. |

Building or running the site locally? See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Site content and code © 2026 Pupa — this repo is not open-source licensed.

The Pupa projects each carry their own license:

| Repo | License |
|---|---|
| [pupa](https://github.com/pupa-app/pupa) (iOS / macOS app) | MPL-2.0, except `AGUIKit/` which is MIT |
| [pupa-backend](https://github.com/pupa-app/pupa-backend) | MIT |
| [marketplace](https://github.com/pupa-app/marketplace) | MIT tooling; app content CC0 |

Keep [`src/pages/terms.astro`](src/pages/terms.astro) in sync with this table —
it is the user-facing statement of the same thing.
