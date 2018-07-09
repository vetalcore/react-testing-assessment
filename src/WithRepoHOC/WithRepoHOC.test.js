import React from 'react';
import { shallow, mount } from 'enzyme';

import WithRepoHOC from './WithRepoHOC';
import { fetchRepo } from '../Api';

describe('WithRepo', () => {
    const LoadingComponent = () => null;
    const ErrorComponent = () => null;
    const RepoCard = () => null;

    const defaultState = {
        loading: true, error: false,
    };
    const response = { data: 'data' };
    const fetchSuccessState = {
        loading: false, error: false, repo: response,
    };
    const url = 'https://api.github.com/repos/owner/project';
    let error = 'some error';
    const fetchErrorState = {
        loading: false, error,
    };

    let WithRepo;
    let wrapper;
    let params = {
        owner: "owner",
        project: "project",
    };

    beforeEach(() => {
        WithRepo = WithRepoHOC({ LoadingComponent, ErrorComponent })(RepoCard);
    });

    afterEach(() => {
        fetch.resetMocks()
    });

    it('calls fetchRepo should return data and set state', (done) => {
        fetch.mockResponseOnce(JSON.stringify(response))
        wrapper = shallow(<WithRepo {...params} />);

        expect(wrapper.state()).toEqual(defaultState);
        expect(wrapper.find('LoadingComponent').length).toEqual(1);

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.state()).toEqual(fetchSuccessState);
            expect(wrapper.find('RepoCard').length).toEqual(1);
            done();
        })

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual(url);
    });

    it('call fetchRepo should be rejected and error should be set', (done) => {
        fetch.mockRejectOnce(error);
        wrapper = shallow(<WithRepo {...params} />);

        expect(wrapper.find('LoadingComponent').length).toEqual(1);

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find('ErrorComponent').length).toEqual(1);
            expect(wrapper.state()).toEqual(fetchErrorState);
            done();
        })

        expect(fetch.mock.calls.length).toEqual(1);
    });

    it('should make any calls if owner wasn\'t set, and set error', () => {
        error = 'owner or project are not specified';
        params = {
            project: "project",
        };
        wrapper = shallow(<WithRepo {...params} />);

        expect(wrapper.state()).toEqual({ ...fetchErrorState, error });
        expect(fetch.mock.calls.length).toEqual(0);
    });
});
