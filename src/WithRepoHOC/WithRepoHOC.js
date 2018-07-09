import React, { Component } from 'react';
import { fetchRepo } from '../Api';

export default ({ LoadingComponent, ErrorComponent }) => WrappedComponent => {

    return class WithRepo extends Component {

        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                error: false,
            }

            this.setError = this.setError.bind(this);
        }

        componentDidMount() {
            this.fetchRepoInfo();
        }

        fetchRepoInfo() {
            const { owner, project } = this.props;
            if (!owner || !project) {
                this.setError("owner or project are not specified");
                return;
            }

            // I'm aware of redux, middlewares, thunk and saga
            // but that wasn't specified in readme.md
            fetchRepo({ owner, project })
                .then(project => {
                    this.setProject(project);
                }).catch(error => {
                    this.setError(error);
                });
        }

        setProject(repo) {
            this.setState({ loading: false, repo });
        }

        setError(error) {
            this.setState({ loading: false, error });
        }

        render() {
            const { loading, error, repo } = this.state;

            if (error) { return <ErrorComponent error={error} /> }

            return loading ?
                <LoadingComponent />
                : <WrappedComponent repo={repo} />
        }
    };
}
