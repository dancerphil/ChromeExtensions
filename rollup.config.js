import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/elec.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    // 添加 Terser 插件
    terser(),
  ],
};