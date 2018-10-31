import addUploadFeature from './addUploadFeature';
import restApi from './restApi';
import { fetchUtils } from 'react-admin';
import { domain } from './domainConfig';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    const token = sessionStorage.getItem('token');

    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = restApi(`${domain}/api`, httpClient);

const uploadCapableDataProvider = addUploadFeature(dataProvider);

const sometimesFailsDataProvider = (type, resource, params) =>
    new Promise((resolve, reject) => {
        return resolve(uploadCapableDataProvider(type, resource, params));
    });
const delayedDataProvider = (type, resource, params) =>
    new Promise(resolve =>
        setTimeout(
            () => resolve(sometimesFailsDataProvider(type, resource, params)),
            1000
        )
    );

export default delayedDataProvider;

