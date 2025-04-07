import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import fs from 'fs';

// 从 package.json 读取信息
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * 
 * @license ${pkg.license}
 * @author ${pkg.author}
 * @repository ${pkg.repository.url}
 */`;

export default [
  // UMD build (适用于浏览器)
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'fixCJKLinebreak',
        banner,
        exports: 'named',
        globals: {
          // 由于我们不再将 xregexp 作为外部依赖，这里不再需要
        }
      },
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'fixCJKLinebreak',
        banner,
        exports: 'named',
        plugins: [terser()],
        globals: {
          // 由于我们不再将 xregexp 作为外部依赖，这里不再需要
        }
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ],
    // 移除外部依赖声明，将 xregexp 打包进来
  },
  // CommonJS and ES module builds
  {
    input: 'src/index.js',
    output: [
      { 
        file: pkg.main, 
        format: 'cjs', 
        banner,
        exports: 'named' 
      },
      { 
        file: pkg.module, 
        format: 'es', 
        banner 
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs()
    ],
    // 对于 npm 包使用场景，仍然将 xregexp 作为外部依赖
    external: ['xregexp']
  }
]; 