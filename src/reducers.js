import { combineReducers } from 'redux';
import { LOGGED_IN } from './actions';

const INITIAL_STATE = {
	authenticated: null,
	email: ''
};

const login = (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case LOGGED_IN:
			return {
				...state,
				email: action.email,
				authenticated: true,
			}

		default: return state;
	}
}

const SAVE_QR = 'SAVE_QR';
const UPDATE_QR = 'UPDATE_QR';
const DELETE_QR = 'DELETE_QR';

// Initial state of the store
const initialState = {
	qrCodes: [],
	codes: [],
};

const storage = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_QR:  {
			return {
				...state,
				qrCodes: [
					...state.qrCodes,
					action.payload
				],
			}
		}

		case UPDATE_QR: {
			return Object.assign({}, state, {
				qrCodes: state.qrCodes.map((qr, index) => {
					if(index === action.index) {
						return Object.assign({}, qr, {...action.payload})
					}
					return qr
				})
			})
		}

		case DELETE_QR: {
			return {
        		...state,
        		qrCodes: state.qrCodes.filter((code, i) => i !== action.id),
	      }
		}

		default: {
			return state;
		}
	}
}

const reducers = combineReducers({
	login,
	storage
});

export default reducers;
