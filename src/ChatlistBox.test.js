import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'
import ChatlistBox, { ChatListBoxWrapper } from './ChatlistBox'
import ChatList from './ChatList'


describe('<ChatlistBox /> component', () => {
  
  // declare default props (to pass this props to components)
  const props = {
    data: [
      {
        id: 1,
        owner: 'Moderator',
        message: 'Hello chatbox',
      },
      {
        id: 2,
        owner: 'Moderator',
        message: 'Powered By mnosuk',
      },
      {
        id: 3,
        owner: 'Moderator',
        message: 'ใช้สำหรับสอนการ Test Component จ้า อิอิกำ',
      },
      {
        id: 4,
        owner: 'Mnosuk (สุดหล่อจ้าวเดิม)',
        message: 'จากบ้านนอกสู่เมืองฟ้า เดินมาตามหัวใจ จากมาตามความฝันที่ไฝ่ หวังว่าต้องได้ดี',
      },
      {
        id: 5,
        owner: 'Mnosuk (สุดหล่อจ้าวเดิม)',
        message: 'บ้านวันนี้เหมือนเดิมมั้ย ไม่ได้ไปต้องหลายปี',
      },
      {
        id: 6,
        owner: 'Mnosuk (สุดหล่อจ้าวเดิม)',
        message: 'ห่วงบางคนที่แสนดี',
      },
      {
        id: 7,
        owner: 'Mnosuk (สุดหล่อจ้าวเดิม)',
        message: 'ตอนนี้พ่อทำอัลลัยยย',
      },
    ],
    nightmode: false,
  }

  it('[Rule1] should render correctly if data is more than five and daymode', () => {
    const wrapper = shallow(<ChatlistBox {...props} />)

    // test props data
    expect(wrapper.find(ChatListBoxWrapper)).toHaveLength(1)
    expect(wrapper.find(ChatList)).toHaveLength(5)

    // test props daymode
    expect(wrapper.find(ChatListBoxWrapper).first().prop('bgcolor')).toBe('#EFEFE8')
    expect(wrapper.find(ChatList).first().prop('color')).toBe('#CCDBCC')
  })

  it('[Rule1] should render correctly if data is more than five and nightmode', () => {
    const newProps = { ...props, nightmode: true }
    const wrapper = shallow(<ChatlistBox {...newProps} />)

    // test props data
    expect(wrapper.find(ChatListBoxWrapper)).toHaveLength(1)
    expect(wrapper.find(ChatList)).toHaveLength(5)

    // test props nightmode
    expect(wrapper.find(ChatListBoxWrapper).first().prop('bgcolor')).toBe('#2D3442')
    expect(wrapper.find(ChatList).first().prop('color')).toBe('#325594')
  })

  it('[Rule1] should render correctly if data is less than five', () => {
    const newData = [
      {
        id: 1,
        owner: 'Moderator',
        message: 'Hello chatbox',
      },
      {
        id: 2,
        owner: 'Moderator',
        message: 'Powered By mnosuk',
      },
    ]
    const newProps = { ...props, data: newData }
    const wrapper = shallow(<ChatlistBox {...newProps} />)

    expect(wrapper.find(ChatListBoxWrapper)).toHaveLength(1)
    expect(wrapper.find(ChatList)).toHaveLength(2)
  })

  it('[Rule 4] get day color correctly', () => {
    //shallow().instance() to get real class then call your real method in that class.
    const actualColor = shallow(<ChatlistBox {...props} />).instance().getColor(props.nightmode)
    const expectColor = { boxColor: '#CCDBCC', bgColor: '#EFEFE8' }

    expect(actualColor).toEqual(expectColor)
  })

  it('[Rule 4] get night color correctly', () => {
    const newProps = { ...props, nightmode: true }
    const actualColor = shallow(<ChatlistBox {...newProps} />).instance().getColor(newProps.nightmode)
    const expectColor = { boxColor: '#325594', bgColor: '#2D3442' }

    expect(actualColor).toEqual(expectColor)
  })

  it('[Rule 5] styled background color really set', () => {
    const wrapper = shallow(<ChatListBoxWrapper bgcolor="#AAAAAA" />)
    // you must import 'jest-styled-component' before .toHaveStyleRule
    expect(wrapper).toHaveStyleRule('background-color', '#AAAAAA')
  })

  it('[Rule 5] styled background color really not set', () => {
    const wrapper = shallow(<ChatListBoxWrapper />)
    expect(wrapper).not.toHaveStyleRule('background-color', '#XXXXXX')
  })
})