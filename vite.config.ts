import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
    return {
        build: {
            rollupOptions: {
                input: {
                    'main': 'index.html',
                    'service-worker': 'src/service-worker.ts',
                },
                output: {
                    entryFileNames: '[name].js',
                },
            },
        },
        optimizeDeps: {
            include: [
                '@emotion/react',
                '@emotion/styled',
            ],
        },
        plugins: [
            react({
                jsxImportSource: '@emotion/react',
                babel: {
                    plugins: [
                        '@emotion/babel-plugin',
                    ],
                },
            }),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                '@': '/src',
            },
        },
    };
});
