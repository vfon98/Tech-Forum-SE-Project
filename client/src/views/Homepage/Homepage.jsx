import React, { Component } from 'react'

import NavBar from 'components/NavBar.jsx'
import MainThreads from '../../components/MainThreads'

export class Homepage extends Component {
    render() {
        return (
            <>
                <NavBar
                brand="CS"
                brandHighlight="GG"
                />
                <MainThreads/>
            </>
        )
    }
}

export default Homepage
