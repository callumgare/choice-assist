<template>
  <div id="page">
    <main>
      <h1 v-if="metaDeckData.isIssue">
        Oh noes! I've detected an error with your deckData.json file.
      </h1>
      <h1 v-else>
        deckData.json Debugging Info
      </h1>
      In order for share links to work properly each choice must have an ID.
      ID's should be...
      <ul>
        <li>A whole number, non-negitive, number. Eg 0, 1, 2, 42.</li>
        <li>Unique. No two nodes should share an ID.</li>
        <li>
          Idealy use small numbers. The easiest way to do this is to make them roughly sequential.
        </li>
      </ul>

      <hr>

      <p v-if="metaDeckData.nodesWithInvalidIDs.length < 1">
        🎉  No invalid IDs found!
      </p>
      <details v-else>
        <summary>
          Bugger. Currently you have {{ metaDeckData.nodesWithInvalidIDs.length }} 
          choice{{metaDeckData.nodesWithInvalidIDs.length > 1 ? 's' : ''}} in deckData.json with invalid ID's.<br>
          <em>Click for details</em>
        </summary>
        <ul>
          <li v-for="elm in metaDeckData.nodesWithInvalidIDs.filter(node => node)" :key="JSON.stringify(elm)">
            <strong>{{ elm.reason }}: </strong><span>{{ getNodePath(elm.node) }}</span>
          </li>
        </ul>
      </details>
      <p v-if="metaDeckData.largestID <= metaDeckData.optimalMaxID">
        🎉  Yay! Your largest id is smaller than or equal to the maximum recommended. 
      </p>
      <details v-else>
        <summary>
          At least one of your ID's is large enougth to unnecessarily increase the length of 
          share links.<br>
          <em>Click for details</em>
        </summary>
        <dl>
          <dt>Total Number of Choices</dt>
          <dd>{{ choices.length}}</dd>
          <dt>Optimal Maximum ID Number</dt>
          <dd>{{ metaDeckData.optimalMaxID}}</dd>
          <dt>Actual Maximum ID Number</dt>
          <dd>{{ metaDeckData.largestID}}</dd>
        </dl>
        If the largest ID is above the optimal max ID then share links will be longer than
        strictly necessary.
        </details>

      <hr>

      <template v-if="metaDeckData.isIssue || metaDeckData.largestID > metaDeckData.optimalMaxID">
        <p v-if="metaDeckData.isIssue">
          The following is a fixed copy of your deckData.json file. You should replace the contents of 
          your current deckData.json file with this. 
          <template v-if="metaDeckData.largestID > metaDeckData.optimalMaxID">
            It also include some optimisations which will make share links shorter. <strong>Just be 
            aware that although every effort has been taken to avoid doing so, this may break any existing share 
            links.</strong>
          </template>
        </p>
        <p v-else>
          The following is an optimised copy of your deckData.json. <strong>Just aware that althougth 
          it tries it's best not to, it may break some existing share links.</strong>
        </p>
        <textarea 
          @focus="$event.target.select()" 
          @click="$event.target.select()"
          v-model="optimisedDataJSON">
        </textarea>
      </template>
      <router-link v-else :to="{name: 'Index'}">Go to Choices</router-link>
    </main>
  </div>  
</template>

<script>
import deck from '@/mixins/deck'
export default {
  name: 'DataDebug',
  mixins: [deck],
  methods: {
    getNodePath (node) {
      if (!node) return ''
      var path = [node]
      while (this.getNodeParent(path[0])) {
        path.unshift(this.getNodeParent(path[0]))
      }
      return path.map(node => node.title + ' (id: ' + JSON.stringify(node.id) + ')').join(' → ')
    },
    getNodeParent (node) {
      return this.choiceGroups.find(group => group.contains.includes(node))
    }
  },
  computed: {
    optimisedDataJSON () {
      return this.stringifyDeckData(this.optimisedDeckData)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../mixins/ui.scss';
  #page {
    padding: 2em;
    max-width: 40em;
    margin: auto;
    font-size: 1.3em;
  }

  h1 {
    font-size: 2.5em;
  }

  a {
    color: #0768c1;
  }

  dt {
    font-weight: bold;
  }

  hr {
    margin: 2em 0;
  }
  textarea {
    width: 100%;
    min-height: 40em;
  }

  summary {
    display: block;
    position: relative;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    content: '😵';
    padding-right: 0.2em;
    transition: transform 0.5s;
    display: inline-block;
  }

  summary:focus {
      outline: none;
  }
  summary:focus::after {
      content: '';
      display: block;
      background-color: #0c93e7;
      position: absolute;
      left: -15px;
      top: 0;
      bottom: 0;
      width: 5px;
  }

  details[open] > summary::before {
    transform: rotate(90deg);
  }

  details[open] summary ~ * 
  {
  animation: sweep .5s ease-in-out;
  animation-fill-mode: forwards;
  }

  @keyframes sweep 
  {
  0%    {opacity: 0; margin-left: 0em}
  100%  {opacity: 1; margin-left: 1em}
  }
  details {
    margin: 1em 0;
  }
  
  /* Custom CSS */
  /* ... */
</style>
