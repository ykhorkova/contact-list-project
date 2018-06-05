import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';

class MyStore extends Flux.Store{
    
    constructor(){
        super();
        this.state = {
            contacts: []
        };
    }
    
    _setContacts(contacts){
        console.log('setContacts on the store',contacts);
        
        this.setStoreState({
            contacts: contacts
        }).emit();
    }
    
    getContacts(){
        return this.state.contacts;
    }
}
export default new MyStore();