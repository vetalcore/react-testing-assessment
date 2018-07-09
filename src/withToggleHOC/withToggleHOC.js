import React, { Component } from 'react';

export default ({ defaultIsOn }) => WrappedComponent => {

    class WithToggle extends Component {

        state = { isOn: defaultIsOn };

        toggle = () => {
            this.setState({ isOn: !this.state.isOn });
        }

        getSwitchState = () => {
            return this.state.isOn;
        }

        render() {
            return (<WrappedComponent toggle={this.toggle} {...this.state} />)
        }
    };

    /** Totally wasn't sure about the way you wanted to make below happens
        App.js

        componentDidMount() {
            console.log(this.switch.getSwitchState()); // on or off
            console.log(Switch.getSecretNumber()); // 42
        }
        so, i'am copying all static methods of wrappend component
    **/
    Object.keys(WrappedComponent).forEach((key) => {
        WithToggle[key] = WrappedComponent[key];
    });

    return WithToggle;
}
