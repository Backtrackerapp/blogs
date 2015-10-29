import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';

export default {
    template: tmpl,
    props: ['article'],
    route: {
        data(transition) {
            var id = transition.to.params.article_id
            if(this.article && this.article.id == id) {
                console.log("Caching baby");
                transition.next()
            }
            else return new Promise((resolve, reject)=>{
                this.$http.get(`api/v2/articles/${id}`, (data, status, request) => {
                    resolve({
                        article: data
                    })
                }).error((data, status, request) => {
                    reject("failed with status: "+status);
                })
            });
        },
        canReuse: false
    }
};
