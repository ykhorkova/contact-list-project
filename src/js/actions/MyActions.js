import Flux from '@4geeksacademy/react-flux-dash';
import MyStore from '../stores/MyStore.js';

class ContactActions extends Flux.Action{
    
    constructor(){
        super();
        this.host = 'https://python-contact-list-ykhorkova.c9users.io';
    }
    
    getContacts(){
        fetch(this.host+'/contact/')
            .then((resp) => {
                return resp.json();
            })
            .then((contacts) => {
                this.dispatch('MyStore.setContacts',contacts);
            }) 
            .catch((error) => {
            console.log("There was an error ", error);
        });
    }
    
    addContact(incomingContact){
        incomingContact.agenda_slug="Yuliia";
        fetch(this.host+'/contact/', {
            method: 'PUT',
            body: JSON.stringify(incomingContact),
            headers:{ 
                'Accept':  'application/json',
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => {
                console.log('Add contact action!');
                    let contacts = MyStore.getContacts();
                    contacts.push(response);
                    this.dispatch('MyStore.setContacts',contacts);
                    console.log('Success:', response);
                    console.log(MyStore.getContacts());
            })
            .catch(error => console.error('Error:', error));
    }
    
    
    deleteContact(id){
        fetch(this.host+'/contact/'+id, {
            method: 'DELETE'
            }).then(res => res.json())
            .then(response => {
                console.log('delete action!', id);
                let contacts = MyStore.getContacts();
                
                let updatedContacts = contacts.filter((element, index) => {
                    return element.id != id;
                });
                this.dispatch('MyStore.setContacts',updatedContacts);
                console.log('Success:', response);
                console.log(MyStore.updatedContacts);
            })
            .catch(error => console.error('Error:', error));
    }
    
     editContact(updatedContact){
        console.log(updatedContact);
        fetch(this.host+'/contact/'+updatedContact.id, {
                method: 'POST',
                body: JSON.stringify(updatedContact),
                headers:{ 
                'Accept':  'application/json',
                'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json();
            })
            .then(response => {
                console.log('edit action!', updatedContact.id);
                let contacts = MyStore.getContacts();

                contacts.forEach((element) => {
                    if (element.id === updatedContact.id) {
                        element.email = updatedContact.email,
                        element.full_name = updatedContact.full_name;
                        element.phone = updatedContact.phone;
                        element.address = updatedContact.address;
                    }
                });
                        
                this.dispatch('MyStore.setContacts',contacts);
                console.log('Success:', response);
                console.log(MyStore.updatedContacts);
            })
            .catch(error => console.error('Error:', error));
    }
}
export default new ContactActions();


