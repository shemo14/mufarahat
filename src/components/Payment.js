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
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input, Form, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import DateTimePicker from "react-native-modal-datetime-picker";
import * as Animatable from 'react-native-animatable';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class Payment extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            name:'',
            cardNumber:'',
            reNewPass:'',
            date: '',
            isDatePickerVisible: false,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        this.setState({ date : formatted_date });

        this.hideDatePicker();
    };

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
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('payment') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                        <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue.png') : require('../../assets/images/bg_blue2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                            <View style={[styles.loginFormContainerStyle , styles.whiteBg]}>
                                <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                    <Form style={styles.whiteForm }>
                                        <ScrollView>
                                            <View style={styles.ph10}>
                                                <Text style={[styles.type ,{color:COLORS.mediumgray , alignSelf:'center'}]}>{ i18n.t('paymentDet') }</Text>
                                                <Animatable.View animation="zoomIn" duration={1000} style={[styles.itemView  , styles.inputMarginTop  ,{borderColor: COLORS.mediumgray}]}>
                                                    <Item floatingLabel style={[styles.loginItem,{width:'100%'}]} bordered>
                                                        <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15}]}>{ i18n.t('cardHolder') }</Label>
                                                        <Input onChangeText={(name) => this.setState({name})} autoCapitalize='none'  style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                                    </Item>
                                                </Animatable.View>
                                                <Animatable.View animation="zoomIn" duration={1400} style={[styles.itemView  , styles.inputMarginTop  ,{borderColor: COLORS.mediumgray}]}>
                                                    <Item floatingLabel style={[styles.loginItem,{width:'100%'}]} bordered>
                                                        <Label style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:15}]}>{ i18n.t('cardNumber') }</Label>
                                                        <Input onChangeText={(cardNumber) => this.setState({cardNumber})} keyboardType={'number-pad'}  style={[styles.input ,{color:COLORS.mediumgray}]}  />
                                                    </Item>
                                                </Animatable.View>

                                                <Animatable.View animation="zoomIn" duration={1800} onPress={this.showDatePicker} style={[styles.itemView  , styles.inputMarginTop  ,{borderColor: COLORS.mediumgray}]}>
                                                    <Item floatingLabel style={[styles.loginItem ,styles.w100 , styles.flex1,{ height:50 , top:0}]} onPress={this.showDatePicker} bordered>
                                                        <Label onPress={this.showDatePicker} style={[styles.label , {backgroundColor: '#fff' , color:COLORS.mediumgray , top:-5}]}>{ i18n.t('date') }</Label>
                                                        <Input onPress={this.showDatePicker} disabled value={this.state.date.toString()} auto-capitalization={false}  style={[styles.input ,{color:COLORS.mediumgray , height:30, lineHeight:30 , top:0 , zIndex:-1}]} />
                                                    </Item>
                                                    <DateTimePicker
                                                        isVisible={this.state.isDatePickerVisible}
                                                        onConfirm={this.handleDatePicked}
                                                        onCancel={this.hideDatePicker}
                                                        mode={'date'}
                                                    />
                                                </Animatable.View>
                                            </View>
                                        </ScrollView>

                                        <Text style={[styles.type ,{color:COLORS.labelBackground , alignSelf:'center'}]}>{ i18n.t('ready') }</Text>
                                        <Animatable.View animation="flash" duration={2200}>
                                            <Button  style={[styles.loginBtn ,styles.btnWidth]}>
                                                <Text style={styles.btnTxt}>{ i18n.t('completeOrder') }</Text>
                                            </Button>
                                        </Animatable.View>

                                    </Form>
                                </KeyboardAvoidingView>
                            </View>
                        </ImageBackground>
                </Content>

            </Container>

        );
    }
}

export default Payment;