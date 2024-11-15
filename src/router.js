import { createMemoryHistory, createRouter} from 'vue-router'
import Landing from './components/landing.vue'
import Servers from './components/servers.vue'
import Server from './components/server.vue'

const routes = [
    {path: '/', component: Landing},
    {path: '/servers', component: Servers},
    {path: '/server', component: Server}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router