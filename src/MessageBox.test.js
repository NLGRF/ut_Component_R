import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'
import { Input, Button } from 'antd'

import MessageBox from './MessageBox'

describe('<MessageBox /> component', () => {
  const props = {
    createChatData: jest.fn()
  }
  it('[Rule 1] should render Messagebox correctly', () => {
    const wrapper = shallow(<MessageBox {...props} />)
    expect(wrapper.find(Input)).toHaveLength(1)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.state('text')).toBe('')
  })

  it('[Rule 3] simulate onChange textbox', () => {
    const wrapper = shallow(<MessageBox {...props} />)
    
    /* ทำการ mock handleTextbox ตัวจริงซะ เพราะเราไม่ได้อยากให้มันรันจริงๆ  
     * เราแค่อยากรู้ว่ามันรัน 1 ครั้งจริงๆมั้ย ถ้าเรา change Input
     * ใน jest.fn() จะสามารถถามมันได้ว่า คุณรัน 1 ครั้งมั้ย  โดยที่ไม่ต้องไปรันจริง (jest.fn() จะมาทำหน้่าที่แทนฟังก์ชั่นจริง)
     */
    wrapper.instance().handleTextbox = jest.fn()
    wrapper.find(Input).simulate('change')

    //ถาม jest.fn() ที่เรา set ให้มันเมื่อกี๊ว่า ถูกรัน 1 ครั้งจริงๆมั้ย
    //การจะใช้ toHaveBeenCalledTimes() ได้ ตัวใน expect ต้องเป็น jest.fn() เท่านั้นนะครับ อันนี้เป็นข้อควรระวัง
    expect(wrapper.instance().handleTextbox).toHaveBeenCalledTimes(1)

    //ทำการเคลียร์ค่าทุกอย่างที่ฟังก์ชั่น mock ทำไว้ เช่น ค่าที่นับว่าเข้าฟังก์ชั่นนี้กี่รอบ หรืออะไรประมาณนี้ (เผื่อ testcase อื่นมีใช้ตัวแปรนี้อีกนะครับ)
    wrapper.instance().handleTextbox.mockClear()
    
  })

  it('[Rule 3] simulate onClick Button', () => {
    const wrapper = shallow(<MessageBox {...props} />)    
    wrapper.instance().onClickButton = jest.fn()
    wrapper.find(Button).simulate('click')
    expect(wrapper.instance().onClickButton).toHaveBeenCalledTimes(1)

    wrapper.instance().onClickButton.mockClear()
  })

  it('[Rule 4] Unit test OnClickButtonFunction', () => {
    const wrapper = shallow(<MessageBox {...props} />)
    // การทำ unit test มีได้หลายท่ามาก ถ้าเป็น function ที่ return ค่าและเราเขียนเองทั้งหมด ก็สามารถ expect ค่าได้เลยตรงๆ
    // แต่ถ้ามี function ที่ใช้จากคนอื่น  เราจะไม่ expect ตรงๆ เราจะต้อง mock function ที่ต่อออกไปที่อื่นด้วย 
    // (เพราะถ้า test fail ขึ้นมา การที่เรา mock ฟังก์ชั่นคนอื่นแล้ว จะเป็นการการันตีว่า test ผิดที่เราจริงๆ ไม่ใช่ผิดมาจากคนอื่น)

    // ถ้าเป็น unit test ฟังก์ชั่นที่ไม่มีการ return ค่า เช่นอันนี้ เราก็จะไล่ถามมันว่า  มันทำฟังก์ชั่นนี้ กี่ครั้งๆ ตามที่เราต้องการมั้ย ดังตัวอย่าง
    const text = 'this is my test text state'
    wrapper.setState({ text })

    wrapper.instance().onClickButton() // สั่งรันฟังก์ชั่นจริงๆ
    expect(props.createChatData).toHaveBeenCalledTimes(1) // ตัวนี้ โดน mock แล้ว ดังนั้นใช้ toHaveBeenCalledTimes ได้
    expect(props.createChatData.mock.calls[0][0]).toEqual({ message: text, owner: 'Anonymous (ไม่บอกชื่อ)' }) // อันนี้ไว้ดู parameter ที่ส่งเข้า createChatData
    expect(wrapper.state('text')).toBe('')

    props.createChatData.mockClear()
  })

  it('[Rule 4] Unittest handleTextbox', () => {
    const wrapper = shallow(<MessageBox {...props} />)
    const value = 'testtest'
    const e = {target: { value }}    
    wrapper.instance().handleTextbox(e)

    expect(wrapper.state('text')).toBe(value)
  })
})