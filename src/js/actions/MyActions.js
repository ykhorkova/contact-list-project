import Flux from '@4geeksacademy/react-flux-dash';
import MyStore from '../stores/MyStore.js';

class ContactActions extends Flux.Action{
    
    addContact(incomingContact){
        console.log('Add contact action!');
        let contacts = MyStore.getContacts();
        
        contacts.push(incomingContact);
        this.dispatch('MyStore.setContacts',contacts);
    }
    
    deleteContact(email){
        console.log('delete action!', email);
        let contacts = MyStore.getContacts();
        
        let updatedContacts = contacts.filter((element, index) => {
            return element.email != email;
        });
        console.log(updatedContacts);
        this.dispatch('MyStore.setContacts',updatedContacts);
    }
    
    editContact(){
        console.log('edit action!');
        let contacts = MyStore.getContacts();
        
        let updatedContact = contacts.map(function() {
            if (contacts.email != email){
                return updatedContact;
        }
        
        });
        console.log(updatedContact);
        this.dispatch('MyStore.setContacts',contacts);
        
            
    }
    
}
export default new ContactActions();


