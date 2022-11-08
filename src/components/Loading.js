import React, { Component } from 'react'
import loading from "../assets/loading.gif"
export class Loading extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loading} alt="loading..." />
            </div>
        )
    }
}

export default Loading
