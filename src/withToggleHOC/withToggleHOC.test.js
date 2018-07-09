import React from 'react';
import { shallow } from 'enzyme';

import withToggleHOC from './withToggleHOC';

describe('withToggleHOC', () => {
    const wrappedComponentText = 'wrappedComponent';
    const defaultIsOn = true;
    let WrappedComponent;
    let WithToggle;
    let wrapper;

    beforeEach(() => {
        WrappedComponent = ({ toggle, isOn }) => wrappedComponentText;
        WithToggle = withToggleHOC({ defaultIsOn })(WrappedComponent);
        wrapper = shallow(<WithToggle />);
    });

    it('Should render WrappedComponent', () => {
        expect(wrapper.find('WrappedComponent').dive().text()).toEqual(wrappedComponentText);
    });

    it('Should set defaultIsOn state, and pass it as props to child', () => {
        expect(wrapper.state().isOn).toBe(true);
        expect(wrapper.find('WrappedComponent').props().isOn).toBe(true);
    });

    it('Should return switch state on calling getSwitchState method', () => {
        expect(wrapper.instance().getSwitchState()).toEqual(wrapper.state().isOn);

        wrapper.find('WrappedComponent').prop('toggle')();
        wrapper.update();

        expect(wrapper.instance().getSwitchState()).toEqual(wrapper.state().isOn);
    });

    it('Should pass toggle as props to chaild component, change state on triggering and rerender child', () => {
        expect(wrapper.state().isOn).toBe(true);
        expect(wrapper.find('WrappedComponent').props().isOn).toBe(true);

        wrapper.find('WrappedComponent').prop('toggle')();
        wrapper.update()

        expect(wrapper.state().isOn).toBe(false);
        expect(wrapper.find('WrappedComponent').props().isOn).toBe(false);
    });

    it('Should copy WrappedComponent static props', () => {
        WrappedComponent.staticProp = null;
        WithToggle = withToggleHOC({ defaultIsOn })(WrappedComponent);

        expect(WithToggle.staticProp).toBeDefined();
    });
});
