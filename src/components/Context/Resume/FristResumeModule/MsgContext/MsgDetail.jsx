import React, { Component ,Fragment } from 'react'

export default class MsgDetailContainer extends Component {
    render() {
        return (
            <div className="msgContext">
                <MsgDetail />
            </div>
        )
    }
}

class MsgDetail extends Component {
    
    state = {
        content: [
            {
                spanId: 20043,
                titleId: 44699,
                title: true,
                ul: false
            }
        ]
    }

    delTitle = (index, key) => {
        return () => {
            const {content} = this.state
            if (content.length === 1) {
                content[index].title = false
                this.setState({})
            } else {
                for (let i = 0; i < content.length; i++) {
                    if (content[i].titleId*1 === key*1) {
                        content.splice(i, 1)
                        this.setState({
                            content: [
                                ...content
                            ]
                        })
                        break
                    }
                }
            }
        }
    }

    addTitle = () => {
        const {content} = this.state
        this.setState({
            content: [
                ...content,
                {
                    spanId: content[content.length - 1].spanId + 1,
                    titleId: content[content.length - 1].titleId + 1,
                    title: true,
                    ul: false
                }
            ]
        })
    }

    render() {
        const renderB = this.state.content.map((v, index) => {
            if (v.title === true && v.ul === true) {
                return (
                    <Fragment key={index}>
                        <MsgDetailTitle key={v.titleId} index={index} keyIndex={v.titleId} addTitle={this.addTitle} delTitle={this.delTitle}/>
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
            } else if (v.title === true && v.ul === false) {
                return (
                    <Fragment key={index}>
                        <MsgDetailTitle key={v.titleId}  index={index} keyIndex={v.titleId} addTitle={this.addTitle} delTitle={this.delTitle}/>
                        <span key={this.state.spanId} suppressContentEditableWarning  contentEditable="true" className="msgContext-detail"></span>
                    </Fragment>
                )
            } else if (v.ul=== true && v.title === false) {
                return (
                    <Fragment key={index}>
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
            } else {
                return (
                    <span key={v.spanId} suppressContentEditableWarning  contentEditable="true" className="msgContext-detail"></span>
                )
            }
        })
        return(
            <Fragment>
                {
                    renderB
                }
            </Fragment>
        )
    }
}

class MsgDetailTitle extends Component {

    showDelBt = () => {
        this.delBt.className = this.delBt.className.replace(/hidden/g, "")
        this.addBt.className = this.addBt.className.replace(/hidden/g, "")
    }

    hiddenBt = () => {
        this.delBt.className += "hidden"
        this.addBt.className += "hidden"
    }

    render() {
        return (
            <div className="msgContext-title" onMouseEnter={this.showDelBt} onMouseLeave={this.hiddenBt}>
                <span suppressContentEditableWarning  contentEditable="true">2021 ~ 2022</span>
                <span suppressContentEditableWarning  contentEditable="true">清华大学</span>
                <span suppressContentEditableWarning  contentEditable="true">保卫专业本科</span>
                <div ref={v => {this.optionsBt = v}} className="msgTitle-option">
                    <button className="optionAdd hidden" onClick={this.props.addTitle} ref={(v) => {this.addBt = v}}> + 添加</button>
                    <button className="optionDel hidden" onClick={this.props.delTitle(this.props.index, this.props.keyIndex)} ref={(v) => {this.delBt = v}}> - 删除</button>
                </div>
            </div>
        )
    }
}