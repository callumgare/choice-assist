<template lang="html">
  <div :class="['choiceGroupFlatView', {top: level === 1}]">
    <header>
      <h1 
        v-if="groupData.title"
        :class="['groupTitle']" 
      >
        {{ groupData.title }}
      </h1>
      <span 
        v-if="groupData.maxSelectable"
        class="maxSelectable"
      >
        Max: {{groupData.maxSelectable}}
      </span>
      <span 
        v-if="groupData.minSelectable"
        class="minSelectable"
      >
        Min: {{groupData.minSelectable}}
      </span>
    </header>
    <ul class="choice-group">
      <li v-for="child in visableContains" :key="child.id" :class="{selected: isSelected(child) && !hideNotSelected, selectable}">
        <view-deck-flat
          v-if="child.contains"
          :groupData="child"
          :hideNotSelected="hideNotSelected"
          :selectable="selectable"
          @selectionChanged="setSelection"
        />
        <header v-else @click="clicked(child)">
          <h1>
            {{child.title}}
          </h1>
          <span :class="['price', {cost: child.cost > 0, gain: child.cost < 0, neutral: !child.cost || child.cost === 0}]">
            {{ isNaN(child.cost) || child.cost === 0 ? 'No Cost' : Math.abs(child.cost)+' Points' }}
          </span>
          <div class="qty" v-if="isSelected(child) && (child.maxSelectable > 1 || child.maxSelectable === undefined)">
            <span v-if="child.maxSelectable > 0" class="maxSelectable">Max: {{child.maxSelectable}}</span><!--
            --><span class="qty">QTY: {{ getQty(child) }}</span>
            <span class="qtyButtons" v-if="selectable" @click.stop>
              <span 
                @click="setQty(child, getQty(child) + 1)" 
                :class="{disabled: getQty(child) >= child.maxSelectable}"
              >
                ➕
              </span>
              <span 
                @click="setQty(child, getQty(child) - 1)" 
                :class="{disabled: getQty(child) <= 1}"
              >
                ➖
              </span>
            </span>
          </div>
        </header>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
  import deckMixin from '@/mixins/deck'
  
  export default {
    name: 'view-deck-flat',
    mixins: [deckMixin],
    props: ['groupData', 'level', 'hideNotSelected', 'selectable'],
    data () {
      return {
      }
    },
    computed: {
      visableContains () {
        if (!this.hideNotSelected) return this.groupData.contains
        return this.groupData.contains.filter(child => {
          if (this.isSelected(child)) return true
          if (child.contains && this.subtreeSelected(child).length > 0) return true
        })
      }
    },
    methods: {
      clicked (choice) {
        if (!this.selectable) return
        if (this.isSelected(choice)) {
          this.setQty(choice, 0)
        } else {
          this.setQty(choice, 1)
        }
      },
      getQty (choice) {
        return this.selected.filter(c => c === choice).length
      },
      setQty (choice, newValue) {
        var max = choice.maxSelectable
        if (!this.selectable) return
        if (max > 0 && newValue > max) return
        if (newValue < 0) return
        this.setSelection(choice, newValue)
      }
    }
  }
</script>

<style scoped lang="scss">
  .choiceGroupFlatView.top {
    background-color: #dbecf9;
    padding: 2em;
  }
  ul {
    text-align: initial;
    padding-left: 0;
    margin: 0;
  }  
  li {
    list-style-type: none;
    margin: 10px 30px;
    max-width: 100%;
  }
  li.choiceGroup {
    flex: 0 1 auto;
  }
  h1 {
    font-size: 1.2em;
    font-weight: normal;
    margin: 0;
  }
  h1.groupTitle {
    font-weight: bold;
  }
  header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
  }
  .qtyButtons {
    user-select: none; // stop accidental selection when clicking qty increments
  }
  .maxSelectable, .minSelectable, .price, span.qty, .qtyButtons {
    margin-left: 1em;
  }
  .maxSelectable, .minSelectable, .price, span.qty {
    font-style: italic;
    color: rgb(128, 128, 128);
  }
  .price.gain::before {
    content: 'Gain:';
    color: #217f21;
  }
  .price.cost::before {
    content: 'Cost:';
    color: #842323;
  }
  .disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  .selected {
    position: relative;
  }
  .selected::before {
    color: #decd55;
    content: "\2022";
    position: absolute;
    left: -0.7em;
    font-size: 3em;
    line-height: 0.6em;
  }
  
  /* Custom CSS */
  /* ... */
</style>
