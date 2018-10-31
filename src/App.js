import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { decode } from 'jsonwebtoken';
import './App.css';

import authProvider from './authProvider';
import customRoutes from './routes';
import Login from './Login';
import Layout from './Layout';
import Dashboard from './dashboard/Dashboard';

import englishMessages from './i18n/en';
import dataProvider from './dataProvider';
import informationReducer from './informationReducer';

import regions from './posts';


const i18nProvider = locale => {
    if (locale === 'vi') {
        return import('./i18n/vi').then(messages => messages.default);
    }

    return englishMessages;
};

class App extends Component {
    state = { dataProvider: null };
    componentDidMount() {
        if (window.location.href.indexOf("/logined#") > -1) {
            const curUrl = window.location.href;
            const token = curUrl.match(/(id_token=)[^&]*/)[0].split('=')[1];
            const decoded = decode(token);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userDetails', decoded["cognito:username"]);
            window.location = '/';
        }
    }
    async componentWillMount() {
        this.setState({ dataProvider });
    }
    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
                <Admin
                    title="Master Data Management"
                    dataProvider={dataProvider}
                    customReducers={{ 
                        ...informationReducer,
                     }}
                    customRoutes={customRoutes}
                    authProvider={authProvider}
                    loginPage={Login}
                    appLayout={Layout}
                    locale="en"
                    dashboard={Dashboard}
                    i18nProvider={i18nProvider}
                >
                    <Resource name="posts" {...regions} />
                </Admin>
        );
    }
}

export default App;
