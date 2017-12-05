import React, { Component } from 'react';
import './FilterComponent.css'
import { setTextFilter } from '../actions/filters';
import { connect } from 'react-redux';



class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    render() {
        return(
            <div>
                Søk
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                    }}></input>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(FilterComponent);