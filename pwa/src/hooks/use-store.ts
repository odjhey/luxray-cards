import { useEffect, useState } from 'react'
import { RootStore, TRootStore } from '../models/root'
import {
  loadFromStorage,
  loadLibRecords,
  saveOnChange,
  setup,
} from '../models/setup'

export const useStore = () => {
  const [store, setStore] = useState<TRootStore>(
    // TODO: BUG! not saving. fix later
    RootStore.create({ userspace: { notes: {} } }),
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setup(store, [saveOnChange, loadFromStorage, loadLibRecords])
      .then((s) => {
        setStore(s)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { store, loading }
}

export const useUserspace = () => {
  const { loading, store } = useStore()
  const userspace = store.userspace

  return { loading, userspace }
}
