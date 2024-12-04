import { createWebHistory, createRouter} from 'vue-router'
import Landing from './views/landing.vue'
import Servers from './views/servers.vue'
import Server from './views/server.vue'

const routes = [
    {path: '/', name:'landing', component: Landing},
    {path: '/callback', name:'auth', component: Landing},
    {path: '/servers', name:'servers', component: Servers},
    {path: '/servers/:key', name:'server', component: Server, props: true}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
