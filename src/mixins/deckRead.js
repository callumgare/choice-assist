export default {
  methods: {
    isSelected (choice) {
      return this.$root.selectedIds.includes(choice.id)
    },
    traverseDeckData (leaf, internal, node) {
      // is currently a depth-first search
      // if breath-first is ever required then adapt this function
      // to check whether either leaf or internal have a second
      // param. If this is the case then that param is marks that
      // return data from search returns should be placed into that
      // param. Thus if leaf has a second param, do a breath-first,
      // if internal has a second param then do a depth-first search.
      if (!node) node = this.deckData
      if (node.contains) {
        var returnData = node.contains.map(
          node => this.traverseDeckData(leaf, internal, node)
        )
        if (internal) return internal(node, returnData)
      } else {
        if (leaf) return leaf(node)
      }
    },
    getNodeById (id) {
      return this.subtreeNodes(this.deckData || this.$root.deckData).find(choice => choice.id === id)
    },
    subtreeNodes (subtree) {
      var nodes = []
      this.traverseDeckData(choice => nodes.push(choice), choiceGroup => nodes.push(choiceGroup), subtree)
      return nodes
    },
    subtreeChoices (subtree) {
      return this.subtreeNodes(subtree).filter(node => !node.contains)
    },
    subtreeChoiceGroups (subtree) {
      return this.subtreeNodes(subtree).filter(node => node.contains)
    },
    subtreeSelected (subtree) {
      var choicesMap = {}
      this.subtreeChoices(subtree).forEach(choice => { choicesMap[choice.id] = choice })
      return this.$root.selectedIds
        .filter(id => choicesMap[id])
        .map(id => choicesMap[id])
    }
  },
  computed: {
    nodes () {
      return this.subtreeNodes(this.deckData)
    },
    choices () {
      return this.subtreeChoices(this.deckData)
    },
    choiceGroups () {
      return this.subtreeChoiceGroups(this.deckData)
    },
    selected () {
      return this.subtreeSelected(this.deckData)
    }
  }
}
