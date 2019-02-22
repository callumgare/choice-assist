// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import VueClipboard from 'vue-clipboard2'

import deckData from '@/deckData.json'

const localStorageDraftKey = 'unsavedDeckData'

Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      deckData: this.loadDraft() || this.getDeckFromSource(),
      deckDataModified: !!this.loadDraft(),
      selectedIds: []
    }
  },
  methods: {
    getDeckFromSource () {
      return JSON.parse(JSON.stringify(deckData))
    },
    loadDraft () {
      return localStorage.getItem(localStorageDraftKey) &&
        JSON.parse(localStorage.getItem(localStorageDraftKey))
    },
    saveDraft (draftDeckData) {
      localStorage.setItem(localStorageDraftKey, draftDeckData)
    },
    discardDraft () {
      this.deckData = this.getDeckFromSource()
      this.$nextTick()
        .then(() => {
          localStorage.removeItem(localStorageDraftKey)
          this.deckDataModified = false
          this.$forceUpdate()
        })
    }
  },
  watch: {
    deckData: {
      handler (val) {
        this.deckDataModified = true
        this.saveDraft(JSON.stringify(val))
      },
      deep: true
    }
  },
  router,
  render: h => h(App)
})
