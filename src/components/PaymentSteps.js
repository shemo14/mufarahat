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
                <Header style={[styles.header , {marginTop:Platform.OS === 'ios' ? 10 : 40}]} noShadow>
                    <Animated.View style={[styles.headerView , { backgroundColor: backgroundColor, height: 80 , marginTop:-50 , alignItems:'center'}]}>
                        <Right style={{flex:0 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , {top:10  , right:15}]}>{ i18n.t('finishOrder') }</Text>
                        <Left style={{flex:0 , backgroundColor:'#000'}}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                        <ImageBackground source={require('../../assets/images/bg_blue.png')} resizeMode={'cover'} style={styles.imageBackground}>
                            <View style={[styles.finishOrder]}>
                                <Swiper scrollEnabled={false} horizontal={true} dotStyle={styles.orderdoteStyle} activeDotStyle={styles.orderactiveDot}
                                        containerStyle={{width:'100%'}} showsButtons={true}
                                        buttonWrapperStyle={[styles.directionRowCenter , { position:'absolute' , top:'37%' }]}
                                        prevButton={<Text></Text>}
                                        nextButton={this.nextBtn()}
                                        loop={false} autoplay={false}
                                >
                                    <View style={{flexDirection:'column'}}>
                                        <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                                            <Text style={[styles.type ,{color:COLORS.boldgray}]}>تكلفة الطلبية كاملة : </Text>
                                            <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                        </View>
                                        <View style={[styles.line , {marginVertical:0}]}/>

                                        <View style={{paddingVertical:20 , paddingHorizontal:10 , alignItems:'center'}}>
                                            <Image source={require('../../assets/images/pic_promocode.png')} resizeMode={'contain'} style={{width:'100%' , height:200 , marginBottom:45}} />
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
                                    </View>
                                    <View style={{flexDirection:'column'}}>
                                        <ScrollView>

                                            <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>تكلفة الطلبية كاملة : </Text>
                                                <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                            </View>
                                            <View style={[styles.line , {marginVertical:0}]}/>

                                            <View style={{paddingVertical:10 , paddingHorizontal:25 }}>
                                                <Text style={[styles.type ,{color:COLORS.labelBackground}]}>مكان توصيل الطلب</Text>
                                                <View>
                                                    <Item style={styles.itemPicker} regular >
                                                        <Label style={[styles.labelItem , {top:-18 , left:15 , position:'absolute'}]}>{ i18n.t('city') }</Label>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="arrow-down" />}
                                                            style={styles.picker}
                                                            placeholderStyle={{ color: "#acabae" }}
                                                            placeholderIconColor="#acabae"
                                                            selectedValue={this.state.selectedCountry}
                                                            onValueChange={(value) => this.setState({ selectedCountry: value })}
                                                        >
                                                            <Picker.Item label={'اختر المدينة'} value={null} />
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
                                                            iosIcon={<Icon name="arrow-down" />}
                                                            style={styles.picker}
                                                            placeholderStyle={{ color: "#acabae" }}
                                                            placeholderIconColor="#acabae"
                                                            selectedValue={this.state.selectedRegion}
                                                            onValueChange={(value) => this.setState({ selectedRegion: value })}
                                                        >
                                                            <Picker.Item label={'اختر المنطقة'} value={null} />
                                                            <Picker.Item label={'المنصوره'} value={"1"} />
                                                            <Picker.Item label={'القاهره'} value={"2"} />
                                                        </Picker>
                                                        <Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                                    </Item>
                                                </View>
                                                <Text style={[styles.type ,{color:COLORS.labelBackground , marginTop:15}]}>طلبات اضافية</Text>
                                                <View>
                                                    <Item style={styles.itemPicker} regular >
                                                        <Label style={[styles.labelItem , {top:-18 , left:15 , position:'absolute'}]}>{ i18n.t('packingMethod') }</Label>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="arrow-down" />}
                                                            style={styles.picker}
                                                            placeholderStyle={{ color: "#acabae" }}
                                                            placeholderIconColor="#acabae"
                                                            selectedValue={this.state.selectedPacking}
                                                            onValueChange={(value) => this.setState({ selectedPacking: value })}
                                                        >
                                                            <Picker.Item label={'اختر الطريقة المناسبة'} value={null} />
                                                            <Picker.Item label={'1 الطريقة'} value={"1"} />
                                                            <Picker.Item label={'2 الطريقة'} value={"2"} />
                                                            <Picker.Item label={'3 الطريقة'} value={"3"} />
                                                        </Picker>
                                                        <Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                                    </Item>
                                                </View>
                                                <View >
                                                    <Label style={[styles.labelItem , {top:8 , left:20 , zIndex:1}]}>تفاصيل اكثر</Label>
                                                    <Textarea
                                                        placeholder={'ادخل وصف بالتفصيل بالطريقة المراد التغليف بها'}
                                                        value={this.state.msg} onChangeText={(msg) => this.setState({msg})}
                                                        autoCapitalize='none'
                                                        style={[styles.textArea]}
                                                        placeholderTextColor={COLORS.mediumgray}
                                                    />
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={{flexDirection:'column'}}>
                                        <ScrollView>

                                            <View style={[styles.tklfa , { borderColor:COLORS.yellowBorder}]}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>تكلفة الطلبية كاملة : </Text>
                                                <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                            </View>
                                            <View style={[styles.line , {marginVertical:0}]}/>
                                            <View style={[styles.tklfa , { borderColor:COLORS.purpleBorder}]}>
                                                <Text style={[styles.type ,{color:COLORS.boldgray}]}>سعر التوصيل : </Text>
                                                <Text style={[styles.type ,{color:COLORS.darkRed}]}>116</Text>
                                            </View>
                                            <View style={[styles.line , {marginVertical:0}]}/>

                                            <View style={{paddingVertical:10 , paddingHorizontal:25 }}>
                                                <Text style={[styles.type ,{color:COLORS.labelBackground}]}>معلومات اساسية</Text>
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
                                                <View style={[ styles.itemView , {borderColor: COLORS.mediumgray , marginTop:25} ]}>
                                                    <Item floatingLabel style={[styles.loginItem ,{width:'100%'}]} bordered onPress={() =>this._toggleModal()}>
                                                        <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15 , left:12}]}>مكان التسليم</Label>
                                                        <Input autoCapitalize='none'  disabled value={this.state.city}  style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                                    </Item>
                                                    <Image source={require('../../assets/images/marker_gray.png')} style={{width:20 , height:20 , position:'absolute' , right:5 , zIndex:1 , top:'40%'}} resizeMode={'contain'} />
                                                </View>
                                                <View>
                                                    <Item style={styles.itemPicker} regular >
                                                        <Label style={[styles.labelItem , {top:-18 , left:15 , position:'absolute'}]}>{ i18n.t('paymentMethod') }</Label>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="arrow-down" />}
                                                            style={styles.picker}
                                                            placeholderStyle={{ color: "#acabae" }}
                                                            placeholderIconColor="#acabae"
                                                            selectedValue={this.state.selectedPayment}
                                                            onValueChange={(value) => this.setState({ selectedPayment: value })}
                                                        >
                                                            <Picker.Item label={'اختر الطريقة المناسبة'} value={null} />
                                                            <Picker.Item label={'مدي'} value={"1"} />
                                                            <Picker.Item label={'فيزا'} value={"2"} />
                                                            <Picker.Item label={'عند الاستلام'} value={"3"} />
                                                            <Picker.Item label={'دفع أبل'} value={"4"} />
                                                        </Picker>
                                                        <Image source={require('../../assets/images/right_arrow_drop.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                                    </Item>
                                                </View>
                                                <Button onPress={() => this.props.navigation.navigate('payment')} style={[styles.loginBtn ,{marginTop:85 , width:180 }]}>
                                                    <Text style={styles.btnTxt}>اتمام الطلب</Text>
                                                </Button>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </Swiper>
                                <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                                    <View style={[styles.modalStyle , {padding:10}]}>
                                        {
                                            !this.state.initMap ? (
                                                <MapView
                                                    style={{ flex: 1 , width:'100%' , height:350 }}
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
                                                        <Image source={require('../../assets/images/location_map.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }}/>
                                                    </MapView.Marker>
                                                </MapView>
                                            ) : (<View />)
                                        }
                                        <Button onPress={() => this.confirmLocation()} style={[styles.loginBtn ,{marginTop:10}]}>
                                            <Text style={styles.btnTxt}>{ i18n.t('confirm') }</Text>
                                        </Button>
                                    </View>
                                </Modal>
                            </View>
                        </ImageBackground>
                    </KeyboardAvoidingView>
                </Content>

            </Container>

        );
    }
}

export default PaymentSteps;