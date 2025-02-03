import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { AutoGenerateImports, dirResolver, DirResolverHelper } from "vite-auto-import-resolvers";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        DirResolverHelper(),
        // AutoGenerateImports(),
        AutoImport({
            // imports: [
            //     'vue',
            //     {
            //         'naive-ui': [
            //             'useDialog',
            //             'useMessage',
            //             'useNotification',
            //             'useLoadingBar'
            //         ]
            //     }
            // ],
            imports: AutoGenerateImports(),
        }),
        Components({
            resolvers: [
                NaiveUiResolver(),
                // dirResolver({
                //     target: 'src/stores',
                //     suffix: 'Store',
                // }),
            ],
        }),
    ],
    server: {
        host: true
    },
})
