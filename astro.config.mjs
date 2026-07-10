// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Project page at https://pupa-app.github.io/website/ .
  // When a custom domain is added, set site to it and remove `base`.
  site: 'https://pupa-app.github.io',
  base: '/website',
  // Zero client-side JS by default; plain CSS, no integrations.
  trailingSlash: 'ignore',
});
