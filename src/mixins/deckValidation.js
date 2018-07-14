export default {
  computed: {
    metaDeckData () {
      var results = {
        nodesWithInvalidIDs: [],
        largestID: 0,
        optimalMaxID: 0,
        hashBytesPerChoice: 0,
        usedIDs: [],
        isIssue: false
      }

      this.nodes.forEach((node, i) => {
        if (!Number.isInteger(node.id)) {
          results.nodesWithInvalidIDs[i] = {reason: 'Not integer', node: node}
        } else if (node.id < 0) {
          results.nodesWithInvalidIDs[i] = {reason: 'Negative number', node: node}
        } else if (results.usedIDs[node.id]) {
          results.nodesWithInvalidIDs[i] = {reason: 'Duplicate id', node: node}
        } else {
          results.usedIDs[node.id] = node
          if (node.id > results.largestID) {
            results.largestID = node.id
          }
        }
      })

      results.hashBytesPerChoice = Math.ceil(
        // division is base change rule since we care about bytes not bits
        Math.log(this.choices.length) / Math.log(256)
      )
      // * 8 to convert bytes to bits
      results.optimalMaxID = Math.pow(2, results.hashBytesPerChoice * 8)

      results.isIssue = results.nodesWithInvalidIDs.length > 0
      return results
    },
    optimisedDeckData () {
      var deckData = JSON.parse(JSON.stringify(this.deckData))
      var lowestUnusedID = 0
      var info = this.metaDeckData

      this.subtreeNodes(deckData).forEach((node, i) => {
        if (info.nodesWithInvalidIDs[i] || node.id > info.optimalMaxID) {
          while (info.usedIDs[lowestUnusedID]) {
            lowestUnusedID++
          }
          node.id = lowestUnusedID
          info.usedIDs[lowestUnusedID] = true
        }
      })
      return deckData
    }
  }
}
