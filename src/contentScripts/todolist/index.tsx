import React, { useReducer, useEffect } from 'react'
import reducer from './reducer'
import { Context, ActionType } from './interface'
import { TodoList } from './components'
import { AddItem } from './controls'
import { StyTodoListWrap, StyTodoListBox } from './style'
import { saveTodoList, getTodoList } from './store'

export const TodoListContext = React.createContext<Context>({} as Context)

export const TodoListSystem = () => {
  const [todoList, dispatch] = useReducer(reducer, [])
  useEffect(() => {
    getTodoList().then((res) => {
      dispatch({ type: ActionType.INITIAL, initialData: res })
    })
  }, [])
  useEffect(() => {
    saveTodoList(todoList)
  }, [todoList])

  return (
    <TodoListContext.Provider value={{ todoList, dispatch }}>
      <StyTodoListWrap>
        <StyTodoListBox>
          <AddItem />
          <TodoList list={todoList} />
        </StyTodoListBox>
      </StyTodoListWrap>
    </TodoListContext.Provider>
  )
}
