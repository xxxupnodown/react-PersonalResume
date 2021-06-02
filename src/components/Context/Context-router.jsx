import React, { Component, lazy, Suspense} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Load from '../Load/Load'

const Resume = lazy(() => import('./Resume'))
const Index = lazy(() => import('./Index'))
const FirstResume = lazy(() => import('./Resume/FristResumeModule/FirstModule'))

export default class Header extends Component {
    render() {
        return (
            <div id="context" className="context">
                <div className="context-center" >
                    <Suspense fallback={<Load />} >  
                        <Route path="/index" component={Index} />
                    </Suspense>
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
                    <Redirect to='/index' />
                </div>
            </div>
        )
    }
}
