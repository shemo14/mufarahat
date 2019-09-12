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
    Picker, Textarea
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class PaymentSteps extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            disCode:'',
            selectedCountry: null,
            selectedRegion: null,
            selectedPayment: null,
            selectedPacking: null,
            msg:'',
            name:'',
            user:'',
            location: '',
            isModalVisible: false,
            city: '',
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
            isSwiped: false
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });

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

    nextBtn(){
        if (this.state.isSwiped){
            return <Text style={[styles.loginBtn , styles.btnTxt ,{lineHeight:45 , width:120 , textAlign: 'center'}]}>{ i18n.t('next') }</Text>
        }


        return <Text />
    }

    render() {
        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('finishOrder') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                        <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue.png') : require('../../assets/images/bg_blue2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                            <View style={[styles.finishOrder]}>
                                <Swiper scrollEnabled={false} horizontal={true} dotStyle={styles.orderdoteStyle} activeDotStyle={styles.orderactiveDot}
                                        containerStyle={{width:'100%'}} showsButtons={true}
                                        buttonWrapperStyle={[styles.directionRowCenter , { position:'absolute' , top:'37%' }]}
                                        prevButton={<Text></Text>}
                                        nextButton={this.nextBtn()}
                                        loop={false} autoplay={false}
                                >
                                    <View style={styles.directionColumn}>
                                        <KeyboardAvoidingView behavior={'padding'} style={styles.w100}>
                                        <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('fullOrderCost') } : </Text>
                                            <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                        </View>
                                        <View style={[styles.line , {marginVertical:0}]}/>

                                        <View style={[styles.pv20 , styles.ph10 ,{ alignItems:'center'}]}>
                                            <Image source={require('../../assets/images/pic_promocode.png')} resizeMode={'contain'} style={styles.paymentImg} />
                                            <View style={[styles.itemView ,{borderColor: COLORS.mediumgray , width:'90%'}]}>
                                                <Item floatingLabel style={[styles.loginItem,{width:'100%'}]} bordered>
                                                    <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15 , left:12}]}>{ i18n.t('disCode') }</Label>
                                                    <Input onChangeText={(disCode) => this.setState({disCode})} keyboardType={'number-pad'} style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                                </Item>
                                            </View>

                                        </View>
                                        { !this.state.isSwiped ?
                                                <Button disabled style={[styles.loginBtn ,{marginTop:85 , width:120, backgroundColor:'#eee' }]}>
                                                    <Text style={styles.btnTxt}>{ i18n.t('next') }</Text>
                                                </Button>
                                             : <Text />
                                        }
                                        </KeyboardAvoidingView>
                                    </View>
                                    <View style={styles.directionColumn}>

                                        <KeyboardAvoidingView behavior={'padding'} style={styles.w100}>
                                        <ScrollView>

                                            <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('fullOrderCost') } : </Text>
                                                <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                            </View>

                                            <View style={[styles.line , {marginVertical:0}]}/>

                                            <View style={[ styles.pv10 ,styles.ph25]}>
                                                <Text style={[styles.type , styles.aSFS ,{color:COLORS.labelBackground}]}>{ i18n.t('deliveryPlace') }</Text>
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
                                                            <Picker.Item label={'الرياض'} value={"1"} />
                                                            <Picker.Item label={'الامارات'} value={"2"} />
                                                            <Picker.Item label={'مصر'} value={"3"} />
                                                        </Picker>
                                                        <Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                                    </Item>
                                                </View>
                                                <View>
                                                    <Item style={styles.itemPicker} regular >
                                                        <Label style={[styles.labelItem , {top:-18 , left:15 , position:'absolute'}]}>{ i18n.t('region') }</Label>
                                                        <Picker
                                                            mode="dropdown"
                                                            style={styles.picker}
                                                            placeholderStyle={{ color: "#acabae" }}
                                                            placeholderIconColor="#acabae"
                                                            selectedValue={this.state.selectedRegion}
                                                            onValueChange={(value) => this.setState({ selectedRegion: value })}
                                                        >
                                                            <Picker.Item label={ i18n.t('selectRegion') } value={null} />
                                                            <Picker.Item label={'المنصوره'} value={"1"} />
                                                            <Picker.Item label={'القاهره'} value={"2"} />
                                                        </Picker>
                                                        <Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                                    </Item>
                                                </View>
                                                <Text style={[styles.type , styles.aSFS ,{color:COLORS.labelBackground , marginTop:15}]}>{ i18n.t('additionalOrders') }</Text>
                                                <View>
                                                    <Item style={styles.itemPicker} regular >
                                                        <Label style={[styles.labelItem , {top:-18 , left:15 , position:'absolute'}]}>{ i18n.t('packingMethod') }</Label>
                                                        <Picker
                                                            mode="dropdown"
                                                            style={styles.picker}
                                                            placeholderStyle={{ color: "#acabae" }}
                                                            placeholderIconColor="#acabae"
                                                            selectedValue={this.state.selectedPacking}
                                                            onValueChange={(value) => this.setState({ selectedPacking: value })}
                                                        >
                                                            <Picker.Item label={ i18n.t('chooseMethod') } value={null} />
                                                            <Picker.Item label={'1 الطريقة'} value={"1"} />
                                                            <Picker.Item label={'2 الطريقة'} value={"2"} />
                                                            <Picker.Item label={'3 الطريقة'} value={"3"} />
                                                        </Picker>
                                                        <Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                                    </Item>
                                                </View>
                                                <View >
                                                    <Label style={[styles.labelItem , {top:8 , left:20 , zIndex:1}]}>{ i18n.t('moreDetails') }</Label>
                                                    <Textarea
                                                        placeholder={ i18n.t('howToPack') }
                                                        value={this.state.msg} onChangeText={(msg) => this.setState({msg})}
                                                        autoCapitalize='none'
                                                        style={[styles.textArea]}
                                                        placeholderTextColor={COLORS.mediumgray}
                                                    />
                                                </View>
                                            </View>
                                        </ScrollView>
                                        </KeyboardAvoidingView>
                                    </View>
                                    <View style={{flexDirection:'column'}}>

                                        <KeyboardAvoidingView behavior={'padding'} style={styles.w100}>
                                        <ScrollView>

                                            <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('fullOrderCost') } : </Text>
                                                <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                            </View>
                                            <View style={[styles.line , {marginVertical:0}]}/>
                                            <View style={[styles.tklfa , { borderColor:COLORS.purpleBorder}]}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>{ i18n.t('deliveryPrice') } : </Text>
                                                <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                            </View>
                                            <View style={[styles.line , {marginVertical:0}]}/>

                                            <View style={{paddingVertical:10 , paddingHorizontal:25 }}>
                                                <Text style={[styles.type , styles.aSFS ,{color:COLORS.labelBackground}]}>{ i18n.t('basicInfo') }</Text>
                                                <View style={[styles.itemView ,{borderColor: COLORS.mediumgray , marginTop:25 }]}>
                                                    <Item floatingLabel style={[styles.loginItem,{width:'100%'}]} bordered>
                                                        <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15 , left:12}]}>{ i18n.t('name') }</Label>
                                                        <Input onChangeText={(name) => this.setState({name})} autoCapitalize='none' style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                                    </Item>
                                                </View>
                                                <View style={[styles.itemView ,{borderColor: COLORS.mediumgray , marginTop:25 }]}>
                                                    <Item floatingLabel style={[styles.loginItem,{width:'100%'}]} bordered>
                                                        <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15 , left:12}]}>{ i18n.t('phoneNumber') }</Label>
                                                        <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                                    </Item>
                                                </View>
                                                <View onPress={() =>this._toggleModal()} style={[ styles.itemView , {borderColor: COLORS.mediumgray , marginTop:25} ]}>
                                                    <Item floatingLabel style={[styles.loginItem ,{width:'100%'}]} bordered onPress={() =>this._toggleModal()}>
                                                        <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15 , left:12}]}>{ i18n.t('deliveryPlace') }</Label>
                                                        <Input autoCapitalize='none'  disabled value={this.state.city}  style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                                    </Item>
                                                    <Image onPress={() =>this._toggleModal()} source={require('../../assets/images/marker_gray.png')} style={{width:20 , height:20 , position:'absolute' , right:5 , zIndex:1 , top:'40%'}} resizeMode={'contain'} />
                                                </View>
                                                <View>
                                                    <Item style={styles.itemPicker} regular >
                                                        <Label style={[styles.labelItem , {top:-18 , left:15 , position:'absolute'}]}>{ i18n.t('paymentMethod') }</Label>
                                                        <Picker
                                                            mode="dropdown"
                                                            style={styles.picker}
                                                            placeholderStyle={{ color: "#acabae" }}
                                                            placeholderIconColor="#acabae"
                                                            selectedValue={this.state.selectedPayment}
                                                            onValueChange={(value) => this.setState({ selectedPayment: value })}
                                                        >
                                                            <Picker.Item label={ i18n.t('chooseMethod') } value={null} />
                                                            <Picker.Item label={ i18n.t('mada') } value={"1"} />
                                                            <Picker.Item label={ i18n.t('Visa') } value={"2"} />
                                                            <Picker.Item label={ i18n.t('uponReceipt') } value={"3"} />
                                                            <Picker.Item label={ i18n.t('applePay') } value={"4"} />
                                                        </Picker>
                                                        <Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                                    </Item>
                                                </View>
                                                <Button onPress={() => this.props.navigation.navigate('payment')} style={[styles.loginBtn ,{marginTop:85 , width:180 }]}>
                                                    <Text style={styles.btnTxt}>{ i18n.t('completionOfOrder') }</Text>
                                                </Button>
                                            </View>
                                        </ScrollView>
                                        </KeyboardAvoidingView>
                                    </View>
                                </Swiper>
                                <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                                    <View style={[styles.modalStyle , styles.p10 ]}>
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
                                        <Button onPress={() => this.confirmLocation()} style={[styles.loginBtn , styles.mt10]}>
                                            <Text style={styles.btnTxt}>{ i18n.t('confirm') }</Text>
                                        </Button>
                                    </View>
                                </Modal>
                            </View>
                        </ImageBackground>
                </Content>

            </Container>

        );
    }
}

export default PaymentSteps;