import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'

import Main from './components/Main.vue'
import Add from './components/Add.vue'
import Quiz from './components/Quiz.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/add', component: Add },
    { path: '/quiz/:id', component: Quiz },
  ]
})

createApp(App)
  .use(
    createVuestic({
      config: {
        colors: {
          presets: {
            light: {
              backgroundSecondary: '#1D1C21',
              backgroundElement: '#131A22'
            }
          }
        }
      }
    })
  )
  .use(autoAnimatePlugin)
  .use(router)
  .mount('#app')
