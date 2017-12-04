import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import CarForm from './CarForm';
import CarItem from './CarItem';
import FilterComponent from './FilterComponent';


const urlAutomobilesPublic = "http://localhost:1234/automobilesPublic"

class InspirationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inspirations: []
        };

        this.initState = this.initState.bind(this);     
        this.getAutomobilesPublic = this.getAutomobilesPublic.bind(this);   
    }

    componentDidMount() {    
      //this.initState();  
      this.getAutomobilesPublic();
    };

    initState() {
        const dummyData = [{
            name: 'Audi R8',
            id: 0,
            owner: 'Derek'
        },
        {
            name: 'Tesla Roadster 2020',
            id: 2,
            owner: 'Zlad'
        }]

        this.setState({inspirations: dummyData}, () => {
            console.log('STATE ' + JSON.stringify(this.state.inspirations));
            
        })
    }

    getAutomobilesPublic() {
        fetch(urlAutomobilesPublic, {
           
        })
        .then(res => {
            if(res.status === 200) { 
                return res = res.json();        
            }
        })
        .then(res2 => {
            //var publicData = res.filter(x => x.public === true)
            this.setState({
                inspirations: res2
            });
        })
    }
    
    render() {
        
        
        if(this.state.inspirations !== undefined) {

            return(
                <div>
                <div className="App-header">
                    <h2>Inspiration page</h2>
                </div>
                <div>
                    <Table bordered>
                        <tbody>
                                        
                        </tbody>
                    </Table>
    
                    <Table bordered>
                        <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Car</th>
                                    <th>Owner</th>
                                </tr>
                        </thead>
    
                        <tbody>
                        {this.state.inspirations.map((data, index) => (
                            <tr key = {data._id}>
                                <th scope="row">{index + 1}</th>
                                     <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        {data.owner}
                                    </td>
                            </tr>
                        ))}        
                        </tbody>
                    </Table>
                </div>   
                </div>
            )
        } else {
            return <p>FETT!!!</p>;
        }
            
        }
           
    }


export default InspirationPage;
/**
 * 
 * tbody>
                        {this.state.inspirations.map((data, index) => (
                            <tr key = {data.id}>
                                <th scope="row">{index + 1}</th>
                                     <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        {data.owner}
                                    </td>
                            </tr>
                        ))}        
                        </tbody>
 */