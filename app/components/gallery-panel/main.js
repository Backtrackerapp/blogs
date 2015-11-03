import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';

Vue.component('gallery-panel', {
    template: tmpl,
    computed: {
        image(){
            if(this.item.post) return this.item.post.images[0];
            if(this.item.article) return this.item.article.images[0];
        }
    },
    props: ['item', 'detail']
});
