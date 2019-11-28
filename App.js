import React from 'react';
import { StyleSheet, Text, Platform , I18nManager , AsyncStorage} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import AppNavigator from './src/routes';
import { Root } from "native-base";
import './ReactotronConfig';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// Keystore password: a1f8f61b85354793baaece9fbd921f67
// Key alias:         QG1fc2hhbXMvbW9mcmloYXQ=
// Key password:      46cc779d16724ffbbe1c96e9cf97d212



export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
		};

		// I18nManager.forceRTL(true)
	}

	async componentWillMount() {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			return;
		}

		let token = await Notifications.getExpoPushTokenAsync();

		// AsyncStorage.clear()
	}


	handleNotification = (notification) => {
		if (notification && notification.origin !== 'received') {
			this.props.navigation.navigate('notifications');
		}
	}

	async componentDidMount() {
		if (Platform.OS === 'android') {
			Notifications.createChannelAndroidAsync('orders', {
				name: 'Chat messages',
				sound: true,
			});
		}

		Notifications.addListener(this.handleNotification);

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
			<Provider store={store}>
				<PersistGate persistor={persistedStore}>
					<Root>
						<AppNavigator />
					</Root>
				</PersistGate>
			</Provider>
		);
	}
}

