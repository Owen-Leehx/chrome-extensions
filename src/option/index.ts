import { debounce } from 'lodash'

export const test = debounce((test) => {
  console.log(test)
})
