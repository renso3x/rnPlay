import React from 'react';
import { AsyncStorage, View, Text, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { saveQR, updateQR, deleteQR } from './actions';


//TODO
//create a HoC checks whether the user is authenticated
class Launch extends React.Component {
	constructor(props) {
		super(props);
		this.state = { id: 0 };
		this.onSave = this.onSave.bind(this);
		this.onUpdateQR = this.onUpdateQR.bind(this);
		this.onDeleteQr = this.onDeleteQr.bind(this);
	}

	// componentWillMount() {
	// 	console.log(this.props.codes);
	// 	this.setState({ qr: this.props.codes.qrCodes });
	// 	console.log(this.state.qr);
	// }
	//
	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps.codes)
	// 	this.setState({ isLoading: true, qr: nextProps.codes.qrCodes });
	// }

	onSave() {
		const { dispatch } = this.props;
		this.setState({ id: this.state.id + 1 });

		const code = {
			id: this.state.id,
			qrcode: 'xy-code',
			lat: '45',
			lng: '203'
		};
		dispatch(saveQR(code));
	}

	onUpdateQR(i, data) {
		const { dispatch } = this.props;
		dispatch(updateQR(i, data));
	}

	onDeleteQr(i) {
		const { dispatch } = this.props;
		dispatch(deleteQR(i));
	}

	async getToken() {
		try {
			// const value = await AsyncStorage.getItem('isAuthenticated');
			// console.log(value)
			// if (value) {
			// 	console.log(JSON.stringify(value));
			// 	Actions.welcome();
			// } else {
			// 	Actions.login();
			// }
			AsyncStorage.getAllKeys((err, keys) => {
				console.log(keys);
			})
		} catch(err) {
			alert(err);
		}
	}

	// async setActivityLog(key, val) {
	// 	try {
	// 		await AsyncStorage.setItem(key, JSON.stringify(val), () => {
	// 			AsyncStorage.getItem(key, (err, result) => {
	// 				console.log(JSON.parse(result));
	// 			});
	// 		});
	// 	} catch(e) {
	// 		console.log(e);
	// 	}
	// }


	renderQrCodes() {
		const { qrCodes } = this.props.codes;
		console.log(this.props);
		console.log(qrCodes);
		if(!qrCodes) {
			return <Text>Loading</Text>;
		}

		return (
			<View style={{ flex: 1, backgroundColor: 'red'}}>
				{qrCodes.map((text, i) => {
					return (
						<View key={text.id} style={{ flex: 1 }}>
							<Text>{text.id} {text.qrcode}</Text>
							<TouchableHighlight
								style={{
									backgroundColor: 'whitesmoke',
								}}
								onPress={() => this.onUpdateQR(i, { qrcode: 'nanana' })}
							><Text>Update</Text>
							</TouchableHighlight>
							<TouchableHighlight
								key={i}
								style={{
									backgroundColor: 'blue',
								}}
						  		onPress={() => this.onDeleteQr(i)}
							><Text>Delete</Text>
							</TouchableHighlight>
						</View>
					)
				})}
			</View>
		);
	}

	render() {
		return (
			<ScrollView style={{ paddingTop: 20, backgroundColor: 'lightblue'}}
				contentContainerStyle={{
					justifyContent: 'center', alignItems: 'center',
				}}
			>
				<Text>Redux Persist</Text>
				<TouchableHighlight onPress={this.onSave}>
					<View>
						<Text>Store Some QR</Text>
					</View>
				</TouchableHighlight>
				{this.renderQrCodes()}
		  	</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		codes: state.storage
	}
};
export default connect(mapStateToProps)(Launch);
