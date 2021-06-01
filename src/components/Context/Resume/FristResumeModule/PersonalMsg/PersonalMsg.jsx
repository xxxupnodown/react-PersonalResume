import React, { Component } from 'react'
import './PersonalMsg.css'

export default class PersonalMsg extends Component {

    showPic = (e) => {
        if (!window.FileReader) return
        const fr = new FileReader();
        const file = e.target.files;
        fr.onload = (() => {
            return (e) => {
                this.myPhoto.style = 'background-color: #ffffff00'
                this.picContainer.src = e.target.result
                this.picContainer.className = "";
            }
        })()
        if (file[0]) {
            fr.readAsDataURL(file[0]);
        }
    }

    render() {
        return (
            <div className="personalMsg">
                <label className="myPhoto" ref={(v) => {this.myPhoto = v}} >
                    <img className = "hidden" alt="personalPic" ref={(v) => {this.picContainer = v}} />
                    <input hidden type="file" onChange={this.showPic} accept="image/*" />
                </label>
                <span className="personName" suppressContentEditableWarning  contentEditable="true">张三</span><br />
                <span suppressContentEditableWarning  contentEditable="true">求职意向：xxxxxxxx</span><br />
                <span style={{paddingLeft: '0'}} className="personDetails" suppressContentEditableWarning  contentEditable="true">年龄</span>
                <span className="personDetails" suppressContentEditableWarning  contentEditable="true">男</span>
                <span style={{paddingLeft: '5px'}} suppressContentEditableWarning  contentEditable="true">北京市朝阳区</span><br />
                <span style={{paddingLeft: '0'}} className="personDetails" suppressContentEditableWarning  contentEditable="true">137xxxxxxxx</span>
                <span style={{paddingLeft: '5px'}} suppressContentEditableWarning  contentEditable="true">xxxxxxxx@qq.com</span>
            </div>
        )
    }
}
