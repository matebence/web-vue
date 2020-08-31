import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)

Vue.http.options.root = process.env.HOST_BLESK
