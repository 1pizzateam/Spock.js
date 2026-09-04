import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const legacyRoot = process.argv[2] ?? path.resolve(root, '../Type6js-website');
const docsRoot = path.resolve(root, 'website/docs/api');
const legacyTree = JSON.parse(fs.readFileSync(path.join(legacyRoot, 'web/tree.json'), 'utf8'));

const modules = [
  ['Vector2', 'vectors/vector2.ts', 'vector2.md'],
  ['Vector3', 'vectors/vector3.ts', 'vector3.md'],
  ['Matrix3x3', 'matrices/matrix3x3.ts', 'matrix3x3.md'],
  ['Matrix4x3', 'matrices/matrix4x3.ts', 'matrix4x3.md'],
  ['Matrix4x4', 'matrices/matrix4x4.ts', 'matrix4x4.md'],
  ['Quaternion', 'quaternion.ts', 'quaternion.md'],
  ['Circle', 'geometry/circle.ts', 'circle.md'],
  ['Rectangle', 'geometry/rectangle.ts', 'rectangle.md'],
  ['Grid', 'geometry/grid.ts', 'grid.md'],
  ['Trigonometry', 'trigonometry.ts', 'trigonometry.md'],
  ['Bezier', 'bezier.ts', 'bezier.md'],
  ['Random', 'random.ts', 'random.md'],
  ['NumArray', 'array.ts', 'num-array.md'],
  ['Utils', 'utils.ts', 'utils.md'],
  ['Time', 'time.ts', 'time.md'],
];

const aliases = {
  NumArray: 'Array',
};

const callableAliases = {
  Random: {
    float: { params: [['min', 'number'], ['max', 'number']], returns: 'number' },
    integer: { params: [['min', 'number'], ['max', 'number']], returns: 'number' },
    distribution: { params: [['min', 'number'], ['max', 'number'], ['iterations', 'number']], returns: 'number' },
    pick: { params: [['value1', 'number'], ['value2', 'number']], returns: 'number' },
  },
  NumArray: {
    sum: { params: [['array', 'number[]']], returns: 'number' },
  },
  Utils: {
    normalize: { params: [['x', 'number'], ['min', 'number'], ['max', 'number']], returns: 'number' },
    lerp: { params: [['min', 'number'], ['max', 'number'], ['amount', 'number']], returns: 'number' },
  },
};

const returnOverrides = {
  'Circle.setRadius': 'this',
  'Circle.setDiameter': 'this',
  'Random.create': '{ float(min, max): number; integer(min, max): number; distribution(min, max, iterations): number; pick(value1, value2): number }',
};

const legacy = new Map();

function walkLegacy(value, route = []) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value.params)) {
    const key = `${value.class}.${route.at(-1)}`;
    legacy.set(key, { ...value, route: route.join('_') });
    return;
  }
  for (const [name, child] of Object.entries(value)) {
    if (!['path', 'methods'].includes(name)) walkLegacy(child, [...route, name]);
  }
}

walkLegacy(legacyTree);

function jsDoc(node, source) {
  const ranges = ts.getLeadingCommentRanges(source.text, node.getFullStart()) ?? [];
  const comment = ranges
    .map(range => source.text.slice(range.pos, range.end))
    .reverse()
    .find(value => value.startsWith('/**'));
  return comment
    ? comment.replace(/^\/\*\*\s?|\s?\*\/$/g, '').replace(/^\s*\*\s?/gm, '').trim()
    : '';
}

function parameterInfo(parameter, source) {
  return {
    name: parameter.name.getText(source),
    type: parameter.type?.getText(source) ?? 'unknown',
    optional: Boolean(parameter.questionToken || parameter.initializer),
  };
}

function publicApi(exportName, sourcePath) {
  const text = fs.readFileSync(sourcePath, 'utf8');
  const source = ts.createSourceFile(sourcePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const entries = [];

  for (const statement of source.statements) {
    if (ts.isClassDeclaration(statement) && statement.name?.text === exportName) {
      for (const member of statement.members) {
        if (member.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword)) continue;
        if (ts.isConstructorDeclaration(member)) {
          entries.push({
            name: 'constructor',
            signature: `new ${exportName}(${member.parameters.map(p => p.getText(source)).join(', ')})`,
            params: member.parameters.map(p => parameterInfo(p, source)),
            returns: exportName,
            description: jsDoc(member, source),
          });
        } else if (ts.isMethodDeclaration(member) && member.name) {
          const name = member.name.getText(source);
          const returns = returnOverrides[`${exportName}.${name}`]
            ?? member.type?.getText(source)
            ?? 'void';
          entries.push({
            name,
            signature: `${name}(${member.parameters.map(p => p.getText(source)).join(', ')}): ${returns}`,
            params: member.parameters.map(p => parameterInfo(p, source)),
            returns,
            description: jsDoc(member, source),
          });
        }
      }
      return entries;
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (declaration.name.getText(source) !== exportName || !declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
        for (const property of declaration.initializer.properties) {
          const name = property.name?.getText(source);
          if (!name) continue;
          if (ts.isMethodDeclaration(property)) {
            const returns = returnOverrides[`${exportName}.${name}`]
              ?? property.type?.getText(source)
              ?? 'void';
            entries.push({
              name,
              signature: `${name}(${property.parameters.map(p => p.getText(source)).join(', ')}): ${returns}`,
              params: property.parameters.map(p => parameterInfo(p, source)),
              returns,
              description: jsDoc(property, source),
            });
          } else if (callableAliases[exportName]?.[name]) {
            const alias = callableAliases[exportName][name];
            entries.push({
              name,
              signature: `${name}(${alias.params.map(([n, type]) => `${n}: ${type}`).join(', ')}): ${alias.returns}`,
              params: alias.params.map(([n, type]) => ({ name: n, type, optional: false })),
              returns: alias.returns,
              description: jsDoc(property, source),
            });
          }
        }
      }
    }
  }
  return entries;
}

function legacyFor(exportName, method) {
  return legacy.get(`${exportName}.${method}`)
    ?? legacy.get(`${aliases[exportName]}.${method}`);
}

function valueFor(type, name) {
  const clean = type.replace(/\s*\|\s*(undefined|null)/g, '').replace(/^\?/, '');
  const namedValues = {
    width: '100',
    height: '100',
    cellSize: '10',
    radius: '10',
    diameter: '20',
    offset: '0',
    samples: '16',
    distance: '10',
    iterations: '4',
    seed: '42',
    left: '-1',
    right: '1',
    top: '1',
    bottom: '-1',
    near: '0.1',
    far: '100',
    znear: '0.1',
    zfar: '100',
    aspect: '16 / 9',
  };
  if (clean === 'number' && namedValues[name]) return namedValues[name];
  if (clean.includes('Vector2')) return 'new Vector2(1, 2)';
  if (clean.includes('Vector3')) return 'new Vector3(1, 2, 3)';
  if (clean.includes('Rectangle')) return 'new Rectangle(10, 10, 0, 0)';
  if (clean.includes('Grid')) return 'new Grid(100, 100, 10)';
  if (clean.includes('Matrix3x3')) return 'new Matrix3x3()';
  if (clean.includes('Matrix4x3')) return 'new Matrix4x3()';
  if (clean.includes('Matrix4x4')) return 'new Matrix4x4()';
  if (clean.includes('Quaternion')) return 'new Quaternion()';
  if (clean.includes('Float32Array')) return 'new Float32Array(16)';
  if (clean.includes('number[]')) return '[1, 2, 3]';
  if (clean.includes('Vector2[]') || clean.includes('Vector3[]')) return '[]';
  if (clean.includes("'x' | 'y'")) return "'x'";
  if (clean.includes('CanvasRenderingContext2D')) return 'context';
  if (clean === 'string') return name.toLowerCase().includes('color') ? "'#5b8cff'" : "'value'";
  if (clean === 'boolean') return 'false';
  if (clean === 'number') {
    if (/angle|radian|fovy/i.test(name)) return 'Math.PI / 4';
    if (/^(amount|ratio|t)$/i.test(name)) return '0.5';
    return '1';
  }
  return 'undefined';
}

function fallbackUsage(exportName, entry) {
  const imports = new Set([exportName]);
  for (const param of entry.params) {
    for (const type of ['Vector2', 'Vector3', 'Rectangle', 'Grid', 'Matrix3x3', 'Matrix4x3', 'Matrix4x4', 'Quaternion']) {
      if (param.type.includes(type)) imports.add(type);
    }
  }
  const importLine = `import { ${[...imports].join(', ')} } from '@1pizzateam/spockjs';`;
  if (entry.name === 'constructor') {
    const args = entry.params.map(p => valueFor(p.type, p.name));
    return `${importLine}\n\nconst value = new ${exportName}(${args.join(', ')});`;
  }
  const args = entry.params.map(p => valueFor(p.type, p.name));
  const objectStyle = ['Trigonometry', 'Bezier', 'Random', 'NumArray', 'Utils', 'Time'].includes(exportName);
  const constructors = {
    Circle: 'new Circle(10, 0, 0)',
    Rectangle: 'new Rectangle(20, 10, 0, 0)',
    Grid: 'new Grid(100, 100, 10)',
  };
  const receiver = objectStyle ? exportName : (constructors[exportName] ?? `new ${exportName}()`);
  const context = entry.params.some(param => param.type.includes('CanvasRenderingContext2D'))
    ? "\nconst context = document.querySelector('canvas').getContext('2d');\n"
    : '\n';
  return `${importLine}\n${context}\nconst result = ${receiver}.${entry.name}(${args.join(', ')});`;
}

function usageFor(exportName, entry) {
  return fallbackUsage(exportName, entry);
}

function parameterLines(entry, old) {
  if (!entry.params.length) return 'None.';
  return entry.params.map(param => {
    const oldParam = old?.params?.find(candidate => candidate.name.toLowerCase() === param.name.toLowerCase());
    const optional = param.optional ? ' Optional.' : '';
    const legacyDetail = oldParam?.description
      ?.replace(/\s*different than zero\s*/gi, '')
      .trim();
    const detail = legacyDetail ? ` ${legacyDetail}` : '';
    return `- \`${param.name}\` — \`${param.type}\`.${optional}${detail}`.trimEnd();
  }).join('\n');
}

function createPage(exportName, sourceFile, outputFile) {
  const entries = publicApi(exportName, path.join(root, 'src', sourceFile));
  let markdown = `# ${exportName}\n\n`;
  markdown += `Import with \`import { ${exportName} } from '@1pizzateam/spockjs';\`.\n\n`;
  for (const entry of entries) {
    const old = legacyFor(exportName, entry.name);
    const description = entry.description || old?.description?.trim() || `${entry.name} on ${exportName}.`;
    markdown += `## ${entry.name === 'constructor' ? 'Constructor' : `${exportName}.${entry.name}()`}\n\n`;
    markdown += `${description}\n\n`;
    markdown += `\`\`\`ts\n${entry.signature}\n\`\`\`\n\n`;
    markdown += `### Parameters\n\n${parameterLines(entry, old)}\n\n`;
    markdown += `### Returns\n\n\`${entry.returns}\`${old?.return?.description ? ` — ${old.return.description.trim()}` : ''}\n\n`;
    markdown += `### Example\n\n\`\`\`js\n${usageFor(exportName, entry, old)}\n\`\`\`\n\n`;
  }
  fs.writeFileSync(path.join(docsRoot, outputFile), markdown);
  return entries.length;
}

fs.mkdirSync(docsRoot, { recursive: true });
let total = 0;
for (const [exportName, sourceFile, outputFile] of modules) {
  total += createPage(exportName, sourceFile, outputFile);
}
console.log(`Generated ${modules.length} API pages with ${total} documented functions.`);
