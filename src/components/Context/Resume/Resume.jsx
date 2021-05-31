import React, { Component, Fragment} from 'react'
import PersonalMsg from './PersonalMsg/PersonalMsg'
import MsgContext from './MsgContext/MsgContext'
import './Resume.css'

export default class Resume extends Component {

    state = {
        category: [
            {
                id: 1,
                title: '教育背景'
            },
            {
                id: 2,
                title: '实习经验'
            },
            {
                id: 3,
                title: '专业技能'
            }
        ]
    }

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <div className="resume">
                    <PersonalMsg />
                    {
                        this.state.category.map((v) => {
                            return (
                                <MsgContext key={v.id} index={v.id} title={v.title}/>
                            )
                        })
                    }
                </div>
            </Fragment>
        )
    }
}
