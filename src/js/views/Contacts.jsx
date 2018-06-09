import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";

import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import avatar1 from '../../img/user_1.jpg';
import ContactActions from '../actions/MyActions';
import MyStore from '../stores/MyStore.js';
import MyActions from '../actions/MyActions.js';


export default class Contacts extends Flux.View {
    constructor(){
        super();
        this.state = {
            showModal: false,
            contacts: []
        };
    }

    componentDidMount(){
        this.setState({
            contacts: MyStore.getContacts()
        });
        this.bindStore(MyStore, ()=>{
            this.setState({
                contacts: MyStore.getContacts()
            });
        });
    }
    
    deleteContact(){
        MyActions.deleteContact(this.state.contactDelete.email);
        this.setState({
           contactDelete: null,
           showModal: false
        });
    }
    
    render() {
            const contactsInHtml = this.state.contacts.map((contact,i) => {
                return <ContactCard
                            key={i} 
                            name={contact.name}
                            phone={contact.phone}
                            email={contact.email}
                            address={contact.address}
                            image={contact.image}
                            id={i}
                            onDelete={(p) => {
                                this.setState({
                                    showModal: true,
                                    contactDelete: contact
                                });
                            }}/>;
                });     
        return(
            <div className="container">
                <div>
                    <p className="text-right my-3">
                        <Link className="btn btn-success" to="/add">Add new contact</Link>
                    </p>
                    <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                        <ul className="list-group pull-down" id="contact-list">
                            {contactsInHtml}
                        </ul>
                    </div>
                </div>
                <Modal show={this.state.showModal} onClose={() => this.setState({showModal: false})} onConfirm={() => this.deleteContact()} onCancel={() => this.setState({showModal: false})} />
            </div>
        );
    }
}
