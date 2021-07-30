import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { TabKey, State } from 'contentScripts/todolist/interface'

interface Props {
  value: State[]
  onChange: (list: State[]) => void
}

const filter = {
  [TabKey.ALL]: (list: State[]) => list,
  [TabKey.ACTIVE]: (list: State[]) => list.filter((item) => !item.isDone),
  [TabKey.DONE]: (list: State[]) => list.filter((item) => item.isDone),
}

const { TabPane } = Tabs

export const FilterItem = ({ value, onChange }: Props) => {
  const [active, setActive] = useState<TabKey>(TabKey.ALL)
  useEffect(() => {
    handleChange(active)
  }, [value])
  const handleChange = (activeKey: string) => {
    const active = activeKey as TabKey
    const list = filter[active](value)
    onChange(list)
    setActive(active)
  }
  return (
    <div>
      <Tabs type="card" size="small" activeKey={active} onChange={handleChange}>
        <TabPane tab="全部" key={TabKey.ALL} />
        <TabPane tab="进行中" key={TabKey.ACTIVE} />
        <TabPane tab="已完成" key={TabKey.DONE} />
      </Tabs>
    </div>
  )
}
