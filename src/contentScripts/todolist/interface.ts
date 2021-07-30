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
  createTime: number
  updateTime?: number
  sortInfo?: SortInfo
  eventTime?: number
}

export interface ActionData extends Partial<State> {
  type: ActionType
  initialData?: State[]
  filterType?: TabKey
}
export enum ActionType {
  ADD = 'addItem',
  DEL = 'deleteItem',
  FINISH = 'finishItem',
  SORT = 'sortItem',
  INITIAL = 'initial',
  FILTER = 'filter',
}

export enum TabKey {
  ALL = 'all',
  ACTIVE = 'active',
  DONE = 'done',
}
