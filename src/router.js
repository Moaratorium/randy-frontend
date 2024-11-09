import { createMemoryHistory, createRouter} from 'vue-router'
import Landing from './components/landing.vue'

const routes = [
    {path: '/', component: Landing}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router