<template>
  <div id="page" :class="{hideNotSelected}">
    <div v-if="selected.length === 0">
      Nothing selected 
    </div>
    <view-deck-flat
      v-else-if="view === 'flat'"
      :groupData="deckData"
      :hideNotSelected="hideNotSelected"
      :level="1"
    />
    <view-deck-card-group
      v-else
      :groupData="deckData"
      :hideNotSelected="hideNotSelected"
      :level="1"
      :description="'<p><b>To share your choices simply copy the current page address</b><p>'+deckData.description"
    />
    <footer>
      <div>
        <button @click="toggleView">
          {{this.view === 'card' ? 'Flat' : 'Card'}} View
        </button>
        <button @click="toggleHideNotSelected">
          {{this.hideNotSelected ? 'Show' : 'Hide'}} Unchosen
        </button>
      </div>
      <div>
        <button @click="editChoices">
          Edit Selection
        </button>
      </div>
    </footer>
  </div>  
</template>

<script>
import ViewDeckCardGroup from '@/components/ViewDeckCardGroup.vue'
import ViewDeckFlat from '@/components/ViewDeckFlat.vue'
import deckMixin from '@/mixins/deck'
export default {
  name: 'Share',
  props: ['hash'],
  mixins: [deckMixin],
  data () {
    return {
      hideNotSelected: true,
      view: 'card'
    }
  },
  created () {
    if (this.$route.params.hash) {
      this.restoreStatusHash(this.$route.params.hash, this.deckData)
    }
  },
  components: {ViewDeckCardGroup, ViewDeckFlat},
  methods: {
    toggleHideNotSelected () {
      this.hideNotSelected = !this.hideNotSelected
    },
    toggleView () {
      this.view = this.view === 'card' ? 'flat' : 'card'
    },
    editChoices () {
      this.$router.push({name: 'Index'})
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../mixins/deck.scss';
  @import '../mixins/ui.scss';
</style>
