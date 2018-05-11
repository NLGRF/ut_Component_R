import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Row, Col } from 'antd'

class MessageBox extends React.Component {
  state = { text: '' }
  onClickButton = () => {
    this.props.createChatData({ message: this.state.text, owner: 'Anonymous (ไม่บอกชื่อ)' })
    this.setState(() => ({ text: '' }))
  }

  handleTextbox = (e) => {
    const { value } = e.target
    console.log('current val:', value)
    this.setState(() => ({ text: value }))
  }
  render() {
    return (
      <Row>
        <Col span={23}>
          <Input
            type="text"
            id="map-name-input"
            value={this.state.text}
            onChange={e => this.handleTextbox(e)}
          />
        </Col>
        <Col span={1} >
          <Button onClick={this.onClickButton} disabled={this.state.text === ''} >SEND</Button>
        </Col>
      </Row>
    )
  }
}

export default MessageBox

MessageBox.propTypes = {
  createChatData: PropTypes.func.isRequired,
}
