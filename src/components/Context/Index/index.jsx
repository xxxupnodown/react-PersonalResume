import React, { Fragment } from 'react'
import axios from 'axios'
import './index.css'

const CONST = require('../../../constant/constant')  // 常量定义图片数量

axios.defaults.baseURL = 'http://localhost:3000/'

export default function Index() {

    const imgLoop = React.useRef(null)
    let [state, setState] = React.useState({   // hooks State
        num: 1
    })

    React.useEffect(() => {
        const loopInterval = setInterval(() => {
            const {num} = state
            imgLoop.current.style = 'transform: translateX(-'+ num * 830 +'px)'
            if (num === CONST.imgNum) {
                setState({num: 0})
            } else {
                setState({num: num + 1})
            }
        }, 4000)

        return () => {
            clearInterval(loopInterval)
        }
    })

    return (
        <Fragment>
            <div className="imgLoop">
                <div className="imgLeft"><svg viewBox='0 0 1024 1024' version="1.1" width="1000" height= '700'><path fill="#ffffff" d="M57.983070440395636,114.11572950442951 L0.7051218151034391,17.115698888358423 L38.427171590291664,17.115698888358423 L95.70512021557579,114.11572950442951 L38.427171590291664,211.11568202743723 L0.7051218151034391,211.11568202743723 L57.983070440395636,114.11572950442951 z" id="svg_3" stroke-dasharray="none" transform="rotate(179.92308044433594 48.20513916015625,114.11569213867186) "></path></svg></div>
                <div className="imgRight"><svg viewBox='0 0 1024 1024' version="1.1" width="1000" height= '700'><path fill="#ffffff" d="M57.983070440395636,114.11572950442951 L0.7051218151034391,17.115698888358423 L38.427171590291664,17.115698888358423 L95.70512021557579,114.11572950442951 L38.427171590291664,211.11568202743723 L0.7051218151034391,211.11568202743723 L57.983070440395636,114.11572950442951 z" id="svg_3" stroke-dasharray="none" transform="rotate(0.2416711002588272 48.20512008667106,114.1156845092768) "></path></svg></div>
                <div ref={imgLoop} className="imgContainer">
                    {
                        CONST.render.map(v => {
                            return(
                                <img src={"http://localhost:3000/imgloop/" + v} alt="imgloop" />
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

