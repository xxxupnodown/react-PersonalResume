import React, { Component, Fragment} from 'react'
import {BrowserRouter} from 'react-router-dom'
import Header from './components/Header/Header'
import Context from './components/Context/Context-router'

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Header />
                    <Context />
                </BrowserRouter>
            </Fragment>
        )
    }
}
