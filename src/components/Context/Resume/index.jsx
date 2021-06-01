import React, { Component, Suspense, lazy } from 'react'
import {Link, Route} from 'react-router-dom'
import Load from '../../Load/Load'
import './index.css'

const FirstResume = lazy(() => import('./FristResumeModule/FirstModule'))
export default class Resume extends Component {
    render() {
        return (
            <div className="resumeModuleContainer">
                <ul>
                    <li>
                        <Link style={{textDecoration: 'none'}} to="/resume/module1">
                            <div className="resumeModDrop">
                                <img src="resumePic/resumeModule1.png" />
                                <div className="resumeModMirror"></div>
                                <div className="resumeModFloor"></div>
                            </div>
                            <p>简约模板</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

