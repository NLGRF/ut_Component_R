import React from 'react'
import { Row, Col, Switch } from 'antd'
import 'antd/dist/antd.css'
import ChatlistBox from './ChatlistBox'
import MessageBox from './MessageBox'
import { refreshChatbox, donePostChatbox } from '../utils/RestChat'

class ChatApp extends React.Component {
  state= { data: null, checkStatus: false }

  async componentWillMount() {
    this.fetchData()
  }

  handleDisabledChange = (change) => {
    this.setState(() => ({ checkStatus: change }))
  }

  fetchData = async () => {
    const data = await refreshChatbox()
    this.setState(() => ({ data }))
  }

  postData = async (obj) => {
    const status = await donePostChatbox(obj)
    this.fetchData()
    console.log(status)
  }

  render() {
    const { data, checkStatus } = this.state
    return (
      <Row>
        <Col offset={1} span={22}>
          {
            data ?
              <div>
                <Switch checked={checkStatus} onChange={e => this.handleDisabledChange(e)} />
                <span>Toggle Style</span>
                <ChatlistBox data={data} nightmode={checkStatus} />
                <MessageBox createChatData={this.postData} />
              </div>
          :
          null
        }

        </Col>
      </Row>
    )
  }
}

export default ChatApp
