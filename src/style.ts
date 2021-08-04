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
    background: linear-gradient(
      130deg,
      #ff7a18,
      #af002d 41.07%,
      #319197 76.05%
    );
    border-radius: 4px;
  }
  html,body{
    height: 100%;
    padding: 0;
    margin: 0;
  }
  ul,li{
    list-style: none;
  }
  p{
    margin: 0;
  }
`
