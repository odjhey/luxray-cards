import { castToSnapshot, types } from 'mobx-state-tree'
import { LibRecord, StateModel } from './root'
import { LibRecordScoreBoard } from './scores'

export const UiModel = types
  .model({
    activeLibRecord: types.maybe(types.reference(types.late(() => LibRecord))),
    displayables: types.array(types.reference(types.late(() => LibRecord))),
    scores: types.maybe(types.reference(types.late(() => LibRecordScoreBoard))),
    stateRef: types.reference(types.late(() => StateModel)),
    scoreFilters: types.array(
      types.model({
        score: types.number,
        count: types.number,
      }),
    ),
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
      addFilter: (data: { score: number; count: number }) => {
        self.scoreFilters.push(data)
      },
      clearFilters: () => {
        self.scoreFilters = castToSnapshot([])
      },
      displayableStats: () => {
        return { count: self.displayables.length }
      },
      applyFilters: () => {
        if (self.scoreFilters.length < 0) {
          return
        }

        const filtered = [...self.stateRef.libRecords.keys()].filter((k) => {
          const scores = self.scores?.scores.filter((s) => s.libRecord.id === k)
          if (scores) {
            const toRemove = self.scoreFilters.map((f) => {
              const filteredScores = scores.filter((s) => s.score === f.score)
              if (filteredScores.length < f.count) {
                return false
              }
              return true
            })

            return toRemove.some((r) => r === false)
          }
          return true
        })

        self.displayables = castToSnapshot(
          filtered.map((f) => self.stateRef.libRecords.get(f)),
        )
      },

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
