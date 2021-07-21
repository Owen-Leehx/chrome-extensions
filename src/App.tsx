import React from 'react'
import locale from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { GlobalStyle } from './style'
import { TodoList } from './contentScripts'

const App = () => {
  return (
    <ConfigProvider locale={locale} componentSize="middle">
      <GlobalStyle />
      <TodoList />
    </ConfigProvider>
  )
}

export default App
