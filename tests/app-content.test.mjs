import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('storefront declares its core portfolio journeys', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /No workshop[\s\S]*required/);
  assert.match(app, /Wholesale/);
  assert.match(app, /Add to cart/);
});

test('production build targets the GitHub Pages project path and brand title', async () => {
  const [config, html] = await Promise.all([
    readFile(new URL('../vite.config.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
  ]);
  assert.match(config, /base:\s*['"]\/forged-cacao\//);
  assert.match(html, /<title>Forged Cacao<\/title>/);
});

test('craft is a standalone route and every product has its own source image', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /onNavigate\('\/craft'\)/);
  assert.match(app, /function CraftPage/);
  assert.match(app, /path === '\/craft'/);
  const images = [...app.matchAll(/image: asset\('([^']+)'\)/g)].map((match) => match[1]);
  assert.equal(images.length, 4);
  assert.equal(new Set(images).size, 4);
});
