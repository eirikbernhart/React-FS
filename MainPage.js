import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ListView,
    StatusBar,
    TextInput,
    Button,
    ToastAndroid
    
  } from 'react-native';
  import { 
    Grid, Col, 
  } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

const url = "http://10.0.0.133:1234/automobiles";

const carList = [];




export default class MainPage extends Component {


    static navigationOptions = {
        title: 'Main screen',
    }


   
    
    constructor() {
        super();
      
        this.fetchUser = this.fetchUser.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeCar = this.removeCar.bind(this);
        
      
        this.fetchUser();
        
        const datasource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        
        this.state = {
          cars: [],
          backUpCars: [],
          datasource: datasource.cloneWithRows(['dummy1', 'dummy2']),
        }
      }
      
      
      
      fetchUser() {
        fetch(url)
          .then(response => {
           return response = response.json()
          })
          .then(res => {
            carList = res;
            const newDatasource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
            this.setState({
              datasource: newDatasource.cloneWithRows(carList),
            })
          })
          .catch(err => {
            console.log("Error: " + err)
          });
      }
      
      addCar() {
      
        var randomID = this.scientificToDecimal((Math.floor(1000 + Math.random() * 900000000000000000000000)))
      
        car = {
          id: randomID.toString(),
          name: this.state.carName,
          price: 1234,
          __v: 0
        }
        console.log('HVA ER CAR 1: ' + this.state.carName);
        let recivedCar = car
        fetch(url, {
          method: "POST",
          headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
          body: JSON.stringify(car)
        })
          .then(res => {
                console.log("HVA ER CAR 2: " + JSON.stringify(recivedCar))
      
                carList = carList.concat(car);
                console.log("HVA ER CARLIST nå: " + JSON.stringify(carList))
                
                var newDatasourceAdd = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
      
                this.setState(s => ({
                  datasource: newDatasourceAdd.cloneWithRows(carList),
                  carName: ''
                }));
                ToastAndroid.show(JSON.stringify(car.name) + ' Added to wishlist!', ToastAndroid.SHORT);
          })
          .catch(err => {
            console.log("Error: " + err)
          });
      }
      
      removeCar(id) {
      
          console.log("removeCar 1")
      
            fetch(`${url}/${id}`, {
              method: "DELETE",
              headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
              }),
            })
              .then(res => {
      
                console.log("removeCar 2")
                
      
                var newDatasourceRemove = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
      
                carList = carList.filter(x => x._id !== id);
      
                this.setState(prevState => ({
                  datasource: newDatasourceRemove.cloneWithRows(carList)
                }));
              })
              .catch(err => {
                console.log("Error: " + err)
              });
          }
      
      searchCar() {
        console.log("TBA...")
        
      }
      
      
      
      _renderRow(rowData) {
      
        return (
          <View style={{padding: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center', 
                marginTop: 5, backgroundColor: '#959faf', marginLeft: 10, marginRight: 10, borderRadius: 5}}>
            <Text style={{flex: 1}}>
              Manufacturer: {rowData.name}
            </Text>
            <Button 
              title='x'
              color='red'
              onPress={() => this.removeCar(rowData._id)}
            />
          </View>
        )
          
      }
      
      //Implementation: https://gist.github.com/jiggzson/b5f489af9ad931e3d186 
      scientificToDecimal(num) {
        //if the number is in scientific notation remove it
        if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
            var zero = '0',
                parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
                e = parts.pop(),//store the exponential part
                l = Math.abs(e), //get the number of zeros
                sign = e/l,
                coeff_array = parts[0].split('.');
            if(sign === -1) {
                num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
            }
            else {
                var dec = coeff_array[1];
                if(dec) l = l - dec.length;
                num = coeff_array.join('') + new Array(l+1).join(zero);
            }
        }
        return num;
      };
      
      
      
        render() {
          var {params} = this.props.navigation.state;
            
          return (
            <View style={{flex: 1}}>
              <StatusBar hidden />
              <Text>Logged in as: {params.name}</Text>
      
              
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <View style={{padding: 10, width: '50%'}}>
                  <TextInput style={{justifyContent: 'center'}}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={carName => this.setState({carName})}
                    value = {this.state.carName}
                    placeholder={"New car..."}
                  />
                  <Button style={{backgroundColor: '#959faf'}}
                    title="Add"
                    value=""
                    onPress={this.addCar}
                  />
                </View>
                <View style={{padding: 10, width: '50%'}}>
                  <TextInput style={{justifyContent: 'center'}}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={"Search..."}
                  />
                  <Button style={{backgroundColor: '#959faf'}}
                    title="Search"
                    value=""
                    onPress={this.searchCar}
                  />
                </View>
              </View>
      
              <Text style={{borderWidth: 2, padding: 15, backgroundColor: 'gray', color:'black', 
              alignItems: 'center', justifyContent: 'center', marginTop: 100, 
              marginLeft: 5, marginRight: 5, borderRadius: 5}}>CARS IN WISHLIST: {carList.length}</Text>
              <ListView 
                dataSource={this.state.datasource}
                renderRow={this._renderRow}
              />
        
            </View>
      
            
          );
        }
      }