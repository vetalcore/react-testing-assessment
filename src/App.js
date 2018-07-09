import React, { Component } from 'react'
import BaseSwitch from './BaseSwitch/BaseSwitch';
import withToggle from './withToggleHOC/withToggleHOC';
import Switch from './Switch/Switch';
import withRepo from './WithRepoHOC/WithRepoHOC';

// not sure how Repo fourth task will be any different from previous
import Repo from './Repo/Repo';

// graphql part
import { ApolloProvider } from "react-apollo";
import client from './apolloConfig';

// withRepo HOC part
export const Loader = () => 'Loading';
export const ErrorMessage = ({ error }) => `Got "${error}" error`;
export const RepoCard = ({ repo: { name, description, owner: { login } } }) => (<div>
    <div>name: {name}</div>
    <div>description: {description}</div>
    <div>login: {login}</div>
</div>);

const WithToggleComponent = withToggle({ defaultIsOn: false })(BaseSwitch);
const WithRepo = withRepo({
    LoadingComponent: Loader,
    ErrorComponent: ErrorMessage,
})(RepoCard)


// App.js
class App extends Component {
    componentDidMount() {
        console.log(this.switch.getSwitchState());
        console.log(WithToggleComponent.getSecretNumber());
    }

    render() {
        return (<div>
            <h3>1: withToggle</h3>
            <WithToggleComponent ref={n => (this.switch = n)} />

            <h3>2: Switch</h3>
            <Switch defaultIsOn>
                {({ isOn, toggle }) => <div onClick={toggle}> I'm {isOn ? 'on' : 'off'} </div>}
            </Switch>

            BaseSwitch
            <BaseSwitch isOn={true} />

            <h3>3: withRepo</h3>
            <WithRepo owner="kandros" project="react-testing-assessment" />

            <h3>4/super bonus: Repo with react-apollo</h3>
            <ApolloProvider client={client}>
                <Repo owner="kandros" project="react-testing-assessment">
                    {({ loading, error, repo }) => {
                        if (loading) return <Loader />
                        if (error) return <ErrorMessage error={error} />
                        return <RepoCard repo={repo} />
                    }}
                </Repo>
            </ApolloProvider>
        </div>);
    }
}

export default App;
