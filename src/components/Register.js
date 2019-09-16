import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, BackHandler, Linking, AsyncStorage, I18nManager, KeyboardAvoidingView , Platform} from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast, Header, CheckBox, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            phone: '',
            email: '',
            password: '',
            rePassword: '',
            token: '',
            userId: null,
            isLoaded: false,
            location: '',
            isModalVisible: false,
            city: '',
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
        }
    }




    renderSubmit(){
        if (this.state.isLoaded){
            return(
                <DoubleBounce size={20} color="#B7264B" />
            )
        }

        return (
            <Button onPress={() => this.onRegisterPressed()} style={[styles.loginBtn , styles.inputMarginBottom]}>
                <Text style={styles.btnTxt}>{ i18n.t('register') }</Text>
            </Button>
        );
    }

    onRegisterPressed() {
        this.props.navigation.navigate('verifyAcc')
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });




    async componentWillMount() {


        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };
            this.setState({  initMap: false, mapRegion: userLocation });

        }

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
        getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=ar&sensor=true';

        console.log(getCity);

        try {
            const { data } = await axios.get(getCity);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }



    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        const userLocation = { latitude, longitude };
        this.setState({  initMap: false, mapRegion: userLocation });
    }


    _handleMapRegionChange  = async (mapRegion) =>  {
        console.log(mapRegion);
        this.setState({ mapRegion });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapRegion.latitude + ',' + mapRegion.longitude;
        getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=ar&sensor=true';

        console.log('locations data', getCity);


        try {
            const { data } = await axios.get(getCity);
            console.log(data);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let location = await Location.getCurrentPositionAsync({});

        // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    };



    confirmLocation(){
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {
        return (

            <Container style={styles.container}>

                <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.goBack()}>
                    <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                </TouchableOpacity>

                <Content contentContainerStyle={styles.flexGrow}>
                        <View style={styles.imageBackgroundStyle}>
                            <Animatable.View animation="zoomIn" duration={1400}>
                                <Image source={require('../../assets/images/logo.png')} style={styles.logoStyle} resizeMode={'contain'} />
                            </Animatable.View>

                            <View style={styles.loginFormContainerStyle}>
                                <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                    <Form  style={[styles.w100 , styles.ph25 ]}>
                                        <View style={styles.itemView}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={styles.label}>{ i18n.t('fullName') }</Label>
                                                <Input onChangeText={(fullName) => this.setState({fullName})} autoCapitalize='none' style={styles.input}  />
                                            </Item>
                                        </View>

                                        <View style={[ styles.itemView , styles.inputMarginTop ]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={styles.label}>{ i18n.t('phoneNumber') }</Label>
                                                <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={styles.input}  />
                                            </Item>
                                        </View>


                                        <View style={[ styles.itemView , styles.inputMarginTop ]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={styles.label}>{ i18n.t('email') }</Label>
                                                <Input onChangeText={(email) => this.setState({email})} keyboardType={'email-address'} style={styles.input}  />
                                            </Item>
                                        </View>

                                        <View style={[ styles.itemView , styles.inputMarginTop ]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={[styles.label]}>{ i18n.t('password') }</Label>
                                                <Input autoCapitalize='none' onChangeText={(password) => this.setState({password})} secureTextEntry style={styles.input}  />
                                            </Item>

                                        </View>

                                        <View style={[ styles.itemView , styles.inputMarginTop ]}>
                                            <Item floatingLabel style={styles.loginItem} bordered>
                                                <Label style={[styles.label]}>{ i18n.t('rePassword') }</Label>
                                                <Input autoCapitalize='none' onChangeText={(rePassword) => this.setState({rePassword})} secureTextEntry style={styles.input}  />
                                            </Item>

                                        </View>

                                        <View style={[ styles.itemView , styles.inputMarginTop ]}>
                                            <Item floatingLabel style={[styles.loginItem , { top:0 , height:50}]} bordered onPress={() =>this._toggleModal()}>
                                                <Label style={[styles.label , {top:-5}]}>{ i18n.t('location') }</Label>
                                                <Input autoCapitalize='none'  disabled value={this.state.city}  style={[styles.input , { height:30 , lineHeight:23 , top:0}]}  />
                                            </Item>
                                            <Image source={require('../../assets/images/map_marker_white.png')} style={styles.regMarker} resizeMode={'contain'} />
                                        </View>

                                        <View style={[ styles.inputMarginTop ,styles.directionRow]}>
                                            <CheckBox checked={true} color={'transparent'} style={styles.checkBox} />
                                            <Text style={styles.agreeText}>{ i18n.t('agreeTo') } <Text  style={styles.termsText}>{ i18n.t('terms') }</Text></Text>
                                        </View>

                                        <View style={styles.loginBtnContainer}>
                                            { this.renderSubmit() }
                                        </View>
                                    </Form>
                                </KeyboardAvoidingView>

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
                            </View>
                        </View>
                </Content>
            </Container>
        );
    }
}

export default Register;