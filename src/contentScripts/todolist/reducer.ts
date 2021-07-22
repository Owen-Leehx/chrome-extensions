import { State, ActionData, ActionType } from './interface'

const reducer = (state: State[], action: ActionData): State[] => {
  switch (action.type) {
    case ActionType.ADD:
      return [
        ...state,
        {
          id: new Date().valueOf(),
          createTime: new Date().toString(),
          content: action.content,
          isDone: false,
        },
      ]

    case ActionType.DEL:
      return state.filter((item) => item.id !== action.id)

    case ActionType.FINISH:
      return state.map((item) => {
        return item.id === action.id
          ? {
              ...item,
              isDone: true,
              updateTime: new Date().toString(),
            }
          : item
      })
    case ActionType.SORT: {
      const { sortInfo } = action
      const { from = 0, to = 0 } = sortInfo || {}
      const startIndex = from < 0 ? state.length + from : from
      if (startIndex >= 0 && startIndex < state.length) {
        const endIndex = to < 0 ? state.length + to : to
        const [item] = state.splice(from, 1)
        state.splice(endIndex, 0, item)
      }
      return [...state]
    }

    default:
      return state
  }
}

export default reducer
