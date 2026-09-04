import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const production = process.env.NODE_ENV === 'production';

const base = process.env.VITEPRESS_BASE || (production ? '/Spock.js/' : '/docs/');

const here = path.dirname(fileURLToPath(import.meta.url));

// The live demos import the library by its package name, but it always resolves
// to the local build so the docs demo the current source instead of whatever
// happens to be published. Docker mounts dist/ beside the website; outside Docker
// it sits at the repository root.
function localEntry() {
  const entry = [
    path.resolve(here, '../../dist/spock.js'),
    path.resolve(here, '../../../dist/spock.js'),
  ].find(candidate => fs.existsSync(candidate));

  if (!entry)
    throw new Error('Local build not found. Run "npm run build:lib" in the repository root first.');

  return entry;
}

const alias = { '@1pizzateam/spockjs': localEntry() };

export default defineConfig({
  title: 'Spock.js',
  description: 'A lightweight TypeScript mathematics library for vectors, matrices, geometry, curves, and numerical utilities.',
  base,
  cleanUrls: true,
  vite: {
    resolve: { alias },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#5b8cff' }],
  ],
  themeConfig: {
    siteTitle: 'Spock.js',
    nav: [
      { text: 'Guide', link: '/guide/overview' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/guide/examples' },
      { text: '4.0.0', link: '/guide/migration' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Overview', link: '/guide/overview' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Examples', link: '/guide/examples' },
          { text: 'Migrating to 4.0', link: '/guide/migration' },
        ],
      },
      {
        text: 'Vectors',
        collapsed: false,
        items: [
          { text: 'API overview', link: '/api/' },
          { text: 'Vector2', link: '/api/vector2' },
          { text: 'Vector3', link: '/api/vector3' },
        ],
      },
      {
        text: 'Matrices & rotations',
        collapsed: false,
        items: [
          { text: 'Matrix3x3', link: '/api/matrix3x3' },
          { text: 'Matrix4x3', link: '/api/matrix4x3' },
          { text: 'Matrix4x4', link: '/api/matrix4x4' },
          { text: 'Quaternion', link: '/api/quaternion' },
        ],
      },
      {
        text: 'Geometry',
        items: [
          { text: 'Circle', link: '/api/circle' },
          { text: 'Rectangle', link: '/api/rectangle' },
          { text: 'Grid', link: '/api/grid' },
        ],
      },
      {
        text: 'Math utilities',
        items: [
          { text: 'Trigonometry', link: '/api/trigonometry' },
          { text: 'Bezier', link: '/api/bezier' },
          { text: 'Random', link: '/api/random' },
          { text: 'NumArray', link: '/api/num-array' },
          { text: 'Utils', link: '/api/utils' },
          { text: 'Time', link: '/api/time' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/1pizzateam/Spock.js' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@1pizzateam/spockjs' },
    ],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2011-present Ludovic Cluber',
    },
  },
});
