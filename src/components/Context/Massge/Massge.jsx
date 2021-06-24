import React from 'react'

import { Layout, Menu, Row, Col } from 'antd'
import { SolutionOutlined , CommentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import axios from 'axios'
import './Massge.css'

const { Content, Sider } = Layout;

export default function Massge() {

    const icnoChat = React.useRef(null)
    const icnoFriend = React.useRef(null)

    React.useEffect(() => {
        icnoChat.current.className += ' active'

        axios({
            method: 'get',
            url: 'http://localhost:3000/personal/chat',
            withCredentials: true
        }).then(data => {
            if (data.data.err) window.location.href = 'http://localhost:81/login/dl'
            else if (data.data.sqlErr) alert('q网络不好稍后访问！')
            console.log(data)
        }).catch(err => {
            console.log(err)
        })

        return () => {

        }
    })

    const chatClick = () => {
        if (icnoChat.current.className.indexOf('active') !== -1) return
        icnoChat.current.className += ' active'
        icnoFriend.current.className = icnoFriend.current.className.replace(/ active/g, '')
    }

    const friendClick = () => {
        if (icnoFriend.current.className.indexOf('active') !== -1) return
        icnoFriend.current.className += ' active'
        icnoChat.current.className = icnoFriend.current.className.replace(/ active/g, '')
    }

    return (
        <Layout className="wechat">
            <Sider
            style={{
                overflow: 'auto',
                maxHeight: '600px',
                overflow: 'auto',
                borderRadius: '10px 0 0 10px',
                minHeight: '600px',
            }}
            >
            <div style={{height: '40px', marginTop: '10px', marginBottom: '10px', width: '100%', textAlign: 'center', lineHeight: '40px'}}>
                <input type="text" style={{
                    border: '0',
                    outline: 'none',
                    width: '150px',
                    height: '35px',
                    borderRadius: '15px',
                    backgroundColor: '#ffffff32',
                    padding: '0 10px 0 10px',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '15px',
                }} />
            </div> 
            <Row>
                <Col onClick={chatClick} ref={icnoChat} style={{color: 'white', textAlign: 'center'}} span={12}><CommentOutlined /></Col>
                <Col onClick={friendClick} ref={icnoFriend} style={{color: 'white', textAlign: 'center'}} span={12}><SolutionOutlined /></Col>
            </Row>
            <Menu theme="dark" mode="inline" >  {/*defaultSelectedKeys={['1']}*/}
                <Menu.Item key="1" className="layout_user" icon={<img className="chat_haeder" src="./aijianli.jpg" alt="test" />}>
                nav 1
                </Menu.Item>
                <Menu.Item key="2" className="layout_user" >
                nav 2
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="site-layout">
            <Content style={{ padding: '20px', overflow: 'initial' , maxHeight: '600px', overflow: 'auto', backgroundColor: '#12121212', borderRadius: '0 20px 20px 0'}}>
                内容
            </Content>
            </Layout>
        </Layout>
    )
}