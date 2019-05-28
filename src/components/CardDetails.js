import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import Spinner from './load.gif';

class CardDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            successAlart: false,
            errorAlart: false,
            redirect: "",
            loading: false,
            form: true,
            fields: {
                name: "",
                cardNumber: "",
                expiry: "",
                securityNumber: ""
            },
            errors: {}
        }
    }

    //validate all details
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
            //check if name is empty
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Card name Cannot be empty";
        }
            //check if name used only letter and space
        else if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
                formIsValid = false;
                errors["name"] = "Card name should be only letters";
            }
        }

        //Card number
            //check only card number allow number
        if (typeof fields["cardNumber"] !== "undefined") {
            if (!fields["cardNumber"].match(/^[0-9\b]+$/)) {
                formIsValid = false;
                errors["cardNumber"] = "Card number should be only number";
            }
        }
            //card number should be 16 numbers
        if (typeof fields["cardNumber"] !== "undefined") {
            if (fields["cardNumber"].length !== 16) {
                formIsValid = false;
                errors["cardNumber"] = "Sorry invalide card number please check again";
            }
        }
            //the card number cannot be empty
        if (!fields["cardNumber"]) {
            formIsValid = false;
            errors["cardNumber"] = "Card number cannot be empty";
        }

        //Expiry date
        if (typeof fields["expiry"] !== "undefined") {
            const str = fields["expiry"];
            const array = str.split('/', 1);
                //expiry date allow with number and "/"
            if (!fields["expiry"].match(/^[0-9\b,/]+$/)) {
                formIsValid = false;
                errors["expiry"] = "Sorry invalide date format please check again";
            }
                //the month cannot greater than 12
            else if (array[0] > 12) {
                formIsValid = false;
                errors["expiry"] = "Sorry invalide month please check again";
            }
        }
                //the expiry date only allow 5 character
        if (typeof fields["expiry"] !== "undefined") {
            if (fields["expiry"].length !== 5) {
                formIsValid = false;
                errors["expiry"] = "Sorry invalide date format please check again";
            }
        }
            //the expiry date canot be empty
        if (!fields["expiry"]) {
            formIsValid = false;
            errors["expiry"] = "Expiry date cannot be empty";
        }

        //code
            //the code allow with number
        if (typeof fields["securityNumber"] !== "undefined") {
            if (!fields["securityNumber"].match(/^[0-9\b]+$/)) {
                formIsValid = false;
                errors["securityNumber"] = "please enter only number";
            }
        }
            //the code cannot be greater than 4 character
        if (typeof fields["securityNumber"] !== "undefined") {
            if (fields["securityNumber"].length > 4) {
                formIsValid = false;
                errors["securityNumber"] = "Sorry invalide code please check again";
            }
        }
            //the code cannot be empty
        if (!fields["securityNumber"]) {
            formIsValid = false;
            errors["securityNumber"] = "sequrity code cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    //if success data with form validation, then to stop the loading and go to the next state
    setRedirect = () => {
        this.setState({
            redirect: "success",
            loading: false
        })
    }
    //if success data with form validation, then to stop the loading and go to the next state
    setRedirectFail = () => {
        this.setState({
            redirect: "fail",
            loading: false
        })
    }

    //redirect to the next page
    renderRedirect = () => {
        if (this.state.redirect === "success") {
            return <Redirect to='/success' />
        }
        if (this.state.redirect === "fail") {
            return <Redirect to='/fail' />
        }
    }

    //when submit
    contactSubmit(e) {
        e.preventDefault();

        //check all validation
        if (this.handleValidation()) {

            //set  alart state
            this.setState({ successAlart: true });
            this.setState({ errorAlart: false });

            //form hide
            this.setState({ form: false });

            //loading load mark
            this.setState({ loading: true });

            //send request to back end
            const fields = this.state.fields;
            axios.post('http://localhost:3001/submit', {
                details: fields,
            })
                .then(res => {
                    console.log(res.data);
                    console.log("Hasith");

                    //redirect another state
                    this.setRedirect();
                })
                .catch(err => {
                     console.log('error');
                     console.log(err);

                    //redirect fail
                    this.setRedirectFail();
                });

        } else {
            this.setState({ errorAlart: true });
        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    render() {
        var form = this.state.form;
        return (
            <div>
                {this.state.successAlart ?
                    <div className="alert alert-dismissible alert-success">
                        <strong>Well done!</strong> verification successfully.
                        </div>
                    : null}

                {this.state.errorAlart ?
                    <div className="alert alert-dismissible alert-danger">
                        <strong>Upload and verification failed!</strong>please try again
                  </div>
                    : null}


                {/* load */}
                {this.state.loading ?
                    <img style={{ zIndex: '100', margin: '35%' }} src={Spinner} alt="spinner" /> : null}

                {form ? <form name="contactform" className="contactform" onSubmit={this.contactSubmit.bind(this)}>
                    <fieldset>
                        <legend>Enter the card information</legend>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label htmlFor="inputName" className="control-label">Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="inputName"
                                        onChange={this.handleChange.bind(this, "name")}
                                        value={this.state.fields["name"]} placeholder="Eg: R B H LAKSHAN"
                                        ref="name" />
                                    <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="control-label">Card Number</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="inputCardNumber"
                                        onChange={this.handleChange.bind(this, "cardNumber")}
                                        value={this.state.fields["cardNumber"]} placeholder="xxxx-xxxx-xxxx-xxxx"
                                        ref="cardNumber" />
                                    <span style={{ color: "red" }}>{this.state.errors["cardNumber"]}</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="control-label">Expiry date</label>
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" id="inputDate"
                                                onChange={this.handleChange.bind(this, "expiry")}
                                                value={this.state.fields["expiry"]} placeholder="MM/YY"
                                                ref="expiry" />
                                            <span style={{ color: "red" }}>{this.state.errors["expiry"]}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label className="control-label">Sequrity Number</label>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control"
                                                            id="inputSecurityNumber" placeholder="XXX"
                                                            onChange={this.handleChange.bind(this, "securityNumber")}
                                                            value={this.state.fields["securityNumber"]}
                                                            ref="securityNumber" />
                                                        <span style={{ color: "red" }}>{this.state.errors["securityNumber"]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </fieldset>
                </form> : null}

                {this.renderRedirect()}
            </div>

        );
    }
}
export default CardDetails;