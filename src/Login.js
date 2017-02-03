import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { loggedIn } from './actions';

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: null,
			password: null
		};

		this.onButtonPress = this.onButtonPress.bind(this);
	}

	componentWillMount() {
		console.log(this.props.authenticated)
	}

	async setAuthenticationUser() {
		try {
			await AsyncStorage.setItem('isAuthenticated', 'I like to move it');
			this.getToken();
		} catch(e) {
			alert(e);
		}
	}

	async getToken() {
		try {
			const value = await AsyncStorage.getItem('isAuthenticated');
			console.log(value);
		} catch(err) {
			alert(err);
		}
	}

	onButtonPress() {
		this.props.loggedIn(this.state.email);
		this.setAuthenticationUser();
		Actions.welcome({ type: 'replace' });
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
				 	placeholder="Email"
					ref='email'
					autoCapitalize={'none'}
					autoCorrect={false}
					onChangeText={(email) => this.setState({ email })}
				/>
				<TextInput
					style={styles.input}
					secureTextEntry
					placeholder="Password"
					ref='password'
					onChangeText={(password) => this.setState({ password })}
				/>
				<TouchableHighlight
					style={styles.buttonContainer}
					onPress={this.onButtonPress}
				>
					<Text>Login</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	input: {
		paddingHorizontal: 20,
		height: 50,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#cccccc'
	},
	buttonContainer: {
		backgroundColor: 'green',
		alignItems: 'center',
		paddingVertical: 15,
	}
};

const mapStateToProps = (state) => {
	return {
		authenticated: state.login.authenticated
	}
}
export default connect(mapStateToProps, {
	loggedIn
})(Login);
