import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';

export default {
    template: tmpl,
    props: ['article'],
    computed: {
        image(){
            var width = window.innerWidth;
            if(width < 800) return this.article.cover_image.iphone;
            if(width < 1200) return this.article.cover_image.ipad;
            return this.article.cover_image.web;
        },
        mail_to(){
            return `mailto:?&subject=${this.article.title}&body=Check%20out%20this%20awesome%20article%3A%20%0Ablogs.backtrackerapp.com/%23!/${this.article.id}`;
        },
        tweet(){
            return `https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20article%3A%20blogs.backtrackerapp.com/%23!/${this.article.id}`;
        },
        facebook() {
            return `https://www.facebook.com/sharer/sharer.php?u=blogs.backtrackerapp.com/%23!/${this.article.id}`;
        },
        pinterest() {
            var url = `blogs.backtrackerapp.com/%23!/${this.article.id}`;
            return `https://pinterest.com/pin/create/button/?url=${url}&media=${this.article.cover_image.original}&description=Awesome%20Article!%20${url}`;
        }
    },
    route: {
        data(transition) {
            var id = transition.to.params.article_id;
            if(this.article && this.article.id == id) {
                transition.next();
            }
            else return new Promise((resolve, reject)=>{
                this.$http.get(`api/v2/articles/${id}`, (data, status, request) => {
                    resolve({
                        article: data
                    });
                }).error((data, status, request) => {
                    reject("failed with status: "+status);
                });
            });
        },
        canReuse: false
    }
};
