import React, { Component, Fragment} from 'react'
import MsgDetail from './MsgDetail'
import './MsgContext.css'

export default class MsgTitle extends Component {

    componentDidMount() {
        this.showOptions()
        this.hiddenOptions()
    }

    showOptions = () => {
        this.module.onmouseenter = () => {
            // console.log(this.optionAdd.className)
            this.optionsBt.className = this.optionsBt.className.replace("hidden", "")
        }
    }

    hiddenOptions = () => {
        this.module.onmouseleave = () => {
            // console.log(this.optionAdd.className)
            this.optionsBt.className += "hidden"
        }
    }

    render() {
        const {title} = this.props
        return (
            <Fragment>
                <div className="msgTitle" ref={(v) => {this.module = v}}>
                    <span suppressContentEditableWarning  contentEditable="true">{title}</span>
                    <div ref={v => {this.optionsBt = v}} className="msgTitle-option hidden">
                        <button className="optionAdd" onClick={this.props.addMsg}> + 添加</button>
                        <button className="optionDel" onClick={this.props.delMsg(this.props.index)}> - 删除</button>
                    </div>
                </div>
                <MsgDetail />
            </Fragment>
        )
    }
}
