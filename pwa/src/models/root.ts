import { Instance, types } from 'mobx-state-tree'

const LibRecord = types.model({
  id: types.identifier,
  title: types.string,
  sub: types.string,
  notes: types.string,
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
  })
  .actions((self) => {
    return {
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
