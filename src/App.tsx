import React from 'react'
import locale from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { GlobalStyle } from './style'
import { TodoListSystem } from './contentScripts'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const App = () => {
  return (
    <ConfigProvider locale={locale} componentSize="middle">
      <GlobalStyle />
      <TodoListSystem />
    </ConfigProvider>
  )
}

export default App
