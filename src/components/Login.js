import React, { Component } from "react";import {View, Text, Image, TouchableOpacity, ImageBackground, BackHandler, Linking, AsyncStorage, I18nManager, KeyboardAvoidingView , Platform} from "react-native";import {Container, Content, Form, Item, Input, Label, Button, Toast, Header} from 'native-base'import styles from '../../assets/styles'import i18n from '../../locale/i18n'import {DoubleBounce} from "react-native-loader";import {NavigationEvents} from "react-navigation";class Login extends Component {	constructor(props){		super(props);		this.state = {			phoneStatus: 0,			passwordStatus: 0,			phone: '',			password: '',			token: '',			userId: null,			isLoaded: false		}	}	validate = () => {		let isError = false;		let msg = '';		if (this.state.phone.length <= 0 || this.state.phone.length !== 10) {			isError = true;			msg = i18n.t('phoneValidation');		}else if (this.state.password.length <= 0) {			isError = true;			msg = i18n.t('passwordRequired');		}		if (msg != ''){			Toast.show({				text: msg,				type: "danger",				duration: 3000			});		}		return isError;	};	renderSubmit(){		if (this.state.isLoaded){			return(				<DoubleBounce size={20} color="#0fd1fa" />			)		}		return (			<Button onPress={() => this.onLoginPressed()} style={styles.loginBtn}>				<Text style={styles.btnTxt}>{ i18n.t('loginButton') }</Text>			</Button>		);	}	onLoginPressed() {		const err = this.validate();		if (!err){			this.setState({ isLoaded: true });			const {phone, password, token} = this.state;			this.props.userLogin({ phone, password, token }, this.props.lang);		}	}	async componentWillMount() {		const { status: existingStatus } = await Permissions.getAsync(			Permissions.NOTIFICATIONS		);		let finalStatus = existingStatus;		if (existingStatus !== 'granted') {			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);			finalStatus = status;		}		if (finalStatus !== 'granted') {			return;		}		token = await Notifications.getExpoPushTokenAsync();		this.setState({ token, userId: null })		AsyncStorage.setItem('deviceID', token);	}	onFocus(){		this.componentWillMount()	}	render() {		return (			<Container style={styles.container}>				<NavigationEvents onWillFocus={() => this.onFocus()} />				<Content contentContainerStyle={{ flexGrow: 1 , top:-1 }}>					<KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>						<ImageBackground source={require('../../assets/images/bg_splash.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>							<Image source={require('../../assets/images/logo.png')} style={styles.logoStyle} resizeMode={'contain'} />							<View style={styles.loginFormContainerStyle}>								<Form style={{ width: '100%' }}>									<View style={styles.itemView}>										<Item floatingLabel style={styles.loginItem} bordered>											<Label style={styles.label}>{ i18n.t('phoneNumber') }</Label>											<Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={styles.input}  />										</Item>									</View>									<View style={[ styles.itemView ,{ borderColor: this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff' , marginTop:30 }]}>										<Item floatingLabel style={styles.loginItem} bordered>											<Label style={[styles.label ,{ color:this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('password') }</Label>											<Input autoCapitalize='none' onChangeText={(password) => this.setState({password})} secureTextEntry style={styles.input}  />										</Item>									</View>								</Form>								<View style={styles.forgetVisitor}>									<TouchableOpacity onPress={()=> this.props.navigation.navigate('forgetPassword')}>										<Text style={styles.forget}>{ i18n.t('forgetPass') }</Text>									</TouchableOpacity>								</View>								<View style={styles.loginBtnContainer}>									{ this.renderSubmit() }								</View>								<TouchableOpacity onPress={() => this.props.navigation.navigate('drawerNavigator')}>									<Text style={styles.visitor}>{ i18n.t('visitor') }</Text>								</TouchableOpacity>							</View>						</ImageBackground>					</KeyboardAvoidingView>				</Content>			</Container>		);	}}export default Login;