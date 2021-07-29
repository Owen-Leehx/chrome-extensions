import { TODO_LIST_DATA } from 'config/constant'
import { State } from 'contentScripts/todolist/interface'
import { getTodoList } from 'contentScripts/todolist/store'
const color = '#3aa757'
const TODO_LIST_ID = (id: number) => `todoId_${id}`

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key !== TODO_LIST_DATA) continue

    oldValue
      ?.filter((item: State) => item.eventTime)
      .forEach((item: State) => {
        chrome.alarms.clear(TODO_LIST_ID(item.id))
      })

    newValue
      ?.filter((item: State) => item.eventTime && item.eventTime > Date.now())
      .forEach((item: State) => {
        const { id, eventTime } = item
        chrome.alarms.create(TODO_LIST_ID(id), {
          when: eventTime,
        })
      })
  }
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const list = await getTodoList()
  list?.forEach((item) => {
    const { id, content } = item
    if (TODO_LIST_ID(id) !== alarm.name) return
    chrome.notifications.create(TODO_LIST_ID(id), {
      type: 'basic',
      title: `你有一个待办事项开始啦`,
      message: content,
      iconUrl: '/assets/todo.png',
      priority: 2,
    })
  })
})
