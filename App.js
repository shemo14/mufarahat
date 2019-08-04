import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import AppNavigator from './src/routes';
import { Root } from "native-base";
import './ReactotronConfig';



export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
		};
	}

	async componentDidMount() {
		await Font.loadAsync({
			cairo: require('./assets/fonts/Cairo-Regular.ttf'),
			cairoBold: require('./assets/fonts/Cairo-Bold.ttf'),
			openSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
			openSans: require('./assets/fonts/OpenSans-Regular.ttf'),
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			...Ionicons.font,
		});
		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady) {
			return <AppLoading />;
		}

		return (
			<Root>
				<AppNavigator />
			</Root>
		);
	}
}

