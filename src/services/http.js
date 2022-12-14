export const httpGet = (url, token) => {
	const defaultHeaders = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
	const OPTIONS = {
		method: 'GET',
		headers: token
			? {
					...defaultHeaders,
					Authorization: `JWT ${token}`,
			  }
			: { ...defaultHeaders },
	}
	return sendRequest(url, OPTIONS)
}

export const httpPost = (url, body, token, formData) => {
	const defaultHeaders = {
		'Content-Type': !formData ? 'application/json' : 'application/x-www-form-urlencoded',
	}
	const OPTIONS = {
		method: 'POST',
		headers: token
			? {
					...defaultHeaders,
					Authorization: `JWT ${token}`,
			  }
			: { ...defaultHeaders },
		body: body,
	}

	return sendRequest(url, OPTIONS)
}
export const httpPut = (url, body, token) => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
	}
	const OPTIONS = {
		method: 'PUT',
		headers: token
			? {
					...defaultHeaders,
					Authorization: `JWT ${token}`,
			  }
			: { ...defaultHeaders },
		body: body,
	}

	return sendRequest(url, OPTIONS)
}
export const httpDel = (url, body, token) => {
	const OPTIONS = {
		method: 'DELETE',
		headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${token}`,
			  },
		body: body,
	}

	return sendRequest(url, OPTIONS)
}
 
// function sendRequestHTTP(url, OPTIONS) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			reject({ code: 408, statusText: 'Request Timeout' })
// 		}, 45000)
// 		fetch(url, OPTIONS).then((response) => {
// 			if (response.status >= 200 && response.status < 300) {
// 				response.json().then((body) => {
// 					resolve({
// 						body,
// 						status: response.status,
// 						statusText: response.statusText,
// 					})
// 				})
// 			} else {
// 				reject({
// 					body: [],
// 					code: parseInt(`${response.status}`),
// 				})
// 			}
// 		})
// 	})
// }
function sendRequest(url, OPTIONS) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject({ code: 408, statusText: 'Request Timeout' })
			// sendRequestHTTP(url.replace(/https/i, 'http'), OPTIONS)
		}, 45000)
		fetch(url, OPTIONS).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				response.json().then((body) => {
					resolve({
						body,
						status: response.status,
						statusText: response.statusText,
					})
				})
			} else {
				try {
					// reject({
					// 	code: parseInt(`${response.status}`),
					// })
					response.json().then((body) => {
						reject({
							body,
							code: parseInt(`${response.status}`),
							statusText: response.statusText,
						})
					})
				} catch (err) {
					reject({
						body: err,
						code: parseInt(`${response.status}`),
					})
				}
			}
		})
	})
}
