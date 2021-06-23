import React, { Component, lazy, Suspense} from 'react'
import {Route, Redirect, Switch, Router} from 'react-router-dom'
import Load from '../Load/Load'

const Resume = lazy(() => import('./Resume'))
const Index = lazy(() => import('./Index'))
const FirstResume = lazy(() => import('./Resume/FristResumeModule/FirstModule'))
const Login = lazy(() => import ('./Login/Login'));
const Personal = lazy(() => import ('./Personal/Personal'));
const Massge = lazy(() => import ('./Massge/Massge'))

export default class Header extends Component {
    render() {
        return (
            <div id="context" className="context">
                <div className="context-center" >
                    
                <Suspense fallback={<Load />} >    
                    <Switch>
                        <Route path="/index" component={Index} />
                        <Route path="/group">
                            group
                        </Route>
                        <Route path="/article" component={Massge} />
                        <Route path="/resume/module1" component={FirstResume} />
                        <Route path="/resume" exact={true} component={Resume} />
                        <Route path="/login" component={Login} />  
                        <Route path="/personal" component={Personal} />

                        <Redirect to='/index' />
                    </Switch>
                </Suspense>
                </div>
            </div>
        )
    }
}
