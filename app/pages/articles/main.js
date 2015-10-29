import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';
import 'app/components/article-thumb-panel/main';
import article_read from 'app/components/article-read-panel/main';

var filter_map = {
    'asia': 'Asia',
    'latinamerica': 'Latin America',
    'northamerica': 'North America',
    'europe':       'Europe',
    'africa':       'Africa',
    'aus':          'Australasia',
    'blog':         'Our Blog'
}

var articles = Vue.extend({
    template: tmpl,
    data() {
        return {
            articles: [],
            viewed : null,
            filter: null
        }
    },
    computed: {
        fancy_filter(){
            if(this.filter) return filter_map[this.filter];
        }
    },
    methods: {
        open_article(article) {
            this.viewed = article;
            if(this.filter)
                this.$route.router.go(`/${article.id}?f=${this.filter}`);
            else
                this.$route.router.go(`/${article.id}`);
        }
    },
    route: {
        data(transition) {
            if(transition.to.name == 'articles') this.viewed = null;
            var filter = transition.to.query.f
            if(this.articles.length > 0 && this.filter == filter) transition.next();
            else if (filter) {
                this.filter = filter;
                this.articles = {}
                return new Promise((resolve, reject)=>{
                    this.$http.get(`api/v2/articles/category?category=${filter}`, (data, status, request) => {
                        resolve({
                            articles: data
                        })
                    }).error((data, status, request) => {
                        reject("failed with status: "+status);
                    })
                });
            } else {
                this.filter = filter;
                this.articles = {}
                return new Promise((resolve, reject)=>{
                    this.$http.get('api/v2/articles', (data, status, request) => {
                        resolve({
                            articles: data
                        })
                    }).error((data, status, request) => {
                        reject("failed with status: "+status);
                    })
                });
            }
        }
    }
})


export default {
    component: articles,
    name: 'articles',
    subRoutes: {
        '/:article_id': {
            component: article_read,
            name: 'article'
        }
    }
}
