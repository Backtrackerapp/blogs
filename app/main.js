import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import 'jspm_packages/npm/normalize.css@3.0.3/normalize.css!';
import './main.css!';
import articles_page from 'app/pages/articles/main';
import gallery_page from 'app/pages/gallery/main';
import 'app/components/nav-bar/main';
import gallery_modal from 'app/components/gallery-modal/main';

Vue.use(Router);
Vue.use(Resource);
Vue.config.debug = true;

function calc_content_height() {
    var navbar = document.getElementsByClassName("NavBar")[0];
    return (window.innerHeight - navbar.offsetHeight);
}

var router = new Router({
    history: true
});
var debug = false;

Vue.http.options.root = '//api.backtrackerapp.com';
if(debug) Vue.http.options.root = '//backtrackerdev.herokuapp.com';

router.map({
    '*': {
        component: {
            template: "<h1>Got lost traveling the <strike>BackCountry</strike> BackTracker?</h1>"
        }
    },
    '/': articles_page,
    '/gallery': gallery_page
});


router.start({
    data() {
        return {
            content_height: 300,
            modal_height: "0",
            mobile_nav: false,
            modal: null,
            modal_params: null
        };
    },
    computed: {
        height() {
            var height = this.content_height + 1;
            if(this.mobile_nav) height -= 250;
            return height + 'px';
        }
    },
    components: {
        gallery: gallery_modal
    },
    methods: {
        close_modal(){
            this.modal = null;
            this.modal_params = null;
        }
    },
    ready() {
        window.app = this;
        this.$nextTick(() => {
            this.content_height = calc_content_height();
            this.modal_height = window.innerHeight + "px";
            window.addEventListener( "resize", () => {
                this.content_height = calc_content_height();
                this.modal_height = window.innerHeight + "px";
            } );
        });
        setTimeout(function(){
            window.scrollTo(0, 1);
        }, 0);
    }
}, 'body');
