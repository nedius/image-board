import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { AutoGenerateImports, dirResolver, DirResolverHelper } from "vite-auto-import-resolvers";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        DirResolverHelper(),
        AutoImport({
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                },
                'pinia',
                // AutoGenerateImports(),
            ], 
            // resolvers: [
            //     dirResolver({
            //         target: 'src/stores',   
            //         suffix: 'Store',
            //         prefix: 'use',
            //     }),
            // ],
            dirs: [
                'src/stores',
            ]
        }),
        Components({
            resolvers: [
                NaiveUiResolver(),
            ],
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: true,
        allowedHosts: ['.nedius.com', '.trycloudflare.com'],
    },
})
