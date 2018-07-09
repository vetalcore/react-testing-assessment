import React from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default ({ owner, project, children }) => (
    <Query
        query={gql`
            {
                repository(owner:"${owner}", name:"${project}")  {
                    name
                    description
                    owner {
                        login
                    }
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            return children({ loading, error, repo: data && data.repository })
        }}
    </Query>
);
