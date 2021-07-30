import React, { useState, useContext } from 'react'
import { Input, Button, Space } from 'antd'
import { TodoListContext } from '../index'
import { ActionType } from '../interface'
import { StyAddItemWrap } from '../style'
import moment from 'moment'
import { format } from 'config/constant'

export const AddItem = () => {
  const defaultDateValue = moment(Date.now()).format(format)
  const { dispatch } = useContext(TodoListContext)
  const [value, setValue] = useState<string>('')
  const [date, setDate] = useState<string>(defaultDateValue)

  const submit = () => {
    dispatch({
      type: ActionType.ADD,
      content: value,
      eventTime: date ? moment(date).valueOf() : 0,
    })
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode !== 13) return
    submit()
  }

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const onChange = (e: any) => {
    setDate(e.target.value)
  }

  return (
    <StyAddItemWrap>
      <Space style={{ flex: 1 }} direction="vertical">
        <Input
          placeholder="待办事项"
          allowClear
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Input
          placeholder={`活动${format}`}
          defaultValue={defaultDateValue}
          allowClear
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      </Space>
      <Button type="link" onClick={submit}>
        添加
      </Button>
    </StyAddItemWrap>
  )
}
