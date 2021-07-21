import styled from 'styled-components'

export const StyTodoListWrap = styled.div`
  padding: 16px 24px;
  width: 360px;
  height: 600px;
  border-radius: 8px;
  background-color: #fff;
  font-size: 14px;
  color: #111;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.24));
`

export const StyTodoList = styled.ol`
  padding: 0;
  margin: 0;
  height: calc(100% - 100px);
  overflow-y: auto;
`

export const StyTodoListItem = styled.li`
  margin: 12px 0;
  padding: 8px;
  border-bottom: 1px solid #999;
  .item-header {
    display: flex;
    justify-content: space-between;
  }
  .time {
    font-size: 12px;
    color: #999;
  }
  .content {
    padding: 8px;
  }
  .item-footer {
    display: flex;
    justify-content: flex-end;
  }
`
export const StyAddItemBtn = styled.button`
  position: relative;
  margin: 12px 0;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  border-radius: 12px;
  border: none;
  outline: none;
  background-color: #000;
  color: #fff;
  &:before {
    content: '';
    background: linear-gradient(
      130deg,
      #ff7a18,
      #af002d 41.07%,
      #319197 76.05%
    );
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    z-index: -1;
    border-radius: 12px;
  }
`
