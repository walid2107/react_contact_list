	import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Button, Navbar, Form} from 'react-bootstrap'
import ContactList from "../components/ContactList";
import ModifyContact from "../components/ModifyContact"
import AddContact from "../components/AddContact";
import "../App.css"

const AppRouter = () => (
               
  <Router>
      <div className="app-menu">
    <Navbar bg="dark" variant="dark justify-content-between"><h1>Contact App</h1>
    <Form inline>
        <Link to={'/contacts'}><Button variant="secondary">Contact List</Button></Link>
        <Link to={'/add_contact'}><Button variant="outline-success">Add  Contact</Button></Link>
        </Form>
        </Navbar>
        </div>
    <Switch>
      <Route path="/contacts" render={()=> <ContactList />} />
      <Route path="/add_contact" render={() => <AddContact />} />
 <Route path="/modify_contact/:id" exact component={(props) =><ModifyContact id={props.match.params.id} />} />
    </Switch>
  </Router> 
);

export default AppRouter;