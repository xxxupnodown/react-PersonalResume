import React, { Component } from 'react'
import './PersonalMsg.css'

export default class PersonalMsg extends Component {

    state = {
        
    }

    render() {
        return (
            <div className="personalMsg">
                <div className="myPhoto"></div>
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
