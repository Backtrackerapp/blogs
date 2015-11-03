import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';

Vue.component('article-thumb', {
    data() {
        return {
            height: 400
        };
    },
    props: ['article', 'selected'],
    computed: {
        cover(){
            return `url(${this.article.cover_image.ipad}) no-repeat center center`;
        }
    },
    template: tmpl,
    ready() {
        // document.getElementsByClassName('articleThumb')[0]
    }
});

export let __hotReload = true;
