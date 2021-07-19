import './Massge.css'
import 'antd/dist/antd.css'
import axios from 'axios'
import io from 'socket.io-client'
import React, {Fragment} from 'react'

import { Layout, Menu, Row, Col, Button } from 'antd'
import { SolutionOutlined,
    CommentOutlined,
    SmileOutlined } from '@ant-design/icons';
const { Content, Sider } = Layout;

let socketio
export default function Massge() {

    const parseCookie = (str) => {
        const temp = str.split(";")
        const map = new Map()
        for (let i = 0; i < temp.length; i++) {
            temp[i].trim()
            const key = temp[i].split('=')[0]
            const value = temp[i].split('=')[1]
            map.set(key, value)
        }
        return map
    }

    const map = parseCookie(document.cookie) //获取cookie
    const username = map.get('us') // 截取cookie

    if (!username) window.location.href = 'http://localhost:81/login/dl'

    const icnoChat = React.useRef(null)
    const icnoFriend = React.useRef(null)

    const [user, setUser] = React.useState([])
    const [msg, setMsg] = React.useState([])
    const [chatid, setChatid] = React.useState()
    // React.useEffect(() => {
    //     // icnoChat.current.className += ' active'
    //     // axios({
    //     //     method: 'get',
    //     //     url: 'http://localhost:3000/personal/chat',
    //     //     withCredentials: true
    //     // }).then(data => {
    //     //     if (data.data.err) window.location.href = 'http://localhost:81/login/dl'
    //     //     else if (data.data.sqlErr) alert('q网络不好稍后访问！')
            
    //     //     let result = data.data.data // user_username user_nickname user_header_pic chat_root_id ohter_id owner_id user_id
    //     //     setUser({chat: result})
    
    //     // }).catch(err => {
    //     //     console.log(err)
    //     // })

    //     return () => {
    //         socketio.onclose()
    //     }
    // }, [user])

    const chatClick = () => {
        if (icnoChat.current.className.indexOf('active') !== -1) return
        icnoChat.current.className += ' active'
        icnoFriend.current.className = icnoFriend.current.className.replace(/ active/g, '')

        
        axios({
            method: 'get',
            url: 'http://localhost:3000/personal/chat',
            withCredentials: true
        }).then(data => {
            if (data.data.err) window.location.href = 'http://localhost:81/login/dl'
            else if (data.data.sqlErr) alert('q网络不好稍后访问！')
            
            let result = data.data.data // user_username user_nickname user_header_pic chat_root_id ohter_id owner_id user_id
            setUser({chat: result})
    
        }).catch(err => {
            console.log(err)
        })

    }

    const friendClick = () => {
        if (icnoFriend.current.className.indexOf('active') !== -1) return
        icnoFriend.current.className += ' active'
        icnoChat.current.className = icnoFriend.current.className.replace(/ active/g, '')

        // 请求信息
        axios({
            method: 'get',
            url: 'http://localhost:3000/personal/userlist',
            withCredentials: true
        }).then(data => {
            if (data.data.err) window.location.href = 'http://localhost:81/login/dl'
            else if (data.data.sqlErr) alert('q网络不好稍后访问！')

            const friendArr = data.data   // friend_header_pic 头像  friend_id friend_nickname friend_username my_user_id
            setUser({friend: friendArr})
        }).catch(err => {
            if (err.sqlErr) alert('sqlErr!')
            else alert('q网络不好请稍后再试')
        })
    }

    const getMsgDetail = (e) => {
        const chat_root_id = e.key * 1

        axios({
            method: 'post',
            url: 'http://localhost:3000/personal/chat/getmsg',
            withCredentials: true,
            data: {
                chat_root_id: chat_root_id
            }
        }).then(data => {
            if (data.data.err) window.location.href = 'http://localhost:81/login/dl'
            else if (data.data.sqlErr) alert('q网络不好稍后访问！')
            setMsg(data.data)
            setChatid(chat_root_id)
        })
    }

    return (
        <Layout className="wechat">
            <Sider
            style={{
                overflow: 'auto',
                maxHeight: '600px',
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
            <Menu theme="dark" mode="inline" >
                {
                    user.chat ? user.chat.map((v, index) => {
                        let pictrue = 'http://localhost:3000' + v.user_header_pic.replace(/\\/g, '/').slice(15,) // 更改图片地址为请求地址
                        if (v.user_username === username) return null
                        else return (
                            <Menu.Item onClick={getMsgDetail} key={v.chat_root_id} other_user_id={v.other_user_id} chat_root_id={v.chat_root_id} className="layout_user" icon={<img className="chat_haeder" src={pictrue} alt="user_header_pic" />}>
                                {v.user_nickname}
                            </Menu.Item>
                        )
                    }) : null
                }
                {
                    user.friend ? user.friend.map((v, index) => {
                        let pictrue = 'http://localhost:3000' + v.friend_header_pic.replace(/\\/g, '/').slice(15,) // 更改图片地址为请求地址
                        return (
                            <Menu.Item key={v.friend_id} friend_id={v.friend_id} friend_username={v.friend_username} className="layout_user" icon={<img className="chat_haeder" src={pictrue} alt="user_header_pic" />}>
                                {v.friend_nickname}
                            </Menu.Item>
                        )
                    }) : null
                }
            </Menu>
            </Sider>
            <Layout className="site-layout">
                <ChatMassage myUsername = {username} msg = {msg} chatid = {chatid}/>
            </Layout>
        </Layout>
    )
}


function ChatMassage(props) { // 每个用户聊天内容
    if (!socketio) {
        socketio = io('ws://localhost:3000')
    }
    let [data, setData] = React.useState()

    let {myUsername} = props // 当前用户username
    let msg = props.msg.data // 聊天数据 chat_content chat_userid chat_username state time user_header_pic
    let {chatid} = props

    React.useEffect(() => {
        let tempdata = props.msg.data
        if (tempdata) {
            tempdata = tempdata.sort((temp, v) => {
                return temp.time > v.time ? 1 : -1
            })
        } else return 
        setData(tempdata)
        setTimeout(() => {
            document.querySelector('#msgContent').scrollTo(0, document.querySelector('#msgContent').scrollHeight)
        });
        return () => {
            socketio.onclose()
        }
    }, props.msg.data)

    socketio.on('putMsg', (data) => {
        if (data.data.sqlErr) {
            alert('q网络不好稍后访问！');
            return
        }
        // setData(data.data)
        data = data.data
        data = data.sort((temp, v) => {
            return temp.time > v.time ? 1 : -1
        })
        setData(data)
        document.querySelector('#msgContent').scrollTo(0, document.querySelector('#msgContent').scrollHeight)
    })

    const chatContent = React.useRef(null)

    const submitMsg = () => {  // 提交
        if (typeof(chatid) !== 'number') return
        if (chatContent.current.value === '' || chatContent.current.value === null || chatContent.current.value === undefined) return
        
        socketio.emit('getMsg', {id: chatid, content: chatContent.current.value, username: myUsername})
        console.log(chatid, chatContent.current.value, myUsername)
        chatContent.current.value = ''
    }

    

    const msgHasTime = (v, index, place) => {  // 包含时间信息
        let pictrue = 'http://localhost:3000' + v.user_header_pic.replace(/\\/g, '/').slice(15,) // 更改图片地址为请求地址
        if (place === 'left') {
            return(
                <Fragment>
                    <div key={new Date().getTime()} className = 'centerMsg' >
                        {v.time} 
                    </div>
                    <div key={index} className='contaierMsg'><img className='contaierPic' src = {pictrue} alt='header_pic' />
                        <div className={place + 'Msg f' + place}>
                            {v.chat_content}
                        </div>
                    </div>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <div key={new Date().getTime()} className = 'centerMsg' >
                        {v.time} 
                    </div>
                    <div key={index} className='contaierMsg'>
                        <div className={place + 'Msg f' + place}>
                            {v.chat_content}
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    const msgNotTime = (v, index, place) => { // 不包含时间信息
        let pictrue = 'http://localhost:3000' + v.user_header_pic.replace(/\\/g, '/').slice(15,) // 更改图片地址为请求地址
        if (place === 'left') {
            return(
                <Fragment>
                    <div key={index} className='contaierMsg'><img className='contaierPic' src = {pictrue} alt='header_pic' />
                        <div className={place + 'Msg f' + place}>
                            {v.chat_content}
                        </div>
                    </div>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <div key={index} className='contaierMsg'>
                        <div className={place + 'Msg f' + place}>
                            {v.chat_content}
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    const parseTime = (date) => { // 处理时间
        let vdate = date.split(' ')[0]
        ,vtime = date.split(' ')[1]
        ,vyear = parseInt(vdate.split('-')[0])
        ,vmonth = parseInt(vdate.split('-')[1])
        ,vday = parseInt(vdate.split('-')[2])
        ,vhour = parseInt(vtime.split(':')[0])
        ,vminute = parseInt(vtime.split(':')[1])
        ,vsecond = parseInt(vtime.split(':')[2])
        return [vyear, vmonth, vday, vhour, vminute, vsecond]
    }

    return (
        <Fragment>
            <Content id = 'msgContent' style={{ padding: '0 40px 15px 40px', maxHeight: '430px', overflow: 'auto', backgroundColor: '#12121212', borderRadius: '0 20px 0 0'}}>
                {
                    data ? data.map((v, index) => {
                        let dateArr = parseTime(v.time)
                        if (v.chat_username === myUsername) {
                            if (index === 0) {
                                return msgHasTime(v, index, 'right')   // 时区 相差 8 小时
                            } else {
                                let tempDateArr = parseTime(data[index - 1].time)
                                if (dateArr[0] !== tempDateArr[0]) { // 判断当前信息与上条信息年份是否相同
                                    return msgHasTime(v, index, 'right')
                                } else if (dateArr[1] !== tempDateArr[1]) {
                                    return msgHasTime(v, index, 'right')
                                } else if (dateArr[2] !== tempDateArr[2]) {
                                    return msgHasTime(v, index, 'right')
                                } else if (dateArr[3] !== tempDateArr[3]) {
                                    return msgHasTime(v, index, 'right')
                                } else if (Math.abs(dateArr[4] - tempDateArr[4]) > 5) {
                                    return msgHasTime(v, index, 'right')
                                } else {
                                    return msgNotTime(v, index, 'right')
                                }
                            }
                        } else {
                            if (index === 0) {
                                return msgHasTime(v, index, 'left')   // 时区 相差 8 小时
                            } else {
                                let tempDateArr = parseTime(data[index - 1].time)
                                if (dateArr[0] !== tempDateArr[0]) { // 判断当前信息与上条信息年份是否相同
                                    return msgHasTime(v, index, 'left')
                                } else if (dateArr[1] !== tempDateArr[1]) {
                                    return msgHasTime(v, index, 'left')
                                } else if (dateArr[2] !== tempDateArr[2]) {
                                    return msgHasTime(v, index, 'left')
                                } else if (dateArr[3] !== tempDateArr[3]) {
                                    return msgHasTime(v, index, 'left')
                                } else if (Math.abs(dateArr[4] - tempDateArr[4]) > 8) {
                                    return msgHasTime(v, index, 'left')
                                } else {
                                    return msgNotTime(v, index, 'left')
                                }
                            }
                        }
                    }) : null
                }
            </Content>
            <div style={{backgroundColor: '#11111103', height: '170px', borderRadius: '0 0 20px 0', padding: '10px 30px 10px 30px', position: 'relative'}}>
                <p className='input_title'><SmileOutlined /></p>
                <textarea ref={chatContent} className='inputMsg'></textarea>
                <Button onClick={submitMsg} className='input_submit'>发送</Button>
            </div>
        </Fragment>
    )
}