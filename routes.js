
import HomePage from './pages/HomePage.js'
import PlacesApp from './pages/PlacesApp.js'
import EmailApp from './pages/EmailApp.js'
import NotesApp from './pages/NotesApp.js'

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/places',
        component: PlacesApp
    },
    {
        path: '/email',
        component: EmailApp
    },
    {
        path: '/notes',
        component: NotesApp
    }
]

export default routes