import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';

import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from './reducers';
const store = createStore(reducers, undefined, autoRehydrate());

persistStore(store, { storage: AsyncStorage });

import Launch from './Launch';
import Login from './Login';
import Welcome from './Welcome';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Scene component={Launch} key="launch" initial hideNavBar />
				<Scene component={Login} key="login" hideNavBar />
				<Scene component={Welcome} key="welcome" />
			</Router>
		</Provider>
	);
}

export default App;
