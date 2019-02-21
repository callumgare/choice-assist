<template>
  <div id="page" :class="view + 'View'">
    <main>
      <edit-deck-card-group
        v-if="view === 'content'"
        :groupData="deckData"
        :level="1"
      />
      <template v-else-if="view === 'structure'">
        <p>
          Drag to reorder
        </p>
        <edit-deck-flat
          :groupData="deckData"
          :level="1"
        />
      </template>
      <textarea 
        v-else
        @focus="$event.target.select()" 
        @click="$event.target.select()"
        v-model="deckDataJSON">
      </textarea>
    </main>
    <footer :class="{overBudget: remaining < 0}">
      <div>
        <div>
          Budget:
          <input
            class="budget"
            type="number"
            v-model.number="deckData.budget"
          >
        </div>
      </div>
      <div>
        <button 
          v-if="$root.deckDataModified" 
          @click="$root.discardDraft"
          class="danger"
        >
          Discard Changes
        </button>
        <button 
          v-if="$root.deckDataModified" 
          @click="$router.push({name: 'Source'})"
          class="success"
        >
          Save Changes
        </button>
        <button @click="toggleContentView">
          {{this.view === 'content' ? 'Add/Remove/Reorder' : 'Modify Content'}}
        </button>
        <button @click="$router.push({name: 'Index'})">
          Preview Changes
        </button>
      </div>
    </footer>
  </div>  
</template>

<script>
import EditDeckCardGroup from '@/components/EditDeckCardGroup.vue'
import EditDeckFlat from '@/components/EditDeckFlat.vue'
import deckMixin from '@/mixins/deck'
export default {
  name: 'Index',
  mixins: [deckMixin],
  props: ['hash'],
  created () {
  },
  data () {
    return {
      view: 'content'
    }
  },
  computed: {
    deckDataJSON () {
      return this.stringifyDeckData(this.deckData)
    },
    spent () {
      return this.selected
        .map(choice => choice.cost || 0)
        .reduce(
          (a, b) => a + b, 0
        )
    },
    remaining () {
      return this.deckData.budget - this.spent
    }
  },
  components: {EditDeckCardGroup, EditDeckFlat},
  methods: {
    toggleContentView () {
      this.view = this.view === 'content' ? 'structure' : 'content'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../mixins/deck.scss';
  @import '../mixins/ui.scss';
  textarea {
    width: 100%;
    height: 40em;
  }
  
  /* Custom CSS */
  /* ... */
</style>
