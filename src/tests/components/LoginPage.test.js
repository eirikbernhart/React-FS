import React from 'react';
import {shallow} from 'enzyme';
import HeaderComponent from '../../components/HeaderComponent';
import toJSON from 'enzyme-to-json';
import { LoginPage } from '../../components/LoginPage';



test('should', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});