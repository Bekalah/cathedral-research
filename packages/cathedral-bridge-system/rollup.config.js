import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: [
    'react', 'react-dom',
    // All core bridge dependencies
    '../../tesseract-bridge/ConnectionMatrix.js',
    '../../tesseract/bridge.js',
    '../../bridge-system/BridgeCore.js',
    '../../bridge-system/mystery-house-codex-mirror.js',
    '../../consciousness-engine/src/Code14499System'
  ],
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: '.'
    })
  ]
};
