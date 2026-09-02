// Marketplace catalog entries carry an `icon`: the bundle's SF Symbol name
// (e.g. "flame.fill", "laptopcomputer.and.arrow.down"). SF Symbols are Apple
// artwork and can't be shipped on the web, so we draw our own 24×24 stroked
// equivalents in the same style as the download glyph already used on this
// page, and resolve the SF name onto one.
//
// The name space is open — Pupa lets the model pick any SF Symbol — so the
// resolver degrades instead of failing: exact name, then progressively shorter
// dotted prefixes, then the head token, then a monogram at the call site.

/** Inner markup of a 24×24 icon; the <svg> wrapper is added by `appIconSVG`. */
const PATHS: Record<string, string> = {
  // — Current catalog —
  briefcase:
    '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M2 13h20"/>',
  brain:
    '<path d="M12 4.5a2.5 2.5 0 0 0-5 .5 2.5 2.5 0 0 0-2 4 2.5 2.5 0 0 0 1 4.5 2.5 2.5 0 0 0 3 3 2.5 2.5 0 0 0 3-1.5z"/><path d="M12 4.5a2.5 2.5 0 0 1 5 .5 2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-1 4.5 2.5 2.5 0 0 1-3 3 2.5 2.5 0 0 1-3-1.5z"/><path d="M12 4.5v13"/>',
  flame:
    '<path d="M12 2.5c1.8 3.2 5 5.2 5 9a5 5 0 0 1-10 0c0-1.5.6-2.8 1.5-3.7.1 1.4.9 2.4 1.9 2.5-.3-2.7.3-5.3 1.6-7.8z"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2.5l2.6 12.1a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.2L21 7H5.4"/>',
  'chart.line.uptrend.xyaxis': '<path d="M4 3v16a2 2 0 0 0 2 2h15"/><polyline points="7 15 11 10 14 13 20 6"/>',
  laptopcomputer: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M2 20h20"/>',
  'sun.horizon':
    '<path d="M3 18h18"/><path d="M7 18a5 5 0 0 1 10 0"/><path d="M12 4v3"/><path d="M4.6 8.6 6.7 10.7"/><path d="M19.4 8.6 17.3 10.7"/><path d="M1 14h2"/><path d="M21 14h2"/>',

  // — Common picks for future apps —
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M3.6 3.6l1.8 1.8M18.6 18.6l1.8 1.8M1.5 12H4M20 12h2.5M3.6 20.4l1.8-1.8M18.6 5.4l1.8-1.8"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v4H6.5A2.5 2.5 0 0 1 4 20.5z"/>',
  star: '<polygon points="12 3 14.8 9 21 9.8 16.5 14.2 17.6 20.5 12 17.5 6.4 20.5 7.5 14.2 3 9.8 9.2 9"/>',
  heart: '<path d="M12 20.5 4.2 12.9a4.6 4.6 0 0 1 6.5-6.5l1.3 1.3 1.3-1.3a4.6 4.6 0 0 1 6.5 6.5z"/>',
  bolt: '<polygon points="13 2 4 14 11 14 10 22 20 10 13 10"/>',
  gear: '<path d="M3 6h9M17 6h4M3 12h3M11 12h10M3 18h7M15 18h6"/><circle cx="14.5" cy="6" r="2.3"/><circle cx="8.5" cy="12" r="2.3"/><circle cx="12.5" cy="18" r="2.3"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  message: '<path d="M21 12a8 8 0 0 1-8 8H4l2.2-3.3A8 8 0 1 1 21 12z"/>',
  envelope: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="3 6 12 13 21 6"/>',
  magnifyingglass: '<circle cx="11" cy="11" r="7"/><line x1="16" y1="16" x2="21" y2="21"/>',
  checkmark: '<polyline points="4 12.5 9.5 18 20 6"/>',
  'list.bullet': '<path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/>',
  dollarsign: '<path d="M12 2v20"/><path d="M17 6.5C17 4.6 14.8 3.5 12 3.5S7 4.6 7 7s2.2 3.4 5 4 5 1.6 5 4-2.2 3.5-5 3.5-5-1.1-5-3"/>',
  creditcard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  house: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/>',
  map: '<path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6z"/><path d="M9 3v15M15 6v15"/>',
  camera: '<path d="M3 8a2 2 0 0 1 2-2h2.5L9 4h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
  photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.6"/><polyline points="4 18 10 12 14 15.5 17 13 20 16"/>',
  airplane: '<path d="M21 15.5 13.5 12V5a1.5 1.5 0 0 0-3 0v7L3 15.5V18l7.5-2v3.5L8 21v1.5l4-1 4 1V21l-2.5-1.5V16l7.5 2z"/>',
  car: '<path d="M4 16v3M20 16v3"/><path d="M3 16v-3.5L5 8h14l2 4.5V16z"/><circle cx="7.5" cy="16" r="1.5"/><circle cx="16.5" cy="16" r="1.5"/>',
  bag: '<path d="M4 8h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8z"/><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2"/>',
  tag: '<path d="M3 11V4a1 1 0 0 1 1-1h7l9.5 9.5a1.5 1.5 0 0 1 0 2.1l-6.9 6.9a1.5 1.5 0 0 1-2.1 0z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
  bell: '<path d="M18 9a6 6 0 1 0-12 0c0 5-2 7-2 7h16s-2-2-2-7"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/>',
  terminal: '<rect x="2.5" y="4" width="19" height="16" rx="2"/><polyline points="7 9.5 10 12 7 14.5"/><path d="M12.5 15H17"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M9 1.5v2M15 1.5v2M9 20.5v2M15 20.5v2M1.5 9h2M1.5 15h2M20.5 9h2M20.5 15h2"/>',
  server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  wrench: '<path d="M20 5.5a5.5 5.5 0 0 1-7.3 7.3L5 20.5 3.5 19l7.7-7.7A5.5 5.5 0 0 1 18.5 4z"/>',
  pencil: '<path d="M4 20h4L20.5 7.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 5.5l4 4"/>',
  paintbrush: '<path d="M20 3.5c-3 1-7.5 4.5-10 8l2.5 2.5c3.5-2.5 7-7 7.5-10.5z"/><path d="M9.5 14 7 11.5c-2 .8-3 2.6-3 5.5 3 0 4.7-1 5.5-3z"/>',
  trash: '<path d="M4 6.5h16"/><path d="M6.5 6.5 7.5 20a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4l1-13.5"/><path d="M9.5 6.5V4h5v2.5"/>',
  'chart.bar': '<path d="M4 3v16a2 2 0 0 0 2 2h15"/><rect x="8" y="11" width="3" height="6"/><rect x="13" y="7" width="3" height="10"/><rect x="18" y="13" width="3" height="4"/>',
  'chart.pie': '<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M14 2.2A9 9 0 0 1 21.8 10H14z"/>',
  'fork.knife': '<path d="M6 2v7a2.5 2.5 0 0 0 5 0V2"/><path d="M8.5 2v20"/><path d="M17 2c-1.5 1.5-2 3.5-2 6s.7 3.5 2 3.5V22"/>',
  leaf: '<path d="M4 20C3 12 8 4 20 4c0 12-8 17-16 16z"/><path d="M9 15c2.5-3 5-4.5 8-5.5"/>',
  dumbbell: '<path d="M2 12h2M20 12h2M6.5 8v8M17.5 8v8"/><rect x="4" y="9.5" width="2.5" height="5" rx="1"/><rect x="17.5" y="9.5" width="2.5" height="5" rx="1"/><path d="M6.5 12h11"/>',
  'cross.case': '<rect x="2.5" y="6.5" width="19" height="13" rx="2"/><path d="M9 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v1.5"/><path d="M12 10v6M9 13h6"/>',
  'music.note': '<circle cx="7" cy="18" r="3"/><path d="M10 18V4l10-2v13"/><circle cx="17" cy="15" r="3"/>',
  film: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M7 4.5v15M17 4.5v15M2.5 12h19M2.5 8.2h4.5M2.5 15.8h4.5M17 8.2h4.5M17 15.8h4.5"/>',
  gamecontroller: '<path d="M7.5 8h9a5.5 5.5 0 0 1 5 7.8c-.8 1.9-3.2 2.6-4.7 1.2L15 15.5H9L7.2 17c-1.5 1.4-3.9.7-4.7-1.2A5.5 5.5 0 0 1 7.5 8z"/><path d="M7 10.5v3M5.5 12h3M16 11h.01M18 13h.01"/>',
  network: '<circle cx="12" cy="4.5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7v4M12 11 6 16.8M12 11l6 5.8"/>',
};

/**
 * Alias table for SF names whose obvious prefix isn't the glyph we drew — kept
 * separate from PATHS so the fallback chain stays a pure prefix walk.
 */
const ALIASES: Record<string, string> = {
  'brain.head.profile': 'brain',
  'cart.fill': 'cart',
  bag: 'bag',
  'text.book.closed': 'book',
  'doc.text': 'doc',
  'doc.richtext': 'doc',
  'note.text': 'doc',
  'chart.line.uptrend.xyaxis.circle': 'chart.line.uptrend.xyaxis',
  'chart.xyaxis.line': 'chart.line.uptrend.xyaxis',
  'chart.bar.xaxis': 'chart.bar',
  'chart.pie.fill': 'chart.pie',
  desktopcomputer: 'laptopcomputer',
  macbook: 'laptopcomputer',
  'externaldrive.badge.timemachine': 'server',
  'server.rack': 'server',
  'sunrise': 'sun.horizon',
  'sunset': 'sun.horizon',
  'sun.max': 'sun',
  'sun.min': 'sun',
  'moon.stars': 'moon',
  'calendar.badge.clock': 'calendar',
  'clock.arrow.circlepath': 'clock',
  'timer': 'clock',
  'alarm': 'clock',
  'folder.badge.plus': 'folder',
  'tray.full': 'folder',
  'archivebox': 'folder',
  'bookmark': 'tag',
  'star.circle': 'star',
  'sparkles': 'star',
  'heart.text.square': 'heart',
  'bolt.horizontal': 'bolt',
  'gearshape': 'gear',
  'slider.horizontal.3': 'gear',
  'person.crop.circle': 'person',
  'person.2': 'person',
  'figure.walk': 'person',
  'figure.run': 'dumbbell',
  'bubble.left': 'message',
  'bubble.left.and.bubble.right': 'message',
  'text.bubble': 'message',
  'paperplane': 'message',
  'envelope.open': 'envelope',
  mail: 'envelope',
  'magnifyingglass.circle': 'magnifyingglass',
  'checkmark.circle': 'checkmark',
  'checkmark.seal': 'checkmark',
  'checklist': 'list.bullet',
  'list.bullet.rectangle': 'list.bullet',
  'text.justify': 'list.bullet',
  'banknote': 'dollarsign',
  'dollarsign.circle': 'dollarsign',
  'eurosign': 'dollarsign',
  'wallet.pass': 'creditcard',
  'building.2': 'house',
  'house.fill': 'house',
  'building.columns': 'house',
  'map.fill': 'map',
  'mappin.and.ellipse': 'map',
  location: 'map',
  'globe.americas': 'globe',
  'globe.europe.africa': 'globe',
  'network.badge.shield.half.filled': 'network',
  'point.3.connected.trianglepath.dotted': 'network',
  'photo.on.rectangle': 'photo',
  'camera.viewfinder': 'camera',
  'video': 'film',
  'play.rectangle': 'film',
  'music.note.list': 'music.note',
  'headphones': 'music.note',
  'airplane.departure': 'airplane',
  'car.fill': 'car',
  'tram': 'car',
  'bell.badge': 'bell',
  'lock.shield': 'lock',
  'key': 'lock',
  'shield': 'lock',
  'chevron.left.forwardslash.chevron.right': 'terminal',
  'curlybraces': 'terminal',
  'terminal.fill': 'terminal',
  'cpu.fill': 'cpu',
  'memorychip': 'cpu',
  'wrench.and.screwdriver': 'wrench',
  'hammer': 'wrench',
  'square.and.pencil': 'pencil',
  'pencil.and.outline': 'pencil',
  'paintpalette': 'paintbrush',
  'trash.fill': 'trash',
  'fork.knife.circle': 'fork.knife',
  'cup.and.saucer': 'fork.knife',
  'carrot': 'leaf',
  'leaf.fill': 'leaf',
  'pills': 'cross.case',
  'stethoscope': 'cross.case',
  'heart.circle': 'heart',
  'brain.filled.head.profile': 'brain',
  'flame.circle': 'flame',
  'briefcase.fill': 'briefcase',
  'graduationcap': 'book',
  'books.vertical': 'book',
  'newspaper': 'doc',
  'doc.on.doc': 'doc',
  'laptopcomputer.and.arrow.down': 'laptopcomputer',
  'gamecontroller.fill': 'gamecontroller',
};

/**
 * Resolve an SF Symbol name to a drawn glyph key, or null if we have none.
 *
 * SF names read outside-in: "chart.line.uptrend.xyaxis.circle" is a line chart
 * inside a circle, "flame.fill" a filled flame. Trailing tokens are therefore
 * decoration, and dropping them one at a time walks from the exact symbol to
 * its plainest form — which is the glyph we want.
 */
function resolveKey(icon: string): string | null {
  const name = icon.trim().toLowerCase();
  if (!name) return null;
  const parts = name.split('.');
  for (let i = parts.length; i > 0; i--) {
    const candidate = parts.slice(0, i).join('.');
    const target = ALIASES[candidate] ?? candidate;
    if (PATHS[target]) return target;
  }
  return null;
}

/**
 * A 24×24 stroked `<svg>` for an SF Symbol name, or null when nothing matches
 * — callers fall back to the app's monogram.
 */
export function appIconSVG(icon: string | undefined | null): string | null {
  const key = icon ? resolveKey(icon) : null;
  if (!key) return null;
  return (
    '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" '
    + 'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" '
    + `stroke-linejoin="round" aria-hidden="true">${PATHS[key]}</svg>`
  );
}
