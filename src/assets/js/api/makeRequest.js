import axios from 'axios';
import handleError from '@helpers/handle-error';

/** /////////////////////////////////////
// Generic service like function for Api requests
// @param {String} url // Url to call
// @param {String} method // POST GET etc
// @param {Body} body // Any data to send in the request body?
// @param {Boolean} external // external api call?
// @returns {Promise} data
////////////////////////////////////// */
export const makeRequest = (url, method, body, external = false) => {
    url = encodeURI(url);
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        axios({
            method: method,
            url: url,
            headers: headers,
            data: JSON.stringify(body),
        })
            .then((response) => resolve(response))
            .catch(function (error) {
                handleError(error);
                return reject(error);
            });
    });
};
