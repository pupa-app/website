// Prefix root-absolute internal links with the configured base path
// (import.meta.env.BASE_URL), so links work both locally and on a
// GitHub Pages project page like /website/. External URLs pass through.
export function href(path: string): string {
  if (!path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path || '/';
}
