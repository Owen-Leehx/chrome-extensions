import { message } from 'antd'

let color = '#3aa757'
enum MenusId {
  TEST_UPLOAD = 'test-upload'
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
  console.log('Default background color set to %cgreen', `color: ${color}`)

  chrome.contextMenus.create({
    id: MenusId.TEST_UPLOAD
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case MenusId.TEST_UPLOAD:
      console.log(info)
      message.success(info.srcUrl)
      break;
    default:
      break
  }
})

const download = () => {

}


// chrome.fileBrowserHandler.onExecute.addListener(function(id, details) {
//   if (id == 'upload') {
//     var fileEntries = details.entries;
//     for (var i = 0, entry; entry = fileEntries[i]; ++i) {
//       entry.file(function(file:File) {
//         console.log("🚀 ~ file: index.ts ~ line 40 ~ entry.file ~ file", file)
//         // send file somewhere
//       });
//     }
//   }
// });