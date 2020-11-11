import * as React from 'react';
import { shallow } from 'enzyme';
import { CheckboxWithLabel } from '../components/checkboxWithLabel';
import {ButtonWIthIcon} from "../components/ButtonWithIcon";


test('CheckboxWithLabel changes the text after click', () => {
    const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

    // Interaction demo
    expect(checkbox.text()).toEqual('Off');
    checkbox.find('input').simulate('change');
    expect(checkbox.text()).toEqual('On');

});
