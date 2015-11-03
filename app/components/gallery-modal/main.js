import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';

export default Vue.extend({
    template: tmpl,
    computed: {
        image(){
            var src;
            if(this.params.post) src = this.params.post.images[0].original;
            else if(this.params.article) src = this.params.article.images[0].original;
            return {
                'background': `url(${src})`,
                'background-size': 'contain',
                'background-position': 'center',
                'background-repeat': 'no-repeat'
            };
        },
        link(){
            return this.params.article;
        }
    },
    methods: {
        go_item(){
            if(this.params.article){
                this.$root.close_modal();
                this.$route.router.go('/'+this.params.article.id);
            }
        }
    },
    props: ['params']
});
