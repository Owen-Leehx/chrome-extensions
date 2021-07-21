import React, { useContext } from 'react'
import { Checkbox } from 'antd'
import { TodoListContext } from '../index'
import { ActionType, State } from '../interface'

interface Props {
  data: State
}

export const CheckboxItem = ({ data }: Props) => {
  const { id, isDone } = data
  const { dispatch } = useContext(TodoListContext)
  const handleChange = (e: any) => {
    dispatch({ type: ActionType.FINISH, id })
  }

  return <Checkbox disabled={isDone} checked={isDone} onChange={handleChange} />
}
