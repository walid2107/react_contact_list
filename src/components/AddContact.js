import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {Button, Alert} from "react-bootstrap"
import axios from 'axios';

class AddContact extends Component {
    state = {
        grabbedValue: '',
        name: '',
        phone: '',
        email : '',
        redirect: false,
        show: false
    }
    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

      handleSubmit=(e)=>{
        e.preventDefault()
        if(!this.state.name || !this.state.phone || !this.state.email){
       this.setState({
           show : !this.state.show
       })
    }
        else{
            let newMovie = {name: this.state.name, phone: this.state.phone, email: this.state.email}
            axios.post('/add_contact', newMovie)
          .then(res => {
              console.log(res.data);
            })
            .catch(err=> console.log(err)
              )
              this.setState({
                  redirect: true
              })
        }
      }
      
    render() {
        return (
            <div>
                <h1>Add Contact Page</h1>
                <form className="contact-form" onSubmit={this.handleSubmit}>
                <Alert show={this.state.show} variant='warning'>please complete all required fields</Alert>
                    <label>Contact Name :</label>
                    <input placeholder="Add name" type="text" name="name" onChange={this.handleChange}/>
                    <label>Contact Telephone :</label>
                    <input placeholder="Add phone" type="number" name="phone" onChange={this.handleChange}/>
                    <label>Contact Email :</label>
                    <input placeholder="Add email" type="text" name="email" onChange={this.handleChange}/>
                    <Button variant='success' type="submit">Add Contact</Button>
                </form>
                {this.state.redirect ? <Redirect to="/contacts" /> : null}
            </div>
        )
    }
}
export default AddContact