import { castToSnapshot, types } from 'mobx-state-tree'
import { LibRecord, StateModel } from './root'
import { LibRecordScoreBoard } from './scores'

export const UiModel = types
  .model({
    activeLibRecord: types.maybe(types.reference(types.late(() => LibRecord))),
    displayables: types.array(types.reference(types.late(() => LibRecord))),
    scores: types.maybe(types.reference(types.late(() => LibRecordScoreBoard))),
    stateRef: types.reference(types.late(() => StateModel)),
  })
  .views((self) => ({
    getActive: () => {
      return {
        id: self.activeLibRecord?.id ?? '',
        title: self.activeLibRecord?.title ?? '',
        sub: self.activeLibRecord?.sub ?? '',
        notes: self.activeLibRecord?.notes ?? '',
      }
    },
    getScores: () => {
      return self.scores?.scores
        .filter((s) => s.libRecord.id === self.activeLibRecord?.id)
        .map((s) => {
          return {
            date: s.date,
            score: s.score,
          }
        })
    },
  }))
  .actions((self) => {
    return {
      shuffle: () => {
        self.displayables = castToSnapshot(shuffle(self.displayables))
        self.activeLibRecord = self.displayables[0]
      },
      startView: () => {
        self.displayables = castToSnapshot([...self.stateRef.libRecords.keys()])
        if (!self.activeLibRecord) {
          self.activeLibRecord = self.displayables[0]
        }
        self.scores = self.stateRef.scoreBoard
      },
      next: () => {
        const activeIndex = self.displayables.findIndex(
          (d) => d.id === self.activeLibRecord?.id,
        )
        const nextIndex = activeIndex + 1

        const next =
          nextIndex >= self.displayables.length
            ? self.displayables[0]
            : self.displayables[nextIndex]
        self.activeLibRecord = next
      },
      prev: () => {
        const activeIndex = self.displayables.findIndex(
          (d) => d.id === self.activeLibRecord?.id,
        )
        const nextIndex = activeIndex - 1

        const next =
          nextIndex < 0
            ? self.displayables[self.displayables.length - 1]
            : self.displayables[nextIndex]
        self.activeLibRecord = next
      },
    }
  })

// function that shuffles a given array, by copilot
const shuffle = (array: unknown[]) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
