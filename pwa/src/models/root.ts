import { Instance, types } from 'mobx-state-tree'

export const Userspace = types
  .model('Userspace', {
    notes: types.map(
      types.model({
        id: types.identifier,
        content: types.string,
      }),
    ),
  })
  .actions((self) => {
    return {
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
