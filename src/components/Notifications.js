import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import FooterSection from './FooterSection';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class Notifications extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });


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
                        <Button transparent onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu , styles.transform]} resizeMode={'contain'} />
                        </Button>
                        <Text style={[styles.headerText , {top:15}]}>{ i18n.t('notifications') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_blue_big.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={{marginTop:90 , paddingHorizontal:25}}>
                            <Text style={[styles.type , {marginBottom:20}]}>سيتم ارسال اشعارات من اداره التطبيق او من الادمن عند قبول الطلب</Text>

                            <View style={styles.notiBlock}>
                                <View style={styles.notiBorder}/>
                                <View style={[styles.directionRowSpace , {marginBottom:5}]}>
                                    <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>تنبيه من الاداره</Text>
                                    <TouchableOpacity >
                                        <Image source={require('../../assets/images/error.png')} style={styles.error} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.type ,{color:COLORS.mediumgray , lineHeight:22}]}>التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف </Text>
                            </View>
                            <View style={styles.notiBlock}>
                                <View style={styles.notiBorder}/>
                                <View style={[styles.directionRowSpace , {marginBottom:5}]}>
                                    <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>تنبيه من الاداره</Text>
                                    <TouchableOpacity >
                                        <Image source={require('../../assets/images/error.png')} style={styles.error} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.type ,{color:COLORS.mediumgray , lineHeight:22}]}>التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف </Text>
                            </View>
                            <View style={styles.notiBlock}>
                                <View style={styles.notiBorder}/>
                                <View style={[styles.directionRowSpace , {marginBottom:5}]}>
                                    <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>تنبيه من الاداره</Text>
                                    <TouchableOpacity >
                                        <Image source={require('../../assets/images/error.png')} style={styles.error} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.type ,{color:COLORS.mediumgray , lineHeight:22}]}>التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف </Text>
                            </View>
                            <View style={styles.notiBlock}>
                                <View style={styles.notiBorder}/>
                                <View style={[styles.directionRowSpace , {marginBottom:5}]}>
                                    <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>تنبيه من الاداره</Text>
                                    <TouchableOpacity >
                                        <Image source={require('../../assets/images/error.png')} style={styles.error} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.type ,{color:COLORS.mediumgray , lineHeight:22}]}>التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف </Text>
                            </View>
                            <View style={styles.notiBlock}>
                                <View style={styles.notiBorder}/>
                                <View style={[styles.directionRowSpace , {marginBottom:5}]}>
                                    <Text style={[styles.termsText , {color:COLORS.boldgray , fontSize:14}]}>تنبيه من الاداره</Text>
                                    <TouchableOpacity >
                                        <Image source={require('../../assets/images/error.png')} style={styles.error} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.type ,{color:COLORS.mediumgray , lineHeight:22}]}>التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف التصنيف </Text>
                            </View>

                        </View>
                    </ImageBackground>
                </Content>

                <FooterSection routeName={'notifications'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default Notifications;