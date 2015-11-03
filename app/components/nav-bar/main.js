import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';

Vue.component('nav-bar', {
    data(){
        return {
            categ: false,
            mobile_nav: false,
            mobile_categ: false,
        };
    },
    computed: {

    },
    template: tmpl,
    methods: {
        reset(){
            this.categ = this.mobile_categ = this.$root.mobile_nav = this.mobile_nav = false;
        },
        toggle_categories(){
            this.categ = !this.categ;
        },
        toggle_mobile_categories(){
            this.mobile_categ = !this.mobile_categ;
        },
        go_home(){
            this.reset();
            this.$route.router.go('/');
        },
        go_gallery(){
            this.reset();
            this.$route.router.go('/gallery');
        },
        go_category(category){
            this.reset();
            this.$route.router.go('/?f='+category);
        },
        toggle_mobile_nav(){
            this.$root.mobile_nav = this.mobile_nav = !this.mobile_nav;
        }
    },
    props: []
});
