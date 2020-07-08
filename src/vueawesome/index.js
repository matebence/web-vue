import Vue from 'vue'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

dom.watch()
library.add(fas)
library.add(fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
