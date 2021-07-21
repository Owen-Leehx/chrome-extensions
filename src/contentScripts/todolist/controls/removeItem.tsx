import React, { useContext } from 'react'
import { TodoListContext } from '../index'
import { Button } from 'antd'
import { State, ActionType } from '../interface'

interface Props {
  data: State
}

export const RemoveItem = ({ data }: Props) => {
  const { id } = data
  const { dispatch } = useContext(TodoListContext)
  const handleRemove = () => {
    dispatch({ type: ActionType.DEL, id })
  }

  return (
    <Button type="link" onClick={handleRemove}>
      删除
    </Button>
  )
}
