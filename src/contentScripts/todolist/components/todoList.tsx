import React, { useContext } from 'react'
import { State } from '../interface'
import { StyTodoList } from '../style'
import { TodoItem } from './todoItem'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { TodoListContext } from '../index'
import { ActionType } from '../interface'

interface Props {
  list: State[]
}

export const TodoList = ({ list }: Props) => {
  const { dispatch } = useContext(TodoListContext)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const sortList = list.map((item) => item.id + '')
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    dispatch({
      type: ActionType.SORT,
      sortInfo: { from: oldIndex, to: newIndex },
    })
  }
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over?.id || active.id === over.id) return
    const oldIndex = sortList.indexOf(active.id)
    const newIndex = sortList.indexOf(over.id)
    onSortEnd({ oldIndex, newIndex })
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortList} strategy={verticalListSortingStrategy}>
        <StyTodoList>
          {list.map((item: State) => (
            <TodoItem key={item.id} data={item} />
          ))}
        </StyTodoList>
      </SortableContext>
    </DndContext>
  )
}
