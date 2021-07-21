import React, { useReducer, useEffect } from 'react'
import reducer from './reducer'
import { Context, State } from './interface'
import { TodoItem } from './components'
import { AddItem } from './controls'
import { StyTodoListWrap, StyTodoList } from './style'
import { saveTodoList, getTodoList } from './store'

export const TodoListContext = React.createContext<Context>({} as Context)

export const TodoList = () => {
  const initTodoList = getTodoList()
  const [todoList, dispatch] = useReducer(reducer, initTodoList)
  useEffect(() => {
    saveTodoList(todoList)
  }, [todoList])
  return (
    <TodoListContext.Provider value={{ todoList, dispatch }}>
      <StyTodoListWrap>
        <AddItem />
        <StyTodoList>
          {todoList.map((item: State) => (
            <TodoItem key={item.id} data={item} />
          ))}
        </StyTodoList>
      </StyTodoListWrap>
    </TodoListContext.Provider>
  )
}
