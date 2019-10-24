import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    I18nManager,
    FlatList,
    Platform,
    Dimensions,
    ImageBackground,
    Animated,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import {
	Container,
	Content,
	Icon,
	Header,
	List,
	Right,
	Left,
	Button,
	Item,
	Input,
	Form,
	Label,
	Picker
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import {getCities, updateProfile} from '../actions'
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import Reactotron from '../../ReactotronConfig';
import axios from "axios";

const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            userImage: null,
            base64: null,
			fullName: this.props.user.name,
			mail: this.props.user.email,
			phone: this.props.user.phone,
			mapRegion: { latitude: Number(this.props.user.lat), longitude: Number(this.props.user.lng) },
			isModalVisible: false,
			selectedCountry: this.props.user.city_id,
			loader: true,
			isSubmitted: false,
			hasLocationPermissions: false,
			initMap: true,
			city: '',
		}
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

	_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

	confirmLocation(){
		this.setState({ isModalVisible: !this.state.isModalVisible })
	}

	async componentWillMount() {
		Reactotron.log(this.state.mapRegion,  typeof(this.props.user.lat));

	    this.props.getCities(this.props.lang);
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			alert('صلاحيات تحديد موقعك الحالي ملغاه');
		}else {
			this.setState({  initMap: false });
		}

		let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
		getCity += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
		getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=ar&sensor=true';

		try {
			const { data } = await axios.get(getCity);
			Reactotron.log(data);
			this.setState({ city: data.results[0].formatted_address });
		} catch (e) {
			console.log(e);
		}
	}

	renderEditProfile(){
		if (this.state.fullName == '' || this.state.mail == '' || this.state.phone == ''|| this.state.selectedCountry == null ){
			return (
				<Button disabled style={[styles.loginBtn ,styles.btnWidth, { backgroundColor: '#999' }]}>
					<Text style={styles.btnTxt}>{ i18n.t('save') }</Text>
				</Button>
			);
		}

		if (this.state.isSubmitted){
			return(
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<DoubleBounce size={20} style={{ alignSelf: 'center' }} color="#B7264B" />
				</View>
			)
		}

		return (
			<Animatable.View animation="flash" duration={2200}>
				<Button onPress={() => this.onUpdateProfile()} style={[styles.loginBtn , styles.mt30]}>
					<Text style={styles.btnTxt}>{ i18n.t('save') }</Text>
				</Button>
			</Animatable.View>
		);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isSubmitted: false })
		if (nextProps.cities)
			this.setState({ loader: false })
	}

    _pickImage = async () => {
        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ userImage: result.uri ,base64:result.base64});
        }
    };

	_handleMapRegionChange  = async (mapRegion) =>  {

		let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
		getCity += mapRegion.latitude + ',' + mapRegion.longitude;
		getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=' + this.props.lang + '&sensor=true';


		try {
			const { data } = await axios.get(getCity);
			console.log(data);
			this.setState({ city: data.results[0].formatted_address });

		} catch (e) {
			console.log(e);
		}
	}


    setAnimate(availabel){
        if (availabel === 0){
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 1,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 1 });
        }else {
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 0,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 0 });
        }

        console.log(availabel);
    }

    headerScrollingAnimation(e){
        if (e.nativeEvent.contentOffset.y > 30){
            console.log(e.nativeEvent.contentOffset.y);
            this.setAnimate(0)
        } else{
            this.setAnimate(1)
        }
    }

    render() {
        let image = this.state.userImage;
        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        Reactotron.log(this.state.city);

        return (
			<Container>
				<Header style={[styles.header , styles.plateformMarginTop]} noShadow>
					<Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
						<Right style={styles.flex0}>
							<Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
								<Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
							</Button>
						</Right>
						<Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('editProfile') }</Text>
						<Left style={styles.flex0}/>
					</Animated.View>
				</Header>
				<Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent, {backgroundColor: '#fff'} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
					<ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue.png') : require('../../assets/images/bg_blue2.png')} resizeMode={'cover'} style={styles.imageBackground}>

						{image != null?
							<TouchableOpacity onPress={this._pickImage}  style={[styles.profileImgParent , styles.mtt50]}>
								<Image source={{ uri: image }} style={[styles.profileImg]} resizeMode={'cover'} />
							</TouchableOpacity>
							:
							<Animatable.View animation="zoomIn" duration={1000}>
								<TouchableOpacity onPress={this._pickImage}  style={[styles.profileImgParent , styles.mtt50]}>
									<Image source={require('../../assets/images/profile.png')} style={[styles.profileImg]} resizeMode={'cover'} />
									<View style={styles.opacityView}/>
									<Image source={require('../../assets/images/upload.png')} style={styles.upload} resizeMode={'contain'} />
								</TouchableOpacity>
							</Animatable.View>
						}

						<View style={[styles.loginFormContainerStyle , styles.mt30]}>
							<KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
								<Form style={[styles.ph25 , styles.w100]}>
									<Animatable.View animation="fadeInUp" duration={1400} style={[styles.itemView ,{borderColor: COLORS.mediumgray}]}>
										<Item floatingLabel style={styles.loginItem} bordered>
											<Label style={[styles.label , {backgroundColor: '#EAEAEA' , color:COLORS.mediumgray , top:17}]}>{ i18n.t('fullName') }</Label>
											<Input value={this.state.fullName} onChangeText={(fullName) => this.setState({fullName})} autoCapitalize='none' style={[styles.input ,{color:COLORS.mediumgray}]}  />
										</Item>
									</Animatable.View>

									<Animatable.View animation="fadeInUp" duration={1800} style={[ styles.itemView , styles.inputMarginTop ,{borderColor: COLORS.mediumgray}]}>
										<Item floatingLabel style={styles.loginItem} bordered>
											<Label style={[styles.label , {backgroundColor: '#EAEAEA' , color:COLORS.mediumgray , top:17}]}>{ i18n.t('phoneNumber') }</Label>
											<Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={[styles.input ,{color:COLORS.mediumgray}]}  />
										</Item>
									</Animatable.View>

									<View>
										<Item style={styles.itemPicker} regular >
											<Label style={[styles.labelItem , {top:-18 , left:15 , position:'absolute'}]}>{ i18n.t('city') }</Label>
											<Picker
												mode="dropdown"
												style={styles.picker}
												placeholderStyle={{ color: "#acabae" }}
												placeholderIconColor="#acabae"
												selectedValue={this.state.selectedCountry}
												onValueChange={(value) => this.setState({ selectedCountry: value })}
											>
												<Picker.Item label={ i18n.t('selectCity') } value={null} />
												{
													this.props.cities.map((city, i) => (
														<Picker.Item key={i} label={city.name} value={city.id} />
													))
												}
											</Picker>
											<Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
										</Item>
									</View>

									<View style={[ styles.itemView , styles.inputMarginTop ,{borderColor: COLORS.mediumgray}]}>
										<Item floatingLabel style={[styles.loginItem , { top:0 , height:50 , width:'100%'}]} bordered onPress={() =>this._toggleModal()}>
											<Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray ,top:-5}]}>{ i18n.t('location') }</Label>
											<Input autoCapitalize='none'  disabled value={this.state.city}  style={[styles.input , { height:30 , lineHeight:23 , top:3, color:COLORS.mediumgray, paddingRight:15}]}  />
										</Item>
										<Image source={require('../../assets/images/marker_gray.png')} style={styles.regMarker} resizeMode={'contain'} />
									</View>

                                    { this.renderEditProfile() }
								</Form>
							</KeyboardAvoidingView>
						</View>
					</ImageBackground>
					<Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
						<View style={[styles.modalStyle , styles.p10]}>
							{
								!this.state.initMap ? (
									<MapView
										style={styles.mapView}
										initialRegion={{
											latitude: this.state.mapRegion.latitude,
											longitude: this.state.mapRegion.longitude,
											latitudeDelta: 0.0922,
											longitudeDelta: 0.0421,
										}}
									>
										<MapView.Marker draggable
											coordinate={this.state.mapRegion}
											onDragEnd={(e) =>  this._handleMapRegionChange(e.nativeEvent.coordinate)}
										>
											<Image source={require('../../assets/images/location_map.png')} resizeMode={'contain'} style={styles.mapMarker}/>
										</MapView.Marker>
									</MapView>
								) : (<View />)
							}
							<Button onPress={() => this.confirmLocation()} style={[styles.loginBtn ,styles.mt10]}>
								<Text style={styles.btnTxt}>{ i18n.t('confirm') }</Text>
							</Button>
						</View>
					</Modal>
				</Content>
			</Container>
        );
    }
}


const mapStateToProps = ({ profile, cities, lang }) => {
	return {
		user: profile.user,
		cities: cities.cities,
		lang: lang.lang,
	};
};
export default connect(mapStateToProps, { getCities, updateProfile })(EditProfile);