import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import ContactActions from '../actions/MyActions';
import MyStore from '../stores/MyStore.js';


export default class AddContact extends Flux.View {
    constructor(){
        super();
        
        this.state = {
            full_name: '',
            address: '',
            phone: '',
            email: '',
            id: '',
            edit : false,
        };
        this.bindStore(MyStore, () => {
            console.log('the bind works!');
            
            this.props.history.push('/contacts');
        });
    }
    
    componentDidMount(){
        const contacts = MyStore.getContacts();
        if (this.props.match.params.user_id){
            this.setState({
                edit: true
            });
        }
        contacts.forEach((item) => {
            if(item.id == this.props.match.params.user_id){
                this.setState({
                    full_name: item.full_name,
                    phone: item.phone,
                    email: item.email,
                    address: item.address,
                    id: item.id
                });
            }
        });
    }
    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="text-center mt-5">{this.state.edit ? "Edit contact" : "Add a contact"}</h1>
                    <form>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" placeholder="Full Name" onChange={(e) => this.setState({ full_name: e.target.value})} value={this.state.full_name} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input readOnly={this.state.edit ? "readonly" : ""} type="email" className="form-control" placeholder="Enter email"  onChange={(e) => this.setState({ email: e.target.value})} value={this.state.email}/>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="phone" className="form-control" placeholder="Enter phone"  onChange={(e) => this.setState({ phone: e.target.value})} value={this.state.phone}/>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="Enter address"  onChange={(e) => this.setState({ address: e.target.value})} value={this.state.address}/>
                        </div>
                        <button onClick={() => {
                                let updatedContact = {
                                    full_name: this.state.full_name,
                                    phone: this.state.phone,
                                    email: this.state.email,
                                    address: this.state.address,
                                    id: this.state.id
                                };
                        
                            if ( this.state.full_name != "" && this.state.phone != "" && this.state.email  != "" && this.state.address != ""){
                                
                                if(this.state.edit) ContactActions.editContact(updatedContact); 
                                else ContactActions.addContact(updatedContact);
                                
                            }
                                
                            
                            }
                        }
                            type="button" className="btn btn-primary form-control">save</button>
                        <Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
                    </form>
                </div>
            </div>
        );
    }
}