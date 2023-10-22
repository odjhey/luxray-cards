import { types } from 'mobx-state-tree'
import { LibRecord } from './root'

export const LibRecordScore = types.model({
  id: types.identifier,
  date: types.Date,
  score: types.number,
  libRecord: types.reference(types.late(() => LibRecord)),
})

export const LibRecordScoreBoard = types
  .model({
    id: types.identifier,
    scores: types.array(LibRecordScore),
  })
  .actions((self) => {
    return {
      addScore: (data: { libRecordId: string; score: 1 | 2 | 3 | 4 }) => {
        self.scores.unshift({
          id: `${data.libRecordId}-${Date.now()}`,
          date: new Date(),
          libRecord: data.libRecordId,
          score: data.score,
        })
      },
    }
  })
