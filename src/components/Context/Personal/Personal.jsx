import React, {Fragment} from 'react'
import axios from 'axios'
import './Personal.css'

axios.defaults.baseURL = 'http://localhost:3000/personal'

export default function Personal() {

    const headerPic = React.useRef(null)
    const nickname = React.useRef(null)
    const signature = React.useRef(null)
    const man = React.useRef(null)
    const woman = React.useRef(null)
    const uploadImg = React.useRef(null)
    const loading = React.useRef(null)
    
    React.useEffect(() => {
        axios({  //Didmount 时 验证登录信息 获取 昵称 签名 图片等..
            method: 'post',
            url: "",
            withCredentials: true
        }).then(result => {
            if (result.data.err) {
                window.location.href = 'http://localhost:81/login'
            } else {
                headerPic.current.src = 'data:image/jpeg;base64,' + result.data.data.headerPic
                nickname.current.innerHTML = result.data.data.name
                signature.current.value = result.data.data.personalDetail || '这个人很赖什么都没留下！'
                if (result.data.data.sex === "1") {
                    man.current.checked = true
                } else if (result.data.data.sex === 2) {
                    woman.current.checked = true
                }
            }
        })
    })

    const upload = (formData) => { // 传图片 到接口
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: '/upload',
                withCredentials: true,
                data: formData,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const submit = async () => {  // 提交修改的个人信息
        let nick = nickname.current.innerHTML  // 获取昵称
        let sign = signature.current.value  // 获取签名
        if (sign === '这个人很赖什么都没留下！') {
            sign = null  // 如果内容没有改变 则换成null
        }
        let sex;
        if (man.current.checked) sex = 1  // 判断 sex  赋值位 1 or 2
        else sex = 2

        loading.current.className = "loading" // 显示Loading

        try {
            let formData = new FormData()
            if (typeof uploadImg.current.files[0] == 'object') { // 判断有没有插入图片
                formData.append('file', uploadImg.current.files[0])
            } // 两个 promise 异步执行
            formData.append('nickname', nick)
            formData.append('signature', sign)
            formData.append('sex', sex)
            const result = await upload(formData)
            
            if (result.data.err) { // 验证登录信息失败
                window.location.href = 'http://localhost:81/login'
            } else if (result.data.sqlErr) { // 插入数据库失败
                alert('修改失败！')
            }
        } catch (err) {
            alert('修改失败')
        }

        loading.current.className = "loading hidden" // 隐藏 loading
    }

    const changeImg = (e) => {
        const file = e.target.files[0] 
        // const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase(); // 读取文件后缀
        const reader = new FileReader() // 创建 fileReader 转成base64 方便img标签显示
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            const base64String=e.target.result; // 转成base64 字符串 展示图片
            headerPic.current.src = base64String
        }
    }

    return (
        <Fragment>
            <div className="personalDetail">
                <img className="personalImg" alt="header" ref={headerPic} />
                <label className="personalImgUpload">
                    <input onChange={changeImg} ref={uploadImg} hidden type='file' accept='image/*' />
                </label>
                <div className="personalRight">
                    <span className="personal-nick">昵称：<span ref={nickname} suppressContentEditableWarning  contentEditable="true"></span></span>
                    <p>性别： 
                        <b>男</b><input defaultChecked={true} ref={man} name="sex" type="radio" value='1'/>
                        <b>女</b><input ref={woman} name="sex" type="radio" value='2'/>
                    </p>
                    <p>签名：
                        <textarea ref={signature}>
                        </textarea>
                    </p>
                    <button onClick={submit} style={{float: 'right'}}>保存</button>
                </div>
            </div>
            <div ref={loading} className="loading hidden">
                <h1 class="loadingtext">
                    <span>L</span>
                    <span>o</span>
                    <span>a</span>
                    <span>d</span>
                    <span>i</span>
                    <span>n</span>
                    <span>g</span>
                </h1>
            </div>
        </Fragment>
    )
}
