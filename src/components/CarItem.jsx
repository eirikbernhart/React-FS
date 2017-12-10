import React, { Component } from 'react';
import './CarItem.css';
import { connect } from 'react-redux';
import { makePublic } from '.././actions/cars';
import { makePrivate } from '.././actions/cars';




class CarItem extends Component {

    constructor(props) {
        super(props);
        this.id = props.car._id;
        this.carName = props.car.name;
        this.handleRemoveCar = this.handleRemoveCar.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.findIndex = this.findIndex.bind(this);
        this.socketEvent = this.socketEvent.bind(this);
    }

    componentWillMount() {
            this.setState({
                checked: this.props.car.isPublic
            })
        
    }

    handleRemoveCar(id) {
        console.log("DELETE: HVA ER ID: " + id);
        this.props.removeCar(id);
    }

    handleCheckBox(e) {
        const target = e.target;
        let carID = this.props.car.id;

        this.socketEvent();
        

        if(!this.props.car.isPublic) {
            let index = this.findIndex(carID);
            this.props.dispatch(makePublic({index: index}));
            this.props.makePublicOrPrivate(carID);
            this.socketEvent();
            
            
            
            
        }
        if(this.props.car.isPublic) {
            let index = this.findIndex(carID);
            this.props.dispatch(makePrivate({index: index}));
            this.props.makePublicOrPrivate(carID);
            this.socketEvent();
           
            
        }
        
        

    }

    findIndex(carID){
        var indexVal;
        this.props.cars.map((currentItem, index) => {
            if(currentItem.id === carID) {            
                indexVal = index;                       
            } 
        }); 
        return indexVal;
    }

    socketEvent() {
        console.log("SocketEvent called")
        this.props.activeSocket.inSocket.emit('testEvent');
    }

    render(props) {
        return (
            <div className="itemContent">
                {JSON.stringify(this.props.car.carName)}
                <div className="checkBox">
                  
                <input 
                     name="isGoing"
                     type="checkbox"
                     checked={this.props.car.isPublic}
                     onChange={this.handleCheckBox}/>
                     Public
                </div>

                <span className="closebtn"
                    onClick={() => this.handleRemoveCar(this.props.car.id)}>
                    &times;
            </span>
            </div>
        );
    }
}

function mapStateToProps(state) {
        return {
            cars: state.cars,
            activeSocket: state.activeSocket
        };
};

export default connect(mapStateToProps)(CarItem);