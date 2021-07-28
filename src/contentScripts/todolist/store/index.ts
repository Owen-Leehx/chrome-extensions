import { State } from '../interface'

export const TODO_LIST_DATA = 'todoListData'

const getStorageSyncData = (key: string) =>
  new Promise<State[]>((resolve) => {
    chrome.storage.sync.get(key, (result) => {
      console.log('Value currently is ', result[key])
      resolve(result[key])
    })
  })

export const saveTodoList = (list: State[]) => {
  chrome.storage.sync.set({ [TODO_LIST_DATA]: list }, () => {
    console.log('Value is set to ', list)
  })
}

export const getTodoList = () => getStorageSyncData(TODO_LIST_DATA)
