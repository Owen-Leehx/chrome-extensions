let color = '#3aa757'
enum MenusId {
  TEST_UPLOAD='test-upload'
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
  console.log('Default background color set to %cgreen', `color: ${color}`)

  chrome.contextMenus.create({
    id:MenusId.TEST_UPLOAD,
    title:MenusId.TEST_UPLOAD,
    contexts:['all']
  })
})

chrome.contextMenus.onClicked.addListener((info,tab)=>{
  switch(info.menuItemId){
    case MenusId.TEST_UPLOAD:
      console.log(info)
      break;
    default:
      break
  }
})

const download =()=>{

}
