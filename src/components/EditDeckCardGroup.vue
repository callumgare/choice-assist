<template lang="html">
  <div>
    <section 
      v-if="groupData.title"
      :class="['groupHeader', 'level'+level]"
    >
      <input class="title" v-model="groupData.title"></input>      
      <p v-if="level === 1" class="deckInfo">
        <input v-model="groupData.author" placeholder="Author">
        <input v-model="groupData.authorLink" placeholder="Author Link">
        <input v-model="groupData.version" placeholder="Deck Version">
      </p>
      <p class="selectableLimit">
        <span>Minimum Selectable:</span>
        <input
          v-model.number="groupData.minSelectable"
          type="number"
        ></input><br>
        <span>Maximum Selectable:</span>
        <input
          v-model.number="groupData.maxSelectable"
          type="number"
        ></input>
      </p>
      <textarea 
        class="description" 
        v-model="groupData.description"
        placeholder="Description"
      ></textarea>
      <p class="imageFilename">
        <span>Image Filename:</span>
        <input 
          placeholder="Image Filename"
          v-model="groupData.img"
        ></input>
      </span>
      <div v-if="imageExists">
        <img :src="imageSrc">
      </div>
      <span class="imageMsg" v-else-if="deckData.img">
        Image could not be found. Make sure an image with the same file name exists in the assets folder.
      </span>
      <input 
        v-if="imageExists || deckData.imgSource"
        class="imageSource"
        placeholder="Image Source"
        v-model="deckData.imgSource"
      ></input>
    </section>
    <ul class="choice-group">
      <li 
        v-for="child in groupData.contains" 
        :key="child.id" 
        :class="[child.contains ? 'choiceGroup' : 'choice']"
      >
        <edit-deck-card-group
          v-if="child.contains"
          :groupData="child"
          :level="level+1"
        />
        <edit-deck-card-choice 
          v-else
          :choiceData="child"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="js">
  import EditDeckCardChoice from '@/components/EditDeckCardChoice.vue'
  import deckMixin from '@/mixins/deck'
  export default {
    name: 'edit-deck-card-group',
    props: ['groupData', 'level'],
    mixins: [deckMixin],
    data () {
      return {
      }
    },
    components: {EditDeckCardChoice}
}
</script>

<style scoped lang="scss">
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
    max-width: 100%;
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
  .selectableLimit, .imageFilename {
    font-weight: bold;
  }
  .description {
    //background-color: #99d8ff;
    max-width: 40em;
    margin-top: 0;
    width: 100%;
    height: 12em;
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
  .imageSource {
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
