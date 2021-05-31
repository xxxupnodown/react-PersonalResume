import React, { Component, lazy, Suspense} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Load from '../Load/Load'

const Resume = lazy(() => import('./Resume/Resume'))

export default class Header extends Component {
    render() {
        return (
            <div id="context" className="context">
                <div className="context-center" >
                    <Switch>
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
                            <Route path="/resume" component={Resume} />
                        </Suspense>
                        <Redirect to='/resume' />
                    </Switch>
                </div>
            </div>
        )
    }
}
