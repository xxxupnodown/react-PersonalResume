import React from 'react'

import { Layout, Menu } from 'antd'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import 'antd/dist/antd.css'

import axios from 'axios'
import './Massge.css'

const { Content, Sider } = Layout;

export default function Massge() {
    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/personal/userlist',
            withCredentials: true
        }).then(data => {
            if (data.data.err) window.location.href = 'http://localhost:81/login/dl'
            else if (data.data.sqlErr) alert('q网络不好稍后访问！')
        }).catch(err => {
            console.log(err)
        })
    })

    return (
        <Layout classNane="wechat">
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1" className="layout_user" icon={<img className="chat_haeder" src="./aijianli.jpg" alt="test" />}>
                nav 1
                </Menu.Item>
                <Menu.Item key="2" className="layout_user"  icon={<VideoCameraOutlined />}>
                nav 2
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="site-layout">
            <Content style={{ margin: '0 16px 0', overflow: 'initial' , maxHeight: '600px', overflow: 'auto'}}>
                内容
            </Content>
            </Layout>
        </Layout>
    )
}