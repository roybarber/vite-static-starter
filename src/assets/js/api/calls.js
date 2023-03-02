import { makeRequest } from '@api/makeRequest';

// Use like:
// functionName(prop1, prop2).then(({data}) => {
// 	// do stuff with the data from the response (response.data)
// }).catch(error => {
// 	// we dont need to log the error as the make request has already handled it, but if you need to reset state or remove anything do it here
// })


///////////////////////////////////////
// Newsletter
///////////////////////////////////////
const addToNewsletter = (email) => {
    const url = `/umbraco/api/Newsletter/SubmitNewsletter`;
	const body = {
		"email" : email
	}
    return makeRequest(url, 'POST', body);
};

// Export
export {
    addToNewsletter
};
