import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Welcome extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
			 		Welcome to React Native!
				</Text>
				<Text style={styles.instructions}>
		 			Hi! {this.props.user.email}
				</Text>
			</View>
		);
	}
}

const styles ={
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
};

const mapStateToProps = (state) => {
	return {
		user: state.login
	};
};

export default connect(mapStateToProps)(Welcome);
