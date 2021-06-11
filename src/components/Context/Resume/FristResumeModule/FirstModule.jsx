import React, { Component, Fragment} from 'react'
import PersonalMsg from './PersonalMsg/PersonalMsg'
import MsgContext from './MsgContext/MsgContext'
import './FirstModule.css'

export default class FirstModule extends Component {

    state = {
        category: [
            {
                id: 1,
                title: '教育背景',
                detailTitle: {
                    year: '2021 ~ 2022',
                    school: '清华大学',
                    major: '保卫本科'
                }
            },
            {
                id: 2,
                title: '实习经验',
                detailTitle: {
                    year: '2021 ~ 2022',
                    school: '清华附属研究有限责任公司',
                    major: 'java'
                }
            },
            {
                id: 3,
                title: '专业技能'
            }
        ]
    }

    componentDidMount() {
        this.exportBt.onclick = () => {
            window.print()
            // let dom = document.querySelector('.resume')
            // let newWindow = window.open()
            // console.log(window.location.href)
            // newWindow.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="'+ window.location.host +'/newWindowCss/module1.css"></head><body>')
            // newWindow.document.write(dom.innerHTML)
            // newWindow.document.write('</body></html>')
            // newWindow.focus()
            // newWindow.print()
            // newWindow.close()
        }
        window.onbeforeprint = () => {
            this.resume.className += ' beforeExport';
        }
        window.onafterprint = () => {
            this.resume.className = this.resume.className.replace(/ beforeExport/g, '')
        }
    }

    addMsg = () => {
        const {category} = this.state
        this.setState({
            category: [
                ...category, {
                    id: category[category.length - 1].id + 1,
                    title: 'xxxxxx'
                }
            ]
        })
    }

    delMsg = (index) => {
        return () => {
            console.log(index)
            const {category} = this.state
            for (let i = 0; i < category.length; i++) {
                if (category[i].id === index) {
                    category.splice(i, 1)
                    break;
                }
            }
            this.setState({category: [...category]})
        }
    }

    render() {
        return (
            <Fragment>
                <div className="resume" ref={(v) => {this.resume = v}}>
                    <PersonalMsg />
                    {
                        this.state.category.map((v) => {
                            return (
                                <MsgContext delMsg={this.delMsg} addMsg={this.addMsg} key={v.id} index={v.id} title={v.title}/>
                            )
                        })
                    }
                </div>
                <div className="controlResume" >
                    <button ref={(v) => {this.exportBt = v}} className="exportResume">导 出</button>
                </div>
            </Fragment>
        )
    }
}
