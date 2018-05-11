import React from 'react'
import { Avatar } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ChatWrapper = styled.div`
  padding-left: 24px;
  margin-top: 40px;
  .chat-info {
    padding: 16px;
  }
  .chat-owner {
    padding-left: 16px;
    vertical-align: bottom;
    color: #888888;
  }
  .chat-text {
    margin-left: 16px;
    padding: 8px;
    border-radius: 12px;
    background-color: ${props => props.color};
    font-size: 20px;
    
  }

`

const ChatList = ({ owner, text, color }) => (
  <ChatWrapper color={color}>
    <div className="chat-info">
      <Avatar className="avartar" icon="user" /><span className="chat-owner">{owner}</span>
    </div>
    <span className="chat-text">{text}</span>
  </ChatWrapper>
)

export default ChatList

ChatList.propTypes = {
  owner: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}
