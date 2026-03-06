import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

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
        plugins: [react()],
        resolve: {
            alias: {
                '@': '/src',
            },
        },
    };
});
