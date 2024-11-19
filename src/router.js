import { createMemoryHistory, createRouter} from 'vue-router'
import Landing from './views/landing.vue'
import Servers from './views/servers.vue'
import Server from './views/server.vue'

const routes = [
    {path: '/', name:'landing', component: Landing},
    {path: '/servers', name:'servers', component: Servers},
    {path: '/server', name:'server', component: Server}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
