import { castToSnapshot, types } from 'mobx-state-tree'
import { LibRecord, LibRecordScoreBoard, StateModel } from './root'

export const UiModel = types
  .model({
    activeLibRecord: types.maybe(types.reference(types.late(() => LibRecord))),
    displayables: types.array(types.reference(types.late(() => LibRecord))),
    scores: types.maybe(types.reference(types.late(() => LibRecordScoreBoard))),
    stateRef: types.reference(types.late(() => StateModel)),
  })
  .views((self) => ({
    getActive: () => {
      return self.activeLibRecord
    },
    getScores: () => {
      return self.scores?.scores.filter(
        (s) => s.libRecord.id === self.activeLibRecord?.id,
      )
    },
  }))
  .actions((self) => {
    return {
      startView: () => {
        self.displayables = castToSnapshot([...self.stateRef.libRecords.keys()])
        self.activeLibRecord = self.displayables[0]
        self.scores = self.stateRef.scoreBoard
      },
      setActive: (data: { libRecordId: string }) => {
        const match = self.displayables.find((d) => data.libRecordId === d.id)
        if (match) {
          self.activeLibRecord = match
        }
      },
      next: () => {
        // TODO: update to support end of array
        const activeIndex = self.displayables.findIndex(
          (d) => d.id === self.activeLibRecord?.id,
        )
        const nextIndex = activeIndex + 1
        const next = self.displayables[nextIndex]
        self.activeLibRecord = next
      },
    }
  })
