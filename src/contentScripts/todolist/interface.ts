import { type } from 'node:os'
import { Dispatch } from 'react'

export interface Context {
  todoList: State[]
  dispatch: Dispatch<ActionData>
}
export type SortInfo = { from: number; to: number }

export interface State {
  id: number
  content?: string
  isDone: boolean
  createTime: string
  updateTime?: string
  sortInfo?: SortInfo
}

export interface ActionData extends Partial<State> {
  type: ActionType
}
export enum ActionType {
  ADD = 'addItem',
  DEL = 'deleteItem',
  FINISH = 'finishItem',
  SORT = 'sortItem',
}
