import React, { Component, Fragment} from 'react'
import MsgDetail from './MsgDetail'
import './MsgContext.css'

export default class MsgTitle extends Component {

    componentDidMount() {

    }

    render() {
        const {title} = this.props
        return (
            <Fragment>
                <div className="msgTitle">
                    <span ref={(v) => this.title = v} suppressContentEditableWarning  contentEditable="true">{title}</span>
                </div>
                <MsgDetail />
            </Fragment>
        )
    }
}
