import React, { Component } from 'react'
import { Card, Button, Alert} from 'react-bootstrap'
import axios from "axios"
import { Link } from "react-router-dom";
class ContactList extends Component {
        state = {
            contacts : [],
            show: false
        }

        componentDidMount(){
            axios.get('/contacts')
            .then(res => this.setState({contacts: res.data}))
            .catch(err=> console.log(err)
            )
        }

        handleDelete = (value) =>{
            this.setState({
                contacts: this.state.contacts.filter(el => el._id !== value)
            })
              axios.delete(`/delete_contact/${value}`).then(res=>{
                console.log(res.data)
              })}

    render() {
        return (
            <div className="app-header">
        <h1>This is the Contact page</h1>
        <Alert show={this.state.contacts.length!==0 ? this.state.show :true} variant='primary'>There is no data available</Alert>
        <div className="contact-container">
        {this.state.contacts.map((el, i)=>(
            <div className="contact-frame" key={i}>
            <Card style={{ width: '18rem' }} bg='info'>
            <Card.Body>
        <Card.Title>Contact {i+1}</Card.Title>
              <Card.Text>Contact Name : <strong>{el.name}</strong></Card.Text>
              <Card.Text>Contact Phone : <strong>{el.phone}</strong></Card.Text>
              <Card.Text>Contact Email : <strong>{el.email}</strong></Card.Text>
              <Link to={`/modify_contact/${el._id}`}><Button variant="primary">Modifier</Button></Link>
              <Button onClick={()=>{this.handleDelete(el._id)}} variant="danger">Supprimer</Button>
            </Card.Body>
          </Card>
          </div>
        ))}
        </div>
            </div>
        )
    }
}

export default ContactList
