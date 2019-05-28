import React, { Component } from 'react';

import { Redirect } from 'react-router';

class Success extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        }
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 style={{ marginLeft: "20%", color: "green" }}>Successfully Save details</h1>

                </div>
                <div className="row">
                    <button type="button" style={{ marginLeft: "45%" }}
                        className="btn btn-info btn-lg"
                        onClick={this.setRedirect.bind(this)}
                    >
                        go back</button>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }


}
export default Success;
