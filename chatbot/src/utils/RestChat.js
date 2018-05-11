import { getChatData, postChatData } from '../api'

export async function refreshChatbox() {
  const response = await getChatData()
  return response.data
}

export async function donePostChatbox(obj) {
  const response = await postChatData(obj)
  return response.status
}
