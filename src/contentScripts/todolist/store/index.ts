import { State } from '../interface'

const TODO_LIST_DATA = 'todoListData'

export const saveTodoList = (list: State[]) => {
  localStorage.setItem(TODO_LIST_DATA, JSON.stringify(list))
}

export const getTodoList = (): State[] =>
  JSON.parse(localStorage.getItem(TODO_LIST_DATA) || '[]')
