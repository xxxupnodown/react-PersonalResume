import React, { Fragment } from 'react'
import axios from 'axios'
import './index.css'

const CONST = require('../../../constant/constant')  // 常量定义图片数量

axios.defaults.baseURL = 'http://localhost:3000/'

export default function Index() {

    const imgLoop = React.useRef(null)
    const imgOptions = React.useRef(null)
    let [state, setState] = React.useState({   // hooks State
        num: 1
    })

    React.useEffect(() => {
        const loopInterval = setInterval(() => {
            const {num} = state
            if (num >= CONST.imgNum) {
                setState({num: 1})
                imgLoop.current.style = 'transform: translateX(-'+ 0 * 900 +'px)'
            } else {
                setState({num: num + 1})
                imgLoop.current.style = 'transform: translateX(-'+ num * 900 +'px)'
            }
        }, 4000)

        return () => {
            clearInterval(loopInterval)
        }
    })

    const changePic = (e) => {
        const index = e.target.getAttribute('index')
        imgLoop.current.style = 'transform: translateX(-'+ (index-1) * 900 +'px)'
        setState({num: index*1})
    }

    return (
        <Fragment>
            <div className="imgLoop">
                <ul ref={imgOptions} className="imgOptions">
                    {
                        CONST.render.map(v => {
                            if (v === state.num) return (<li onClick={changePic} key={v} index={v} style={{backgroundColor: 'rgb(219, 219, 219)'}}></li>)
                            else return(<li key={v} index={v} onClick={changePic} ></li>)
                        })
                    }
                </ul>
                <div ref={imgLoop} className="imgContainer">
                    {
                        CONST.render.map(v => {
                            return(
                                <img key={v} src={"http://localhost:3000/imgloop/" + v} alt="imgloop" />
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

