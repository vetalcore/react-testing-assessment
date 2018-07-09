import React from 'react';

export default class Switch extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isOn: props.defaultIsOn };
    }

    toggle = () => {
        this.setState({ isOn: !this.state.isOn });
    }

    render() {
        const { children } = this.props;

        return children({ isOn: this.state.isOn, toggle: this.toggle });
    }
};
