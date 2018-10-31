import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {

    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case GET_LIST: {
                const query = {};
                if (params.pagination !== null && params.pagination !== undefined) {
                    const { page, perPage } = params.pagination;
                    query.page = page - 1;
                    query.size = perPage;
                }
                if (params.sort !== null && params.sort !== undefined) {
                    const { field, order } = params.sort;
                    query.sort = field + ',' + order;
                }
                if (params.filter !== null && params.filter !== undefined) {
                    query.filter = JSON.stringify(params.filter)
                }
                let strQuery = '';
                if (Object.keys(query).length > 0) {
                    strQuery = `?${stringify(query)}`;
                }
                url = `${apiUrl}/${resource}${strQuery}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY_REFERENCE: {
                const { page, size } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    filter: JSON.stringify({
                        ...params.filter,
                        [params.target]: params.id,
                    }),
                    sort: field + ',' + order,
                    page: (page - 1),
                    size: size,
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            case GET_MANY: {
                const query = { [`id_like`]: params.ids.join('|'), };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return {
                    data: json.data,
                    total: json.total,
                };
            case CREATE:
            case UPDATE:
            case GET_ONE:
            default:
                return { data: json };
        }
    };

    return (type, resource, params) => {
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};
