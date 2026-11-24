import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getPathForPage,
  getRouteMeta,
  normalizePathname,
  parsePathname,
  PRIMARY_NAV_ITEMS,
  ROUTES,
} from './routing.ts';

test('parsePathname maps the 5 main pages cleanly including trailing slashes', () => {
  assert.equal(parsePathname('/'), 'home');
  assert.equal(parsePathname('/about'), 'about');
  assert.equal(parsePathname('/about/'), 'about');
  assert.equal(parsePathname('/services'), 'services');
  assert.equal(parsePathname('/programs'), 'programs');
  assert.equal(parsePathname('/contact'), 'contact');
});

test('parsePathname handles legacy route aliases and query/hash stripping gracefully', () => {
  assert.equal(parsePathname('/work?pillar=policy#top'), 'services');
  assert.equal(parsePathname('/approach'), 'about');
  assert.equal(parsePathname('/accelerator'), 'programs');
  assert.equal(parsePathname('/partner'), 'contact');
  assert.equal(parsePathname('/connect'), 'contact');
  assert.equal(parsePathname('/unknown-route'), 'home');
  assert.equal(normalizePathname('/Contact/'), '/contact');
});

test('getPathForPage and getRouteMeta resolve distinct metadata across all 5 pages', () => {
  const seenPaths = new Set<string>();
  const seenTitles = new Set<string>();

  for (const route of ROUTES) {
    assert.equal(getPathForPage(route.id), route.path);
    const meta = getRouteMeta(route.id);
    assert.equal(meta.id, route.id);
    assert.ok(meta.title.length > 10);
    assert.ok(meta.description.length > 20);
    seenPaths.add(route.path);
    seenTitles.add(meta.title);
  }

  assert.equal(ROUTES.length, 5);
  assert.equal(seenPaths.size, 5);
  assert.equal(seenTitles.size, 5);
  assert.equal(PRIMARY_NAV_ITEMS.length, 3);
  assert.equal(PRIMARY_NAV_ITEMS.some((item) => item.id === 'home'), false);
});
