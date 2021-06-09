import {React, Fragment, useRef} from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'
import axios from 'axios'
import './Login.css'

export default function Login() {
    return (
        <Fragment>
            <div className="loginDrop">
                <div className="login">
                    <div className="login-nav">
                        <div><NavLink replace={true} activeClassName="activeLogin" to="/login/dl">登录</NavLink></div>
                        <div><NavLink replace={true} activeClassName="activeLogin" to="/login/zc">注册</NavLink></div>
                    </div>
                    <Switch>
                        <Route path="/login/dl" component={Dl} />
                        <Route path="/login/zc" component={Zc} />
                        <Redirect to='/login/dl' />
                    </Switch>
                </div>
            </div>
        </Fragment>
    )
}

function Dl() {

    const showIco = useRef(null)
    const hiddenIco = useRef(null)
    const pass = useRef(null)
    const user = useRef(null)
    const err = useRef(null)


    document.onselectstart= () => false  // 屏蔽双击选中

    const showPassword = () => {
        showIco.current.className = 'hidden'
        hiddenIco.current.className = hiddenIco.current.className.replace(/hidden/g, '')
        pass.current.type = 'text'
    }

    const hiddenPassword = () => {
        hiddenIco.current.className = 'hidden'
        showIco.current.className = showIco.current.className.replace(/hidden/g, '')
        pass.current.type = 'password'
    }

    const checkUser = (e) => {
        const username = e.target.value
        if (!username) {
            e.target.className = e.target.className.replace(/inputerr/g, '')
            err.current.className = 'hidden'
            return 
        }
        const check = new RegExp(/^[0-9a-zA-Z]{6,16}$/)
        if (!check.test(username)) {
            e.target.className += ' inputerr'
            err.current.innerHTML = '用户名必须6-16数字或英文！'
            err.current.className = ''
        }
        else {
            e.target.className = e.target.className.replace(/inputerr/g, '')
            err.current.className = 'hidden'
        }
    }

    const submit = async () => {
        const username = user.current.value
        const password = pass.current.value
        // 发送axios请求

        const url = window.location.host.toString() // localhost

        const result = await axios({
            method: 'POST',
            url: 'http://' + url + ':3000/login',
            withCredentials: true,
            data: {
                un: username,
                ps: password
            }
        })
        if (result.data.err) {
            err.current.innerHTML = '密码或用户名错误！'
            err.current.className = ''
            pass.current.className += ' inputerr'
        } else if (result.data.data === 'success') {
            // const history = new createBrowserHistory()
            // history.go(-1)
            window.location.href = window.location.host + '/index'
        } else if (result.data.data === 'nouser') {
            user.current.className += ' inputerr'
            err.current.innerHTML = '没有用户！'
            err.current.className = ''
        }
    }

    return (
        <div className="loginForm">
            <div onClick={showPassword} ref={showIco}>
                <svg className="showPassword" t="1622902283727" viewBox="0 0 2048 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3061" width="25" height="25">
                    <path d="M1023.842462 39.384615c371.160615 0 707.347692 157.538462 1008.246153 472.615385-300.898462 315.076923-637.085538 472.615385-1008.246153 472.615385-371.239385 0-707.347692-157.538462-1008.246154-472.615385 300.898462-315.076923 637.006769-472.615385 1008.246154-472.615385z m0 182.744616a289.870769 289.870769 0 1 0 0 579.741538 289.870769 289.870769 0 0 0 0-579.741538z m0 63.015384c29.932308 0 58.446769 5.828923 84.519384 16.384a52.302769 52.302769 0 1 0 81.289846 55.926154 226.855385 226.855385 0 1 1-165.888-72.231384z" fill="#3586FF" p-id="3062"></path>
                </svg>
            </div>
            <div onClick={hiddenPassword} className="hidden" ref={hiddenIco}>
                <svg className="hiddenPassword" t="1622902246586" viewBox="0 0 1724 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2912" width="25" height="25">
                    <path d="M443.014737 0l914.593684 914.593684-76.207158 76.261053-914.593684-914.593684L442.906947 0z m-35.786105 192.835368l220.860631 220.968421a247.861895 247.861895 0 0 0 315.769263 315.769264l145.946948 145.893052c-74.105263 16.114526-149.935158 24.144842-227.597474 24.144842-317.493895 0-604.968421-134.736842-862.315789-404.210526 128.269474-134.305684 264.084211-235.196632 407.336421-302.565053z m454.979368-101.645473c317.44 0 604.914526 134.736842 862.315789 404.210526-128.323368 134.359579-264.084211 235.196632-407.390315 302.565053l-220.860632-220.914527a247.861895 247.861895 0 0 0-315.769263-315.769263l-145.946947-145.893052c74.051368-16.114526 149.935158-24.198737 227.651368-24.198737z m-190.248421 366.376421l228.082526 228.136421a193.967158 193.967158 0 0 1-228.136421-228.136421z m190.248421-156.133053c25.546105 0 49.906526 4.958316 72.218947 13.958737a44.732632 44.732632 0 1 0 69.632 47.750737 193.212632 193.212632 0 0 1 48.397474 170.145684l-228.190316-228.136421c12.288-2.425263 24.953263-3.718737 37.941895-3.718737z" fill="#3586FF" p-id="2913"></path>
                </svg>
            </div>
            <input onBlur={checkUser} className="login-input" ref={user} placeholder="请输入用户名" type="text"></input>
            <input className="login-input" ref={pass} placeholder="请输入密码" type="password"></input>
            <ul>
                <li>忘记密码?</li>
            </ul>
            <input onClick={submit} className="login-submit" type="button" value="登         录" />
            <p className='hidden' ref={err}></p>
        </div>
    )
}

function Zc() {

    const err = new useRef(null)
    const pass = new useRef(null)
    const user = new useRef(null)
    const repass = new useRef(null)

    const checkUser = (e) => {
        const username = e.target.value

        if (!username) {  // 为空隐藏提示
            e.target.className = e.target.className.replace(/inputerr/g, '')
            err.current.className = 'hidden'
            return 
        }

        const check = new RegExp(/^[0-9a-zA-Z]{6,16}$/)
        if (!check.test(username)) {
            e.target.className += ' inputerr'
            err.current.innerHTML = '用户名必须6-16数字或英文！'
            err.current.className = ''
        }
        else {
            e.target.className = e.target.className.replace(/inputerr/g, '')
            err.current.className = 'hidden'
        }
    }

    const checkPass = (e) => {
        const password = e.target.value

        if (pass.current.value !== password) {
            e.target.className += ' inputerr'
            err.current.innerHTML = '两次密码不一致！'
            err.current.className = ''
        }

        if (!password) {  // 为空隐藏提示
            e.target.className = e.target.className.replace(/ inputerr/g, '')
            err.current.className = 'hidden'
            return
        }

        const check = new RegExp(/^.*(?=.{6,16})(?=.*\d)(?=.*[a-z]).*$/)
        if (!check.test(password)) {
            e.target.className += ' inputerr'
            err.current.innerHTML = '密码必须是6-16位数字+英文！'
            err.current.className = ''
        }
        else {
            e.target.className = e.target.className.replace(/ inputerr/g, '')
            err.current.className = 'hidden'
        }
    }

    let timer
    const checkRePass = (e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const password = e.target.value

            if (!password) {  // 为空隐藏提示
                e.target.className = e.target.className.replace(/ inputerr/g, '')
                err.current.className = 'hidden'
                return
            }

            if (pass.current.value !== password) {
                e.target.className += ' inputerr'
                err.current.innerHTML = '两次密码不一致！'
                err.current.className = ''
                return 
            } else {
                e.target.className = e.target.className.replace(/ inputerr/g, '')
                err.current.className = 'hidden'
            }
        }, 500)
    }

    const submit = async () => {
        clearTimeout(timer)
        const username = user.current.value
        const password = pass.current.value
        const repassword = repass.current.value

        // 登录校验
        if (password !== repassword) {
            repass.current.className += ' inputerr'
            err.current.innerHTML = '两次密码不一致！'
            err.current.className = ''
            return 
        }
        if (user.current.className.indexOf('inputerr') !== -1 || pass.current.className.indexOf('inputerr') !== -1) {
            return
        }

        // 发送axios请求
        const url = window.location.host.toString() // localhost
        const result = await axios({
            method: 'POST',
            url: 'http://' + url + ':3000/registration',
            withCredentials: true,
            data: {
                un: username,
                ps: password
            }
        })
        if (result.data.err) {
            err.current.innerHTML = '用户名已存在！'
            err.current.className = ''
            user.current.className += ' inputerr'
            return 
        } else if (result.data.data === 'success') {
            window.location.href = window.location.host + '/index'
        }
    }

    return (
        <div className="loginForm">
            <input ref={user} onBlur={checkUser} className="login-input" type="text" placeholder="请输入用户名"></input>
            <input ref={pass} onBlur={checkPass} className="login-input" placeholder="请输入密码" type="password"></input>
            <input ref={repass} onChange={checkRePass} onBlur={checkPass} className="login-input" placeholder="确认密码" type="password"></input>
            <input onClick={submit} className="login-submit" type="button" value="注         册" />
            <p className='hidden' ref={err}></p>
        </div>
    )
}