<template lang="html">
  <div class="choice">
    <input 
      class="title" 
      v-model="choiceData.title"
    ></input>
    <input 
      class="imageFilename"
      placeholder="Image Filename"
      v-model="choiceData.img"
    ></input>
    <div v-if="imageExists">
      <img :src="imageSrc">
    </div>
    <span class="imageMsg" v-else-if="deckData.img">
      Image could not be found. Make sure an image with the same file name exists in the assets folder.
    </span>
    <label>URL of Image Source</label>
    <input 
      class="imgSource" 
      v-model="choiceData.imgSource"
    ></input>
    <label>Price</label>
    <input 
      class="price" 
      v-model.number="choiceData.cost"
      type="number"
    ></input>
    <label>How many times can this be selected</label>
    <select v-model="selectability">
      <option value="once">Once</option>
      <option value="limited">Limited</option>
      <option value="unlimited">Unlimited</option>
    </select>
    <template v-if="selectability === 'limited'">
      <span>Maximum Selectable</span>
      <input  
        v-model.number="maxSelectable"
        type="number"
        min="2"
      ></input>
    </template>
    <textarea 
      class="description" 
      v-model="choiceData.description"
      placeholder="Description"
    ></textarea>
  </div>
</template>

<script lang="js">
  import deckMixin from '../mixins/deck'
  
  export default {
    name: 'edit-deck-card-choice',
    mixins: [deckMixin],
    props: ['choiceData'],
    data () {
      return {
      }
    },
    computed: {
      maxSelectable: {
        // getter
        get: function () {
          return this.choiceData.maxSelectable || 1
        },
        // setter
        set: function (newValue) {
          if (!newValue || newValue <= 1) return
          this.choiceData.maxSelectable = newValue > 1
            ? newValue
            : undefined
        }
      },
      selectability: {
        // getter
        get: function () {
          if (this.choiceData.maxSelectable > 1) {
            return 'limited'
          } else if (this.choiceData.maxSelectable === undefined) {
            return 'unlimited'
          } else if (this.choiceData.maxSelectable === 1) {
            return 'once'
          }
        },
        // setter
        set: function (newValue) {
          if (newValue === 'once') {
            this.$set(this.choiceData, 'maxSelectable', 1)
          } else if (newValue === 'limited') {
            this.$set(this.choiceData, 'maxSelectable', 2)
          } else if (newValue === 'unlimited') {
            this.$set(this.choiceData, 'maxSelectable', undefined)
          }
        }
      }
    }
}
</script>

<style scoped lang="scss">
  img {
    max-width: 100%;
  }
  .choice {
    background-color: #ebf4fb;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #d6dfe6;
    transition: outline 0.1s, box-shadow 0.1s;
    outline: 0 solid #efdd0d;
  }
  .title {
    margin: 0;
    word-break: break-all;
    font-size: 2em;
    width: 100%;
  }
  input, select {
    margin-bottom: 1em;
  }
  .imgSource {
    align-self: left;
  }
  .description {
    width: 100%;
    height: 10em;
  }
  .horizontal {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .horizontal > * {
    margin: 0.5em 0;
  }
  .imageMsg {
    margin: 1em;
    font-style: italic;
  }
  
  /* Custom CSS */
  /* ... */
</style>
