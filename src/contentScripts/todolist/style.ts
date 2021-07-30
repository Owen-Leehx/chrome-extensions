import styled from 'styled-components'

export const StyTodoListWrap = styled.div`
  padding: 6px;
  width: 320px;
  height: 580px;
  font-size: 14px;
  color: #111;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.24));
`
export const StyTodoListBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 4px 12px;
  background-color: #000;
  &:before {
    content: '';
    background: linear-gradient(
      130deg,
      #ff7a18,
      #af002d 41.07%,
      #319197 76.05%
    );
    position: absolute;
    top: -6px;
    bottom: -6px;
    left: -6px;
    right: -6px;
    width: calc(100% + 12px);
    height: calc(100% + 12px);
    z-index: -1;
  }
`

export const StyTodoList = styled.ol`
  position: relative;
  padding: 0 8px 0 0;
  margin: 0 -8px 0 0;
  height: calc(100% - 150px);
  overflow-y: auto;
`

export const StyTodoListItem = styled.li`
  margin-bottom: 12px;
  padding: 8px;
  background-color: #eaeaea;
  box-shadow: 0px 4px 8px 0px rgba(85, 102, 117, 0.14);
  border-radius: 2px;
  .item-header {
    display: flex;
    justify-content: space-between;
  }
  .time {
    font-size: 12px;
    color: #999;
  }
  .item-content {
    display: flex;
    padding: 8px 0;
    .content {
      padding: 0 8px;
    }
  }

  .item-footer {
    display: flex;
    justify-content: flex-end;
  }
`
export const StyAddItemBtn = styled.button`
  position: relative;
  margin: 0 12px;
  padding: 4px 12px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  border-radius: 12px;
  border: none;
  outline: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`

export const StyAddItemWrap = styled.div`
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
