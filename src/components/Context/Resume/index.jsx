import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default class Resume extends Component {
    render() {
        return (
            <div className="resumeModuleContainer">
                <ul>
                    <li>
                        <Link style={{textDecoration: 'none'}} to="/resume/module1">
                            <div className="resumeModDrop">
                                <img alt="showMod" src="resumePic/resumeModule1.png" />
                                <div className="resumeModMirror"></div>
                                <div className="resumeModFloor"></div>
                            </div>
                            <p>简约模板</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: 'none'}} to="/resume/module1">
                            <div className="resumeModDrop">
                                <img alt="showMod" src="resumePic/resumeModule1.png" />
                                <div className="resumeModMirror"></div>
                                <div className="resumeModFloor"></div>
                            </div>
                            <p>简约模板</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: 'none'}} to="/resume/module1">
                            <div className="resumeModDrop">
                                <img alt="showMod" src="resumePic/resumeModule1.png" />
                                <div className="resumeModMirror"></div>
                                <div className="resumeModFloor"></div>
                            </div>
                            <p>简约模板</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: 'none'}} to="/resume/module1">
                            <div className="resumeModDrop">
                                <img alt="showMod" src="resumePic/resumeModule1.png" />
                                <div className="resumeModMirror"></div>
                                <div className="resumeModFloor"></div>
                            </div>
                            <p>简约模板</p>
                        </Link>
                    </li>
                    <li>
                        <Link style={{textDecoration: 'none'}} to="/resume/module1">
                            <div className="resumeModDrop">
                                <img alt="showMod" src="resumePic/resumeModule1.png" />
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

