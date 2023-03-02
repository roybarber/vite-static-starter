/** /////////////////////////////////////
// Reusable error handling
// @param {Object} error - response from promise
////////////////////////////////////// */
const handleError = (error) => {
    let {
        status,
        theError
    } = error.response
	console.error(error)

    switch (status) {

        case 400:
            theError = ({
                status: 'There was an error with the request',
                result: status
            })
            break
		
		// do something when the resource isnot found
        case 404:
            theError = ({
                status: 'Could not speak to the server. Try again later',
                result: 404
            })
            break

		// do something when your server exploded
        case 500:
            console.error(`${status} - There was a serious error please contact support`)
            break
        // All other errors
		default:
            theError = ({
                status: `${status} - There was an error`,
                result: status
            })
    }
    return theError
}
module.exports = handleError
