import { State, ActionData, ActionType } from './interface'

const reducer = (state: State[], action: ActionData): State[] => {
  switch (action.type) {
    case ActionType.ADD:
      return [
        ...state,
        {
          id: new Date().toDateString(),
          createTime: new Date().toDateString(),
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
              updateTime: new Date().toDateString(),
            }
          : item
      })

    default:
      return state
  }
}

export default reducer
