import React, { Component } from 'react';
import './CarItem.css';
import { connect } from 'react-redux';


class CarItem extends Component {

    constructor(props) {
        super(props);
        this.id = props.car._id;
        this.carName = props.car.name;
        this.handleRemoveCar = this.handleRemoveCar.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);

        this.state = {
            checked: false
        }

    }

    handleRemoveCar(id) {
        console.log("DELETE: HVA ER ID: " + id);
        this.props.removeCar(id);
    }

    handleCheckBox(e) {
        const target = e.target;

        this.setState({checked: target})
        if(this.state.checked) {
            this.setState({checked: false})
        }
    }

    render(props) {
        return (
            <div className="itemContent">
                {JSON.stringify(this.props.car.carName)}
                <div className="checkBox">
                  
                <input 
                     name="isGoing"
                     type="checkbox"
                     checked={this.state.checked}
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
            cars: state.cars
        };
};

export default connect(mapStateToProps)(CarItem);