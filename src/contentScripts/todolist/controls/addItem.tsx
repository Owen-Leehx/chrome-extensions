import React, { useState, useContext } from 'react'
import { Input, DatePicker } from 'antd'
import { TodoListContext } from '../index'
import { ActionType } from '../interface'
import { StyAddItemBtn, StyAddItemWrap } from '../style'

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
    setValue('')
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode !== 13) return
    submit()
  }
  const onChange = (e: any) => {
    console.log('🚀 ~ file: addItem.tsx ~ line 28 ~ handleChange ~ e', e)
  }
  const onOk = (value: any) => {
    console.log('🚀 ~ file: addItem.tsx ~ line 28 ~ handleChange ~ e', value)
  }

  return (
    <StyAddItemWrap>
      <Input
        placeholder="请输入待办事项"
        allowClear
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <DatePicker
        placeholder="选择开始时间"
        showTime
        onChange={onChange}
        onOk={onOk}
      />
      <StyAddItemBtn onClick={submit}>添加</StyAddItemBtn>
    </StyAddItemWrap>
  )
}
