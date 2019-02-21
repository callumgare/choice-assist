<template>
  <div id="page">
    <p>
      To save, replace the contents of the file deckData.json (which you should find 
      in the src folder) with the the following data. If you have used any images make sure the image file is placed 
      in the assets folder and that the filename is correct.
    </p>
    <p>
      When you are certain that you have updated deckData.json and you've given
      the server time to reload, click the <em>Reload Data From Server</em> button.
    </p>
    <p>
      <strong>⚠️ Be careful you have followed these instuctions else you'll lose your changes. ⚠️</strong>
    </p>
    <textarea 
      @focus="$event.target.select()" 
      @click="$event.target.select()"
      v-model="deckDataJSON">
    </textarea>
    <footer>
      <div>
      </div>
      <div>
        <button @click="reload" class="danger">
          Reload Data From Server
        </button>
        <button @click="$router.push({name: 'Editor'})">
          Continue Editing
        </button>
        <button @click="$router.push({name: 'Index'})">
          Home
        </button>
      </div>
    </footer>
  </div>  
</template>

<script>
import deckMixin from '@/mixins/deck'
export default {
  name: 'Source',
  mixins: [deckMixin],
  created () {
  },
  data () {
    return {
    }
  },
  computed: {
    deckDataJSON () {
      return this.stringifyDeckData(this.deckData)
    }
  },
  watch: {
  },
  methods: {
    reload () {
      this.$root.discardDraft()
      this.$nextTick().then(() => {
        this.$router.push({name: 'Index'})
        this.$nextTick().then(() => location.reload(true))
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../mixins/deck.scss';
  @import '../mixins/ui.scss';
  #page {
    margin-left: 1em;
    margin-right: 1em;
  }
  textarea {
    width: 100%;
    height: 40em;
  }
  
  /* Custom CSS */
  /* ... */
</style>
