import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import CarForm from './CarForm';
import CarItem from './CarItem';
import FilterComponent from './FilterComponent';
import { connect } from 'react-redux';



const urlAutomobilesPublic = "http://localhost:1234/automobilesPublic";

class InspirationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inspirations: [],
            socketTestData: 'default', //SOCKET: Socket.IO-related
        };

        this.getAutomobilesPublic = this.getAutomobilesPublic.bind(this); 
        //this.init = this.init.bind(this);  

        //this.init();

        
        
    }

    componentDidMount() {   
        
        
      this.getAutomobilesPublic()
      this.props.activeSocket.inSocket.on('testEvent', () => 
        this.getAutomobilesPublic(),
      );
     
      console.log("Null?: " + this.props.activeSocket);

      

     
      
    
      
        
    
      
    };
    

    

    

    

   

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
            console.log("CARS in inspiration: " + res2);
            this.setState({
                inspirations: res2
            });

            
            return res2;    
        })
    }

    
    render() {
        
        
        if(this.state.inspirations !== undefined) {

            return(
                <div>
                <div className="App-header">
                    <h2>See inspirations from other users live!</h2>
                    <p>SocketTestData: {this.state.socketTestData}</p>

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
                                    <th>Owner Recommendations ---></th>                                    
                                    <th>Car</th>
                                </tr>
                        </thead>
    
                        <tbody>
                        {this.state.inspirations.map((data, index) => (
                            <tr key = {data._id}>
                                <th scope="row">{index + 1}</th>
                                     <td>
                                        {data.owner}
                                    </td>
                                    <td>
                                        {data.name}                                    
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

    function mapStateToProps(state) {
        return {
            activeSocket: state.activeSocket
        };
};


export default connect(mapStateToProps)(InspirationPage);
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