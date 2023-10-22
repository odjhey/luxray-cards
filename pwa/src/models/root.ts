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

export const Userspace = types
  .model('Userspace', {
    notes: types.map(
      types.model({
        id: types.identifier,
        content: types.string,
      }),
    ),
    libRecords: types.map(LibRecord),
    scoreBoard: types.optional(LibRecordScoreBoard, {
      id: 'default',
      scores: [],
    }),
    ui: UiModel,
  })
  .actions((self) => {
    return {
      startView: () => {
        self.ui.displayables = castToSnapshot([...self.libRecords.keys()])
        self.ui.setActive({ libRecordId: self.ui.displayables[0].id })
        self.ui.scores = self.scoreBoard
      },
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
