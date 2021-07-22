import React from 'react'
import locale from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { GlobalStyle } from './style'
import { TodoListSystem } from './contentScripts'

const App = () => {
  return (
    <ConfigProvider locale={locale} componentSize="middle">
      <GlobalStyle />
      <TodoListSystem />
    </ConfigProvider>
  )
}

export default App
