import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import 'jspm_packages/npm/normalize.css@3.0.3/normalize.css!';
import './main.css!';
import articles_page from 'app/pages/articles/main';
import 'app/components/nav-bar/main';

Vue.use(Router);
Vue.use(Resource);
Vue.config.debug = true;

function calc_content_height() {
    var navbar = document.getElementsByClassName("NavBar")[0];
    return (window.innerHeight - navbar.offsetHeight) + 'px';
}

var router = new Router();

Vue.http.options.root = 'https://backtrackerdev.herokuapp.com';

router.map({
    '*': {
        component: {
            template: "<h1>Got lost traveling the <strike>BackCountry</strike> BackTracker?</h1>"
        }
    },
    '/': articles_page
})

router.start({
    data() {
        return {
            content_height: '100%'
        }
    },
    methods: {},
    ready() {
        window.app = this;
        this.$nextTick(() => {
            this.content_height = calc_content_height();
            window.addEventListener( "resize", () => this.content_height = calc_content_height() );
        });
    }
}, 'body');
