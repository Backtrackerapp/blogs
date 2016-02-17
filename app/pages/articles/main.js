import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';
import 'app/components/article-thumb-panel/main';
import 'app/components/contact-panel/main';
import article_read from 'app/components/article-read-panel/main';

var filter_map = {
    'asia': 'Asia',
    'latinamerica': 'Latin America',
    'northamerica': 'North America',
    'europe':       'Europe',
    'africa':       'Africa',
    'aus':          'Australasia',
    'blog':         'Our Blog'
};

function get_articles(filter, page){
    var params = '?';
    if(filter) params += 'category='+filter;
    params += '&';
    if(page) params += 'page='+page;
    return new Promise((resolve, reject)=>{
        Vue.http.get('api/v2/articles'+params)
        .success(resolve)
        .error(reject);
    });
}

var articles = Vue.extend({
    template: tmpl,
    data() {
        return {
            articles: [],
            viewed : null,
            filter: null,
            more: true,
            more_loading: false,
            mored: false,
            page: 0
        };
    },
    computed: {
        fancy_filter(){
            if(this.filter) return filter_map[this.filter];
        },
        more_text() {
            if(this.more_loading) return "Thinking...";
            return "Please Sir, can I have some more?";
        },
        selected(){
            if(this.viewed) return this.viewed.id;
        }
    },
    methods: {
        open_article(article) {
            this.viewed = article;
            if(this.filter)
                this.$route.router.go(`/${article.id}?f=${this.filter}`);
            else
                this.$route.router.go(`/${article.id}`);
        },
        get_more(){
            this.page++;
            this.more_loading = true;
            this.mored = true;
            get_articles(this.filter, this.page).then((data) => {
                this.more_loading = false;
                if(data.length < 30) this.more = false;
                data.forEach((a)=>{
                    this.articles.push(a);
                });
            });
        }
    },
    route: {
        data(transition) {
            if(transition.to.name == 'articles') this.viewed = null;
            var filter = transition.to.query.f;
            if(this.articles.length > 0 && this.filter == filter) transition.next();
            else {
                this.more = true;
                this.filter = filter;
                this.articles = [];
                this.page = 0;
                return get_articles(filter).then((data)=>{
                    if(data.length < 30) {
                        this.more = false;
                        this.mored = false;
                    }
                    this.articles = data;
                });
            }
        }
    }
});


export default {
    component: articles,
    name: 'articles',
    subRoutes: {
        '/:article_id': {
            component: article_read,
            name: 'article'
        }
    }
};
