<template lang="html">
  <div :class="['choiceGroupFlatView', {top: level === 1}]">
    <div class="title">
      <h1 
        v-if="groupData.title"
        :class="['groupTitle']" 
      >
        {{ groupData.title }}
      </h1>
      <div v-if="level !== 1" class="delete" @click="$emit('deleted')">Delete</div>
    </div>
    <draggable 
      :element="'ul'" 
      :list="groupData.contains" 
      class="dragArea" 
      :options="{group: {name:'g1'}, draggable: '.node', animation: 0}"
    >
      <li 
        v-for="child in groupData.contains" 
        :key="child.id"
        :class="['node', child.contains ? 'group' : 'choice']"
      >
        <edit-deck-flat
          v-if="child.contains"
          :group-data="child"
          @deleted="deleteItem(child)"
        />
        <div 
          v-else
          :class="['title']"
        >
          <h1>
            {{child.title}}
          </h1>
          <div class="delete" @click="deleteItem(child)">Delete</div>
        </div>
      </li>
    </draggable>
    <div v-if="level === 1" class="options" slot="footer">
      <button class="success addGroup" @click="addGroup">
        Add Group
      </button>
      <button class="success addChoice" @click="addChoice">
        Add Choice
      </button>
    </div>
  </div>
</template>

<script lang="js">
  import draggable from 'vuedraggable'
  import deckMixin from '@/mixins/deck'
  export default {
    name: 'edit-deck-flat',
    mixins: [deckMixin],
    props: [
      'groupData',
      'level'
    ],
    data () {
      return {
      }
    },
    methods: {
      addGroup () {
        this.groupData.contains.push({
          title: 'New Group',
          contains: [],
          id: this.getNextID()
        })
      },
      addChoice () {
        this.groupData.contains.push({
          title: 'New Choice',
          id: this.getNextID(),
          maxSelectable: 1
        })
      },
      deleteItem (item) {
        var id = this.groupData.contains.indexOf(item)
        this.groupData.contains.splice(id, 1)
      },
      getNextID () {
        // ids are ints starting from 0
        // thus if we sort them idealy the id for each
        // node will match it's index in the sorted list
        // we can first the smallest avaliable id by
        // getting the index of the first node who's id
        // is not each to it's index.
        var id = this.nodes
          .sort((a, b) => a.id - b.id)
          .findIndex((node, index) => node.id !== index)
        return id !== -1 ? id : this.nodes.length
      }
    },
    components: {draggable}
}
</script>

<style scoped lang="scss">
  @import '../mixins/ui.scss';
  .choiceGroupFlatView.top {
    // background-color: #dbecf9;
    border: 10px solid rgba(11, 129, 214, 0.5);
    padding: 2em;
  }
  .choiceGroup {
    //padding-left: 0px;
    text-align: initial;
    padding-left: 0;
    margin: 0;
  } 
  .node {
    list-style-type: none;
    max-width: 100%;
    background-color: #0080e414;
    padding: 1em;
    border: 1px solid rgba(11, 129, 214, 0.6);
  } 
  .node:not(:first-child) {
    margin-top: -1px;
  }
  .sortable-chosen:not(.sortable-ghost) {
    color: transparent;

  }
  .sortable-chosen:not(.sortable-ghost) * {
    opacity: 0;
    outline:  solid 10px;
  }
  
  .sortable-ghost {
    color: #fff;
    background-color: #0081e4;
  }
  ul {
    padding: 0;
  }
  .options {
    display: flex;
    margin: 1em 0;
  }
  .options > * {
    flex: 1 1 auto;
    margin: 5px 10px;
    background-color: rgba(87, 192, 52, 0.251);
    font-weight: normal;
    padding: 0.4em;
    border: none;
  }
  .options > *:first-child {
    margin-left: 0;
  }
  .options > *:last-child {
    margin-right: 0;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
  .delete {
    padding: 0.3em 0.6em;
    font-size: 0.8em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(251, 18, 18, 0.341);
    font-weight: bold;
    margin-left: 2em;
  }
  h1 {
    font-size: 1.2em;
    font-weight: normal;
    margin: 0;
  }
  h1.groupTitle {
    font-weight: bold;
  }
  .node.group {
    padding-bottom: 0;
  }
  .dragArea {
    min-height: 3.5em;
    margin: 0 1em;
    padding: 1em 0;
  }
  
  /* Custom CSS */
  /* ... */
</style>
