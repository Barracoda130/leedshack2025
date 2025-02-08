import React, { Component } from 'react';
import axiosAuth from '../api/axios-auth';

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            text: 'Hello'
        };
    }

    handleCreate = () => {
        axiosAuth.get('/demo/home');
    };

    handleGet = () => {
        axiosAuth.get('/demo/home');
    };

    render() {
        return (
            <div>
                <button onClick={this.handleCreate}>Create</button>
                <button onClick={this.handleGet}>Get</button>
                <p>Data: {this.state.text}</p>
            </div>
        );
    }
}
export default Demo;