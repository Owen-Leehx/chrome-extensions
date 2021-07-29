import React, { CSSProperties } from 'react'
import { State } from '../interface'
import { StyTodoListItem } from '../style'
import { CheckboxItem, RemoveItem } from '../controls'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import moment from 'moment'
import { format } from 'config/constant'

interface Props {
  data: State
}

export const TodoItem = ({ data }: Props) => {
  const { id, content, createTime, eventTime } = data
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(id) })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as CSSProperties

  const _createTime = moment(createTime).format(format)
  const _eventTime = eventTime ? moment(eventTime).format(format) : '--'
  // const _updateTime = moment(updateTime).format(format)

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StyTodoListItem>
        <div className="item-header">
          <span className="time">活动时间：{_eventTime}</span>
          <RemoveItem data={data} />
        </div>
        <div className="item-content">
          <CheckboxItem data={data} />
          <div>
            <p className="content">{content}</p>
          </div>
        </div>
        <div className="item-footer">
          <span className="time">创建时间：{_createTime}</span>
        </div>
      </StyTodoListItem>
    </div>
  )
}
