import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import axios from 'axios';

class ModifyContact extends Component {
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

      handleUpdate=(value)=>{
        if(!this.state.name || !this.state.phone || !this.state.email){
            this.setState({
                show : !this.state.show
            })
        }
        else{
        let newContact = {name: this.state.name, phone: this.state.phone, email: this.state.email}
        axios.put(`/modify_contact/${value}`, newContact)
        .then(res => {
            console.log(res.data);
          })
          .catch(err=> console.log(err)
            )
            this.setState({
                redirect: true
            })}
      }
      componentDidMount(){
            axios.get(`/contact/${this.props.id}`).then(res => 
                 this.setState({
                name : res.data.name,
                phone: res.data.phone,
                email: res.data.email
            })
            )
        }

    render() {
        return (
            <div>
                <h1>Modify Contact Page</h1>
                <form className="contact-form">
                <Alert show={this.state.show} variant='warning'>please complete all required fields</Alert>
                    <label>Contact Name</label>
                    <input value={this.state.name} type="text" name="name" onChange={this.handleChange}/>
                    <label>Contact Telephone</label>
                    <input value={this.state.phone} type="number" name="phone" onChange={this.handleChange}/>
                    <label>Contact Email</label>
                    <input value={this.state.email} type="text" name="email" onChange={this.handleChange}/>
                <div><Button variant='primary' onClick={()=>this.handleUpdate(this.props.id)}>Modify Contact</Button></div>
                </form>
                {this.state.redirect ? <Redirect to="/contacts" /> : null}
            </div>
        )
    }
}
export default ModifyContact