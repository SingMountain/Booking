export const useGlobalStore = defineStore('global', () => {
  const studentID=ref('S231231095')
  const URL=ref('http://113.250.189.122:8090/api/wechat')

  return {studentID,URL}
})

export const useBookStore = defineStore('Book', () => {
  const bookMeetingRoom=reactive({})
  
  return {bookMeetingRoom}
})
