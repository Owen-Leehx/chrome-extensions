import React, { useContext, useState } from 'react'
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { TodoListContext } from '../index'
import { ActionType } from '../interface'
import { FilterItem } from '../controls'

interface Props {
  list: State[]
}
interface SortIndex {
  oldIndex: number
  newIndex: number
}

export const TodoList = ({ list }: Props) => {
  const { dispatch } = useContext(TodoListContext)
  const [filterList, setFilter] = useState<State[]>([])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const sortList = list.map((item) => item.id + '')
  const onSortEnd = ({ oldIndex, newIndex }: SortIndex) => {
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
    <>
      <FilterItem value={list} onChange={setFilter} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortList}
          strategy={verticalListSortingStrategy}
        >
          <StyTodoList>
            {filterList.map((item: State) => (
              <TodoItem key={item.id} data={item} />
            ))}
          </StyTodoList>
        </SortableContext>
      </DndContext>
    </>
  )
}
