import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Linking, Platform, Dimensions, ImageBackground, Animated,Switch} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Right, Item, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class Settings extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            value:0,
            SwitchOnValueHolder:false,
            language:null
        }
    }



    static navigationOptions = () => ({
        drawerLabel: i18n.t('settings') ,
        drawerIcon: (<Image source={require('../../assets/images/settings.png')} style={{ height: 20, width: 20 }} resizeMode={'contain'} /> )
    })

    stopNotification = (value) =>{
        this.setState({  SwitchOnValueHolder:!this.state.SwitchOnValueHolder})
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

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });
        return (
            <Container>
                <Header style={[styles.header , {marginTop:Platform.OS === 'ios' ? 10 : 40}]} noShadow>
                    <Animated.View style={[styles.headerView , { backgroundColor: backgroundColor, height: 80 , marginTop:-50 , alignItems:'center'}]}>
                        <Right style={{flex:0 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('drawerNavigator')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/cancel.png')} style={styles.headerMenu} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , {top:10  , right:15}]}>{ i18n.t('settings') }</Text>
                        <Left style={{flex:0 , backgroundColor:'#000'}}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/setting_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.curvedImg]}>
                            <Image source={require('../../assets/images/setting_pic.png')} style={[styles.swiperimageEvent , { borderBottomLeftRadius:0}]} resizeMode={'cover'} />
                            <View style={styles.overBg}/>
                        </View>
                        <View style={{padding:20}}>
                            <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                                <Text style={[styles.type ,{color:COLORS.mediumgray  , fontSize:16 }]}>{ i18n.t('notifications') }</Text>
                                <Switch
                                    onValueChange={(value) => this.stopNotification(value)}
                                    value={this.state.SwitchOnValueHolder}
                                    onTintColor={COLORS.mediumgray}
                                    thumbTintColor={COLORS.labelBackground}
                                    tintColor={'#c5c5c5'}
                                />
                            </View>

                            <View style={[styles.line , {borderColor:'#cfcfcf'}]}/>
                            <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
                                <Text style={[styles.type ,{color:COLORS.mediumgray  , fontSize:16 , position:'absolute' , backgroundColor:'#fff' , zIndex:1 , width:'92.5%' }]}>{ i18n.t('languageSettings') }</Text>
                                <Item style={[styles.catPicker ]} regular >
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={styles.pickerLabel}
                                        placeholderStyle={{ color: "#acabae" }}
                                        placeholderIconColor="#acabae"
                                        selectedValue={this.state.language}
                                        onValueChange={(value) => this.setState({ language: value })}
                                    >
                                        <Picker.Item label={'العربية'} value={"1"} />
                                        <Picker.Item label={'English'} value={"2"} />
                                    </Picker>
                                    <Image source={require('../../assets/images/right_arrow_drop.png')}  style={{right:5,width:20 , height:20}} resizeMode={'contain'} />
                                </Item>
                            </View>

                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('login')} style={styles.delAcc}>
                                <Text style={[styles.type ,{color:'#ff3c3c'}]}>حذف الحساب</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default Settings;