<template lang="html">
  <div>
    <section 
      v-if="groupData.title"
      :class="['groupHeader', 'level'+level]"
    >
      <span class="title">{{ groupData.title }}</span>
      <p class="deckInfo">
        <a 
          v-if="groupData.author && groupData.authorLink" 
          :href="groupData.authorLink"
          target="_blank"
          v-text="'By ' + groupData.author"
        />
        <span v-else-if="groupData.author">
          By {{ groupData.author }}
        </span>
        <span v-if="groupData.author && groupData.version">
          -
        </span>
        <span v-if="groupData.version">
          v{{ groupData.version }}
        </span>
      </p>
      <p 
        :class="['selectionRequirements', {selectionRequirementsMet}]" 
        v-html="selectionRequirementsMsg"
      ></p>
      <p class="description" v-if="groupData.description" v-html="groupData.description"></p>
      <div v-if="groupData.img" class="image">
        <img :src="this.getAssetUrl(groupData.img)">
      </div>
      <a v-if="groupData.imgSource" class="imgSource" :href="groupData.imgSource" @click.stop target="_blank">
        Image Source
      </a>
    </section>
    <ul class="choice-group">
      <li 
        v-for="child in visableContains" 
        :key="child.id" 
        :class="{
          choiceGroup: child.contains, 
          choice: !child.contains
        }"
      >
        <view-deck-card-group
          v-if="child.contains"
          :groupData="child"
          :level="level+1"
          :selectable="selectable"
          :hideNotSelected="hideNotSelected"
          @selectionChanged="setSelection"
        />
        <view-deck-card-choice 
          v-else
          :choiceData="child"
          :selectable="selectable"
          :selected="isSelected(child)"
          :hideNotSelected="hideNotSelected"
          @selectionChanged="setSelection"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="js">
  import ViewDeckCardChoice from './ViewDeckCardChoice.vue'
  import deckMixin from '../mixins/deck'

  export default {
    name: 'view-deck-card-group',
    props: ['groupData', 'level', 'hideNotSelected', 'selectable'],
    mixins: [deckMixin],
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
      },
      selectionRequirementsMsg () {
        const min = this.groupData.minSelectable
        const max = this.groupData.maxSelectable
        if (min && min === max) {
          return 'Choose ' + max
        } else if (min && max) {
          return 'Choose at least ' + min + ' but no more than ' + max
        } else if (min) {
          return 'Choose at least ' + min
        } else if (max) {
          return 'Choose up to ' + max
        } else {
          return null
        }
      },
      selectionRequirementsMet () {
        return !this.groupData.minSelectable || this.subtreeSelected(this.groupData).length >= this.groupData.minSelectable
      }
    },
    components: {ViewDeckCardChoice}
}
</script>

<style scoped lang="scss">
  .deckInfo {
    font-style: italic;
  }
  ul {
    padding-left: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }  
  li {
    list-style-type: none;
    margin: 30px;
    max-width: 100%;
  }
  li.choiceGroup {
    flex: 0 1 auto;
  }
  li.choice {
    flex: 0 1 20em;
  }

  @media (max-width: 25em) {
    .choiceGroup {
      margin: 0;
    }
    li {
      margin: 15px 0;
    }
  }

  .groupHeader {
    max-width: 40em;
    margin: auto;
  }
  .groupHeader.level1 {
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .groupHeader.level2 {
    padding-left: 0;
  }
  .groupHeader.level3 {
    padding-left: 4em;
  }
  .groupHeader.level4 {
    padding-left: 8em;
  }
  .groupHeader.level5 {
    padding-left: 12em;
  }
  .title {
    font-weight: bold;
    display: inline-block;
  }
  .level1 .title {
    font-size: 6em;
    margin: 10px 0;
  }
  .level2 .title {
    font-size: 4em;
    margin: 10px 0;
  }
  .level3 .title {
    font-size: 3em;
    margin: 10px 0;
  }
  .level4 .title {
    font-size: 2em;
    margin: 10px 0;
  }
  .level5 .title {
    font-size: 1em;
    margin: 10px 0;
  }
  ul {
    padding-left: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .selectionRequirements {
    font-weight: bold;
    color: #ff6200;
  }
  .selectionRequirementsMet {
    color: unset;
  }
  .description {
    //background-color: #99d8ff;
    max-width: 40em;
    margin-top: 0;
  }
  .level1 .description {
    margin: 0.5em 0 2em;
  }
  img {
    box-sizing: border-box;
    max-width: 40em;
  }
  .image img {
    max-width: 100%;
  }
  .imgSource {
    color: #a9a6a6;
    text-decoration: none;
    align-self: flex-start;
  }
  @media (max-width: 500px) {
    img {
      padding: 0;
      padding-bottom: 1em;
    }
    .groupHeader.level1, .groupHeader.level2, .groupHeader.level3, 
    .groupHeader.level4, .groupHeader.level5 {
      padding-left: 0;
    }
  }
  @media (max-width: 25em) {
    .level1 .title {
      font-size: 3em;
    }
    .level2 .title {
      font-size: 2.5em;
    }
    .level3 .title {
      font-size: 2em;
    }
    .level4 .title {
      font-size: 1.5em;
    }
    .level5 .title {
      font-size: 1em;
    }
  }
  
  /* Custom CSS */
  /* ... */
</style>
