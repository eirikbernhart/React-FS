import React from 'react';
import {shallow} from 'enzyme';
import HeaderComponent from '../../components/HeaderComponent';
import toJSON from 'enzyme-to-json';


test('should render header correctly', () => {
    const wrapper = shallow(<HeaderComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();

});