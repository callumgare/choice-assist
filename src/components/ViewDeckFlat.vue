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
    </header>
    <ul class="choice-group">
      <li v-for="child in visableContains" :key="child.id" :class="{selected: isSelected(child) && !hideNotSelected, selectable}">
        <view-deck-flat
          v-if="child.contains"
          :groupData="child"
          :hideNotSelected="hideNotSelected"
          :selectable="selectable"
          @choiceSelectionToggled="toggleChoiceSelection"
        />
        <header v-else @click="selectable && toggleChoiceSelection(child)">
          <h1>
            {{child.title}}
          </h1>
          <span :class="['price', {cost: child.cost > 0, gain: child.cost < 0, neutral: !child.cost || child.cost === 0}]">
            {{ isNaN(child.cost) || child.cost === 0 ? 'No Cost' : Math.abs(child.cost)+' Points' }}
          </span>
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
  }
  .maxSelectable, .price {
    font-style: italic;
    margin-left: 1em;
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
</style>
