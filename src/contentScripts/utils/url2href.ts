export const url2href = (url: string) => {
  const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|\%|&|-)+)/g
  return url.replace(reg, '<a target="_blank" href="$1$2">$1$2</a>')
}
