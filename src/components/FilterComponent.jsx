import React, { Component } from 'react';
import './FilterComponent.css'

class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(e) {
        this.props.searchCar(e.target.value)
    }

   

    render() {
        return(
            <div>
                Søk
                <input onChange={this.updateSearch}></input>
            </div>
        )
    }


}

export default FilterComponent;