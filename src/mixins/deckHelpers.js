export default {
  methods: {
    toggleChoiceSelection (choice) {
      if (!this.isSelected(choice)) this.unselectNeighboursIfNecessary(choice)

      if (this.deckData === this.$root.deckData) { // deckData is root
        var index = this.$root.selectedIds.indexOf(choice.id)
        if (index < 0) {
          this.$root.selectedIds.push(choice.id)
        } else {
          this.$root.selectedIds.splice(index, 1)
        }
      } else {
        this.$emit('choiceSelectionToggled', choice)
      }
    },
    unselectNeighboursIfNecessary (choice) {
      // if a new selection will tip the number of selected
      // over the max allowable amount of selected then
      // unselect one first
      if (this.selected.length >= this.deckData.maxSelectable) {
        var firstSelected = this.choices.find(choice => this.isSelected(choice))
        if (firstSelected) this.toggleChoiceSelection(firstSelected)
      }
    },
    getStatusHash () {
      // get min number of bytes required to represent choice ids
      var choiceIdSize = this.metaDeckData.hashBytesPerChoice

      // create binary buffer
      var hash = new ArrayBuffer(1 + (this.selected.length * choiceIdSize))

      // first byte of buffer = number of bytes to make choice ID
      new Uint8Array(hash)[0] = choiceIdSize

      // create array using the rest of the space in the buffer
      // element size depends on the number of bytes needed to represent choice ID
      var selectedChoiceIds
      if (choiceIdSize === 1) {
        selectedChoiceIds = new Uint8Array(hash, 1)
      } else if (choiceIdSize === 2) {
        selectedChoiceIds = new Uint16Array(hash, 1)
      } else if (choiceIdSize === 3) {
        selectedChoiceIds = new Uint32Array(hash, 1)
      } else {
        throw new Error('Could not create array from buffer')
      }

      // fill newly created array with selected choice IDs
      selectedChoiceIds.set(this.$root.selectedIds)

      // encode binary buffer as base 64 and return
      return btoa(String.fromCharCode(...new Uint8Array(hash)))
    },
    restoreStatusHash (hash) {
      // note: doesn't look like we can directly create a binary buffer
      // from a base64 string but we can create a typed array from one.
      // So do that, get byte size of IDs array from the first byte,
      // then create a new array from remaining bytes of that type size
      var typedArray = Uint8Array.from(atob(hash), c => c.charCodeAt(0))
      var choiceIdSize = typedArray[0]
      var selectedChoiceIds
      if (choiceIdSize === 1) {
        selectedChoiceIds = new Uint8Array(typedArray.buffer, 1)
      } else if (choiceIdSize === 2) {
        selectedChoiceIds = new Uint16Array(typedArray.buffer, 1)
      } else if (choiceIdSize === 3) {
        selectedChoiceIds = new Uint32Array(typedArray.buffer, 1)
      }
      this.$root.selectedIds = Array.from(selectedChoiceIds)
    },
    stringifyDeckData (deckData) {
      // remove properties with null values
      var deckDataCopy = JSON.parse(JSON.stringify(deckData))
      this.subtreeChoiceGroups(deckDataCopy).forEach(group => {
        if (group.maxSelectable === null || group.maxSelectable === '') {
          delete group.maxSelectable
        }
      })
      // in order to make the JSON more readable, put all other
      // properties above the contains
      // do so by giving array of all possible keys with 'contains' last
      // first get all possible keys (by exploiting the
      // replacer function in stringify to traverse the tree and get all properties):
      var keys = new Set()
      JSON.stringify(deckData, function (key, value) {
        if (key && typeof this === 'object' && !Array.isArray(this)) {
          keys.add(key)
        }
        return value
      })
      var keyOrder = [
        'title',
        'id',
        'version',
        'author',
        'authorLink',
        'description',
        'img',
        'imgSource',
        'maxSelectable',
        'budget',
        'cost',
        'contains'
      ]
      keys = Array.from(keys)
        .sort((a, b) => {
          // put any unknown keys after 'contains' if it exists or last
          var unknownKey = keyOrder.indexOf('contains')
          unknownKey = unknownKey !== -1 ? unknownKey - 0.5 : keyOrder.length

          a = keyOrder.indexOf(a)
          b = keyOrder.indexOf(b)
          a = a !== -1 ? a : unknownKey
          b = b !== -1 ? b : unknownKey
          return a - b
        })
      return JSON.stringify(deckDataCopy, keys, 2)
    }
  }
}
