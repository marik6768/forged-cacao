import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('storefront declares its core portfolio journeys', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /No workshop[\s\S]*required/);
  assert.match(app, /Wholesale/);
  assert.match(app, /Add to cart/);
});
