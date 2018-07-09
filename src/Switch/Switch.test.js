import React from 'react';
import { shallow } from 'enzyme';

import Switch from './Switch';

describe('withToggleHOC', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            defaultIsOn: true,
            children: ({ isOn, toggle }) => <div onClick={toggle}> I'm {isOn ? 'on' : 'off'} </div>,
        }
        wrapper = shallow(<Switch {...props} />);
    });

    it('Should set default isOn state', () => {
        expect(wrapper.state('isOn')).toEqual(props.defaultIsOn);
    });

    //the rest will be pretty the same as in withToggle and BaseSwitch, othervise update description :)
});
