import React, { Component } from 'react';

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            text: 'Hello'
        };
    }

    handleCreate = () => {
        fetch('http://localhost:5000/demo/create', {
            method: 'POST',
            // headers: {
            // 'Content-Type': 'application/json'
            // },
            body: JSON.stringify({ data: 'exampleData' })
        })
        .then(response => response.json())
        .then(data => console.log('Create button clicked', data))
        .catch(error => console.error('Error:', error));
    };

    handleGet = () => {
        fetch('http://localhost:5000/demo/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(message => {
                console.log('Get button clicked', data);
                this.setState({ message });
                this.data.text = message;
            })
            .catch(error => console.error('Error:', error));
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