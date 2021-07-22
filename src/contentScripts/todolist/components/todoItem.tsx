import React, { CSSProperties } from 'react'
import { State } from '../interface'
import { StyTodoListItem } from '../style'
import { CheckboxItem, RemoveItem } from '../controls'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  data: State
}

export const TodoItem = ({ data }: Props) => {
  const { id, content, createTime, updateTime } = data
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(id) })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as CSSProperties
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StyTodoListItem>
        <div className="item-header">
          <span className="time">{createTime}</span>
          <RemoveItem data={data} />
        </div>
        <div className="item-content">
          <CheckboxItem data={data} />
          <p className="content">{content}</p>
        </div>
        <div className="item-footer">
          <span className="time">{updateTime}</span>
        </div>
      </StyTodoListItem>
    </div>
  )
}
