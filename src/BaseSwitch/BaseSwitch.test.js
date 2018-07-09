import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import BaseSwitch from './BaseSwitch';

describe('BaseSwitch', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BaseSwitch />);
    });

    it('Should set default props', () => {
        wrapper = mount(<BaseSwitch />);

        expect(wrapper.props().isOn).toEqual(false);
    });

    it('Should render should render I\'m in/of due to appropriate isOn value', () => {
        const isOnText = ' I\'m on ';
        const isOffText = ' I\'m off ';

        wrapper.setProps({ isOn: false });
        expect(wrapper.text()).toEqual(isOffText);

        wrapper.setProps({ isOn: true });
        expect(wrapper.text()).toEqual(isOnText);
    });

    it('Should return switch state on calling getSwitchState method', () => {
        wrapper.setProps({isOn: true});
        wrapper.update();
        expect(wrapper.instance().getSwitchState().isOn).toEqual(true);
    });

    it('Should return hardcoded secret number on getSecretNumber call', () => {
        const secretNumber = 42;

        expect(BaseSwitch.getSecretNumber()).toEqual(secretNumber);
    });

    it('Should call toogle method on click, change state and rerender', () => {
        const props = {
            toggle: () => { },
        };
        const toggle = stub(props, 'toggle');

        wrapper = shallow(<BaseSwitch {...props} />);
        wrapper.find('div').simulate('click');

        expect(toggle.callCount).toEqual(1);
    });
});
