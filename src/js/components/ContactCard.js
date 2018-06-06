import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyStore from '../stores/MyStore.js';

class ContactCard extends React.Component{
    constructor(){
        super();
        this.state = {
            // initialize your state
        };
    }
    
    render(){
        return (
            <li className="list-group-item">
                <div className="row w-100">
                    <div className="col-12 col-sm-6 col-md-3 px-0">
                        <img src={this.props.image} className="rounded-circle mx-auto d-block img-fluid" />
                    </div>
                    <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                        <div className=" float-right">
                            <button className="btn" onClick={() => this.props.history.push('/edit/'+this.props.email)}><i className="fas fa-pencil-alt mr-3"></i></button>
                            <button className="btn" onClick={() => this.props.onDelete(this.props.email)}><i className="fas fa-trash-alt"></i></button>
                        </div>
                        <label className="name lead">{this.props.name}</label>
                        <br /> 
                        <i className="fas fa-map-marker-alt text-muted mr-3"></i>
                        <span className="text-muted">{this.props.address}</span>
                        <br />
                        <span className="fa fa-phone fa-fw text-muted mr-3" data-toggle="tooltip" title="" data-original-title="(870) 288-4149"></span>
                        <span className="text-muted small">{this.props.phone}</span>
                        <br />
                        <span className="fa fa-envelope fa-fw text-muted mr-3" data-toggle="tooltip" data-original-title="" title=""></span>
                        <span className="text-muted small text-truncate">{this.props.email}</span>
                    </div>
                </div>
            </li>
        );
    }
    
}

/**
 * here is where you define the data-types for
 * your component propersties
**/
ContactCard.propTypes = {
    history: PropTypes.object,
    onDelete: PropTypes.func,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number
};

/**
 * here is where you define the default values
 * for your component propersties
**/
ContactCard.defaultProps = {
  onDelete: null,
  name: '',
  phone: '',
  email: '',
  address: '',
  image: ''
  
};
export default withRouter(ContactCard);