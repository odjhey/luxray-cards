import { Instance, castToSnapshot, types } from 'mobx-state-tree'
import { UiModel } from './ui'

export const LibRecord = types.model({
  id: types.identifier,
  title: types.string,
  sub: types.string,
  notes: types.string,
})

export const LibRecordScore = types.model({
  id: types.identifier,
  date: types.Date,
  score: types.number,
  libRecord: types.reference(LibRecord),
})

export const LibRecordScoreBoard = types.model({
  id: types.identifier,
  scores: types.array(LibRecordScore),
})

export const StateModel = types
  .model({
    id: types.identifier,
    libRecords: types.map(LibRecord),
    scoreBoard: types.optional(LibRecordScoreBoard, {
      id: 'default',
      scores: [],
    }),
  })
  .actions((self) => {
    return {
      addScore: (data: { libRecordId: string; score: number }) => {
        const match = self.libRecords.get(data.libRecordId)
        if (match) {
          self.scoreBoard.scores = castToSnapshot([
            ...self.scoreBoard.scores,
            {
              id: `${data.libRecordId}-${Date.now()}`,
              date: new Date(),
              libRecord: match,
              score: data.score,
            },
          ])
        }
      },
      newLibRecord: (data: {
        id: string
        title: string
        sub: string
        notes: string
      }) => {
        self.libRecords.put({
          id: data.id,
          title: data.title,
          sub: data.sub,
          notes: data.notes,
        })
      },
    }
  })

export const Userspace = types
  .model('Userspace', {
    state: StateModel,
    notes: types.map(
      types.model({
        id: types.identifier,
        content: types.string,
      }),
    ),
    ui: UiModel,
  })
  .actions((self) => {
    return {
      arterCreate: () => {
        self.ui.stateRef = self.state
      },
      newNote: (data: { id: string; content: string }) => {
        const { id, content } = data
        self.notes.put({
          id,
          content,
        })
      },
    }
  })

export const RootStore = types.model('RootStore', {
  userspace: types.maybe(Userspace),
})

export type TRootStore = Instance<typeof RootStore>
