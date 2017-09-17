import React, { Component } from 'react';
import './CarItem.css';

class CarItem extends Component {

    constructor(props) {
        super(props);
        this.carName = props.car.name;
        this.id = props.car._id;
        this.handleRemoveCar = this.handleRemoveCar.bind(this);

    }

    handleRemoveCar(id) {
        this.props.removeCar(id);
    }

    render(props) {
        return (
            <div className="itemContent">
                {JSON.stringify(this.carName)}
                <span className="closebtn"
                    onClick={() => this.handleRemoveCar(this.id)}>
                    &times;
            </span>
            </div>
        );
    }
}

export default CarItem;