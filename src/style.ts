import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    /*整个滚动条*/
    ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: transparent;
  }

  /*定义滚动条轨道*/
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /*定义滑块*/
  ::-webkit-scrollbar-thumb {
    background-color: #ebe8e8;
    border-radius: 4px;
  }
  ul,li{
    list-style: none;
  }
  p{
    margin: 0;
  }
`
