
import deckRead from '@/mixins/deckRead'
import deckHelpers from '@/mixins/deckHelpers'
import deckValidation from '@/mixins/deckValidation'

export default {
  mixins: [deckRead, deckHelpers, deckValidation],
  computed: {
    deckData () {
      return this.groupData || this.choiceData || this.$root.deckData
    }
  }
}
