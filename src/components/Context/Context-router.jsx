import React, { Component, lazy, Suspense} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Load from '../Load/Load'

const Resume = lazy(() => import('./Resume'))
const FirstResume = lazy(() => import('./Resume/FristResumeModule/FirstModule'))

export default class Header extends Component {
    render() {
        return (
            <div id="context" className="context">
                <div className="context-center" >
                    <Route path="/index">
                        index
                    </Route>
                    <Route path="/group">
                        group
                    </Route>
                    <Route path="/article">
                        article
                    </Route>
                    <Suspense fallback={<Load />} >    
                        <Route path="/resume" exact={true} component={Resume} />
                    </Suspense>
                    <Suspense fallback={<Load />} >    
                        <Route path="/resume/module1" component={FirstResume} />
                    </Suspense>
                    <Redirect to='/' />
                </div>
            </div>
        )
    }
}
