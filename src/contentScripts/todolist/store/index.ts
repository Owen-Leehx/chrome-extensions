import { isWindow, TODO_LIST_DATA } from 'config/constant'
import { State } from '../interface'

export const chromeGetStorageSyncData = (key: string) =>
  new Promise<State[]>(resolve => {
    chrome.storage.sync.get(key, result => {
      console.log('Value currently is ', result[key])
      resolve(result[key])
    })
  })

export const chromeSaveTodoList = (list: State[]) => {
  chrome.storage.sync.set({ [TODO_LIST_DATA]: list }, () => {
    console.log('Value is set to ', list)
  })
}

export const localGetTodoList = () =>
  new Promise<State[]>(resolve => {
    const list = JSON.parse(localStorage.getItem(TODO_LIST_DATA) || '[]') as any
    resolve(list)
  })

export const localSaveTodoList = (list: State[]) => {
  localStorage.setItem(TODO_LIST_DATA, JSON.stringify(list))
}

export const saveTodoList = (list: State[]) => {
  isWindow ? localSaveTodoList(list) : chromeSaveTodoList(list)
}

export const getTodoList = () => (isWindow ? localGetTodoList() : chromeGetStorageSyncData(TODO_LIST_DATA))
