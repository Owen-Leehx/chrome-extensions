import React from 'react'
import { State } from '../interface'
import { StyTodoListItem } from '../style'
import { CheckboxItem, RemoveItem } from '../controls'

interface Props {
  data: State
}

export const TodoItem = ({ data }: Props) => {
  const { content, createTime, updateTime, isDone } = data
  return (
    <StyTodoListItem>
      <div className="item-header">
        <span className="time">{createTime}</span>
        <CheckboxItem data={data} />
        <RemoveItem data={data} />
      </div>
      <p className="content">{content}</p>
      <div className="item-footer">
        <span className="time">{updateTime}</span>
      </div>
    </StyTodoListItem>
  )
}
