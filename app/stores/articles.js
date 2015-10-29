import Vue from 'vue';

class Articles_Store {
    get(filter){
        return new Promise((resolve, reject)=>{
            this.$http.get('api/v2/articles', resolve).error(reject);
        });
    }
}


var articles_store = new Articles_Store();

export default {
    install(Vue, options){
        Vue.prototype.$articles = articles_store
    }
}
