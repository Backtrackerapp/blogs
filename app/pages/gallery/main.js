import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';
import 'app/components/gallery-panel/main';


var gallery = Vue.extend({
    template: tmpl,
    data() {
        return {
            images: [],
            detail: null
        };
    },
    methods: {
        show_detail(detail) {
            this.$root.modal_params = detail;
            this.$root.modal = 'gallery';
        }
    },
    route: {
        data(){
            return new Promise((resolve, reject)=>{
                Vue.http.get('api/v2/galleries')
                .success(resolve)
                .error(reject);
            }).then((data)=>{
                this.images = data;
            });
        }
    }
});


export default {
    component: gallery,
    name: 'gallery'
};
