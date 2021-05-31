import React, { Component ,Fragment } from 'react'

export default class MsgDetail extends Component {
    render() {
        return (
            <div className="msgContext">
                {/* <MsgDetailTitle /> */}
                <MsgDetailMissTitle />
            </div>
        )
    }
}

class MsgDetailTitle extends Component {
    render() {
        return(
            <Fragment>
                <div className="msgContext-title">
                    <span suppressContentEditableWarning  contentEditable="true">2021 ~ 2022</span>
                    <span suppressContentEditableWarning  contentEditable="true">清华大学</span>
                    <span suppressContentEditableWarning  contentEditable="true">保卫专业本科</span>
                </div>
                <ul className="msgContext-title-msgDetail">
                    <li>
                        <span suppressContentEditableWarning  contentEditable="true">GPA：X.X/4.0（专业前X%或者专业排名前10）</span>
                    </li>
                    <li>
                        <span suppressContentEditableWarning  contentEditable="true">荣誉/奖项：XX奖学金</span>
                    </li>
                    <li>
                        <span suppressContentEditableWarning  contentEditable="true">主修课程：尽量填写和求职意向相关的主修课程（多数情况可以不写）</span>
                    </li>
                </ul>
            </Fragment>
        )
    }
}

class MsgDetailMissTitle extends Component {
    render() {
        return (
            <span suppressContentEditableWarning  contentEditable="true" className="msgContext-detail"></span>
        )
    }
}