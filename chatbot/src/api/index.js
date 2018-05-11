import axios from 'axios'

// const serviceUrl = 'http://128.199.209.28:3035'
const serviceUrl = 'http://localhost:3035'

export const getChatData = () => axios.get(`${serviceUrl}/chats`)

export const postChatData = obj => axios.post(`${serviceUrl}/chats`, obj)

