import './main.css!';
import tmpl from './main-tmpl.html!text';
import Vue from 'vue';

Vue.component('nav-bar', {
    template: tmpl,
    props: []
});
