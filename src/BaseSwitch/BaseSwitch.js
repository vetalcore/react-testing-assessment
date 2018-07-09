import React from 'react';
import PropTypes from 'prop-types';

const secretNumber = 42;
export default class BaseSwitch extends React.Component {

    static PrpropTypes = {
        toggle: PropTypes.func,
        isOn: PropTypes.bool,
    };

    static defaultProps = {
        toggle: () => {},
        isOn: false,
    }

    static getSecretNumber = () => {
        return secretNumber;
    }

    getSwitchState = () => {
        return { isOn: this.props.isOn };
    }

    render() {
        const { toggle, isOn } = this.props;

        return (<div onClick={toggle}> I'm {isOn ? 'on' : 'off'} </div>);
    }
}
