import { TODO_LIST_DATA } from '../contentScripts/todolist/store'
import { State } from '../contentScripts/todolist/interface'
let color = '#3aa757'
enum MenusId {
  TEST_UPLOAD = 'test-upload',
}
const TODO_LIST_ID = 'todoListId'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
  // window.addEventListener('storage', () => {

  //   const data = getTodoList()
  //   console.log(data)

  // })
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key !== TODO_LIST_DATA) continue

    const list = newValue?.filter(
      (newItem: State) =>
        !oldValue?.some((oldItem: State) => oldItem.id === newItem.id)
    )
    list.forEach((item: State) => {
      const { id, content } = item
      chrome.notifications.create(
        `todoId_${id}`,
        {
          type: 'basic',
          title: 'todo',
          message: content,
          iconUrl: '/assets/todo.png',
          eventTime: Date.now() + 3000,
          priority: 2,
        },
        () => {
          console.log(item)
        }
      )
    })

    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was=`,
      oldValue,
      `new value is=`,
      newValue
    )
  }
})
