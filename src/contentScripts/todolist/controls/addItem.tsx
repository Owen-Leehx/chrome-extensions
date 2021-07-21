import React, { useState, useContext } from 'react'
import { Input } from 'antd'
import { TodoListContext } from '../index'
import { ActionType } from '../interface'
import { StyAddItemBtn } from '../style'

export const AddItem = () => {
  const { dispatch } = useContext(TodoListContext)
  const [value, setValue] = useState<string>('')
  const handleChange = (e: any) => {
    setValue(e.target.value)
  }
  const submit = () => {
    dispatch({
      type: ActionType.ADD,
      content: value,
    })
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode !== 13) return
    submit()
  }

  return (
    <div>
      <Input
        placeholder="请输入待办事项"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <StyAddItemBtn onClick={submit}>添加</StyAddItemBtn>
    </div>
  )
}
