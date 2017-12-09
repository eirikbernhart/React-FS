import { App } from '../.././App';
import React from 'react';
import {shallow} from 'enzyme';
import HeaderComponent from '../../components/HeaderComponent';
import toJSON from 'enzyme-to-json';
import { MainPage } from '../../components/MainPage';
import configureStore from 'redux-mock-store'






describe('should render "Not authorized" if user is not logged in', () => {

    const initialState = {
        cars: [],
        auth: {
          username: '',
          authenticated: false
        },
        filters: {
          text: ''
        },
        activeSocket: {
          inSocket: null
        }
    };

    const mockStore = configureStore();
    let store, container;
    
    
    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<MainPage store={store}/>);
        
    });

    it('+++ render the connected(SMART) component', () => {

    });
    
  

    
       
   
});