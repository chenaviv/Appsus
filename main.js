
import routes from './routes.js'

Vue.use(VueRouter)
const router = new VueRouter({routes})


new Vue({
    template: `
        <main>
            <header class="appsus-header">
                <nav class="navbar bulma-nav-left" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <router-link to="/" exact class="navbar-item">Home</router-link>
                        <router-link to="/places" exact class="navbar-item">Places</router-link>
                        <router-link to="/email" exact class="navbar-item">Email</router-link>
                        <router-link to="/notes" exact class="navbar-item">Notes</router-link>
                    </div>
                </nav>
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-end">
                        <a class="navbar-item"><i class="fa fa-bell" aria-hidden="true"></i></a>
                    </div>
                </nav>
            </header>

            <router-view class="appsus-content"></router-view>

        </main>
    `,
    router
}).$mount('#app')
