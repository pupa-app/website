// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Served at the custom domain https://pupa-app.com (see public/CNAME).
  // No `base`: the site is served from the domain root, not a /website subpath.
  site: 'https://pupa-app.com',
  // Zero client-side JS by default; plain CSS, no integrations.
  trailingSlash: 'ignore',
});
