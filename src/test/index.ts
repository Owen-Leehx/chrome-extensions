import { throttle } from 'lodash'

console.log('test --- hhhsss 999-ssss--s', process.env.REACT_APP_ENV)
export const test = throttle((test) => {
  console.log(test)
})
