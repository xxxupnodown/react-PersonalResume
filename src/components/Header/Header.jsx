import React, { Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/' // axios 请求默认url

export default class Content extends Component {

    state = {
        login: false,
        user: ""
    }

    componentDidMount() {
        // 移开登录按钮动画
        this.loginBt.onmouseleave = () => {
            this.loginBt.className += " btBlur"
            setTimeout(() => {this.loginBt.className = this.loginBt.className.replace(/ btBlur/g, '')}, 500)
        }

        
        const map = this.parseCookie(document.cookie) //获取cookie
        const username = map.get('us') // 截取cookie
        if (username) this.setState({login: true, user: username})
        else this.setState({login: false, user: ''})
        this.listenCookie = setInterval(() => {
            const map = this.parseCookie(document.cookie)
            const username = map.get('us')
            if (username) this.setState({login: true, user: username})
            else this.setState({login: false, user: ''})
            // else { // 修改登陆状态 显示退出登录
            //     this.setState({login: false, user: ''})
            //     this.signout.className += ' showSignOut'
            //     setTimeout(() => {
            //         this.signout.className = this.signout.className.replace(/showSignOut/g, '')
            //     }, 1000)
            // }
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.listenCookie)
    }

    parseCookie = (str) => {
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

    userOptions = () => {
        if (this.personal.className.indexOf('showPersonal') === -1) {
            if (this.personal.className.indexOf('hiddenPersonal') !== -1) {
                this.personal.className = this.personal.className.replace(/ hiddenPersonal/g, '')
            }
            this.personal.className += ' showPersonal'
        } else {
            this.personal.className = 'login-space hiddenPersonal'
        }
    }

    hiddenUserOptions = () => {
        if (this.personal.className.indexOf('showPersonal') !== -1) {
            this.personal.className = 'login-space hiddenPersonal'
        }
    }

    logout = async () => {
        const result = await axios({
            method: 'post',
            url: '/logout',
            withCredentials: true
        })
        if (result.data.data === 'logout') {
            this.setState({login: false, user: ''})
            this.signout.className += ' showSignOut'
            setTimeout(() => {
                this.signout.className = this.signout.className.replace(/showSignOut/g, '')
            }, 1000)
        }
    }

    personalCenter = () => {
        axios({
            method: 'post',
            withCredentials: true,
            url: 'personal'
        }).then(data => {
            console.log(data)
        })
    }

    render() {
        const {login} = this.state
        return (
            <div id="header" className="header">
                <div className="header-center" >
                    <ul>
                        <li className="nav-title">
                            <NavLink className="nav-router" to="/index">
                                首页
                            </NavLink>
                        </li>
                        <li className="nav-title">
                            <NavLink className="nav-router" to="/group">
                                部落
                            </NavLink>
                        </li>
                        <li className="nav-title">
                            <NavLink className="nav-router" to="/article">
                                帖子
                            </NavLink>
                        </li>
                        <li className="nav-title">
                            <NavLink className="nav-router" to="/resume">
                                简历制作 
                            </NavLink>
                        </li>
                        <li style={{position: 'relative'}}>
                            <svg className="search-ico" viewBox="0 0 1024 1024" width="20" height="20"><path d="M447.5 773C627.269 773 773 627.269 773 447.5S627.269 122 447.5 122 122 267.731 122 447.5 267.731 773 447.5 773z m323.905-65.235l205.62 205.62c17.573 17.573 17.573 46.066 0 63.64-17.574 17.573-46.067 17.573-63.64 0l-205.62-205.62C636.543 828.707 546.026 863 447.5 863 218.026 863 32 676.974 32 447.5S218.026 32 447.5 32 863 218.026 863 447.5c0 98.526-34.293 189.043-91.595 260.265z" p-id="4641"></path></svg>
                            <input className="search" type="text" />
                        </li>
                        <li style={{position: 'relative'}}>
                            {
                                login ? <div onClick={this.userOptions} tabIndex="0" onBlur={this.hiddenUserOptions} className="login-space">
                                    <a>{this.state.user}</a>
                                    <div ref={(v) => {this.personal = v}} id="personal">
                                        <p onClick = {this.personalCenter}>个人中心</p>
                                        <p>我的简历</p>
                                        <p onClick = {this.logout}>注    销</p>
                                    </div>
                                </div> : 
                                <Link to="/login"><div className="login-space"><button ref={(v) => {this.loginBt = v}}>注册登录</button></div></Link>
                            }
                            <span ref={(v)=> {this.signout = v}} className="signout">
                                已登出
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
