
import routes from './routes.js'

Vue.use(VueRouter)
const router = new VueRouter({routes})


new Vue({
    template: `
        <main>
            <header>
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <router-link to="/" exact class="navbar-item">Home</router-link>
                        <router-link to="/places" exact class="navbar-item">Places</router-link>
                        <router-link to="/email" exact class="navbar-item">Email</router-link>
                        <router-link to="/notes" exact class="navbar-item">Notes</router-link>
                    </div>
                </nav>
            </header>

            <router-view></router-view>

        </main>
    `,
    router
}).$mount('#app')
