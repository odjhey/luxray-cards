import localforage from 'localforage'
import { TRootStore } from './root'
import { applySnapshot, onSnapshot } from 'mobx-state-tree'
import { tmpData, topExpressionsData } from '../data/kanji'

type StoreMiddleware = (store: TRootStore) => TRootStore | Promise<TRootStore>

export const setup = async (
  store: TRootStore,
  middlewares: StoreMiddleware[],
): Promise<TRootStore> => {
  return middlewares.reduce((p, c) => {
    return p.then((x) => c(x))
  }, Promise.resolve(store))
}

export const loadFromStorage: StoreMiddleware = async (store) => {
  await localforage.getItem('rootStore-asdfj1').then((snap) => {
    if (snap) {
      applySnapshot(store, snap)
    }
  })

  return store
}

export const saveOnChange: StoreMiddleware = (store) => {
  onSnapshot(store, (snap) => {
    localforage.setItem('rootStore-asdfj1', snap)
  })

  return store
}

export const loadLibRecords: StoreMiddleware = async (store) => {
  ;[...tmpData, ...topExpressionsData].forEach((record) => {
    store.userspace?.state.newLibRecord({
      id: record.kanji,
      title: record.kanji,
      sub: `${record.furigana.on} - ${record.furigana.kun}`,
      notes: `${record.en} - ${record.romaji.on} - ${record.romaji.kun}`,
    })
  })

  return store
}
