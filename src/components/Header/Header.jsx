import React, { Component} from 'react'
import {NavLink, Link} from 'react-router-dom'

export default class Content extends Component {

    state = {
        login: false
    }

    componentDidMount() {
        // 移开登录按钮动画
        if (!this.state.login) {
            this.loginBt.onmouseleave = () => {
                this.loginBt.style = "animation: btBlur 0.3s"
                setTimeout(() => {this.loginBt.style = ""}, 300)
            }
        }
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
                        <li>
                            {
                                login ? <div className="login-space"><a>name</a></div> : 
                                <Link to="/login"><div className="login-space"><button ref={(v) => {this.loginBt = v}}>注册登录</button></div></Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
