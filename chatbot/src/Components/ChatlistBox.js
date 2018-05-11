import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ChatList from './ChatList'

const ChatListBoxWrapper = styled.div`
  width: 100%;
  height: 700px;
  background-color: ${props => props.bgcolor};
`

class ChatlistBox extends React.Component {
  getDataComponent = (aData) => {
    const { nightmode } = this.props
    const { boxColor } = this.getColor(nightmode)


    return <ChatList key={aData.id} owner={aData.owner} text={aData.message} color={boxColor} />
  }
  getColor = (nightmode) => {
    const dayColor = { boxColor: '#CCDBCC', bgColor: '#EFEFE8' }
    const nightColor = { boxColor: '#325594', bgColor: '#2D3442' }
    return nightmode ? nightColor : dayColor
  }

  render() {
    const { data, nightmode } = this.props
    const { bgColor } = this.getColor(nightmode)
    return (
      <ChatListBoxWrapper bgcolor={bgColor}>
        {
          data.map(this.getDataComponent).slice(-5)
        }
      </ChatListBoxWrapper>
    )
  }
}

export default ChatlistBox
ChatlistBox.propTypes = {
  data: PropTypes.array.isRequired,
  nightmode: PropTypes.bool.isRequired,
}
