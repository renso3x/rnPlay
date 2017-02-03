export const LOGGED_IN = 'LOGGED_IN';

export function loggedIn(email, password) {
	return {
		type: LOGGED_IN,
		email
	}
};
const SAVE_QR = 'SAVE_QR';
export function saveQR(data) {
	return {
		type: SAVE_QR,
		payload: data
	}
};

const UPDATE_QR = 'UPDATE_QR';
export function updateQR(index, data) {
	return {
		type: UPDATE_QR,
		index,
		payload: data
	}
}

const DELETE_QR = 'DELETE_QR';
export function deleteQR(id) {
	return {
		type: DELETE_QR,
		id
	}
}
