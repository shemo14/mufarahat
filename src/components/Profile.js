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


class Profile extends Component {
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
                        <Text style={[styles.headerText , {top:15}]}>{ i18n.t('profile') }</Text>
                        <Button onPress={() => this.props.navigation.navigate('cart')} transparent  style={styles.headerBtn}>
                            <Image source={require('../../assets/images/shopping_cart.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={{ flexGrow: 1 }} style={[styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_blue.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={styles.profileImgParent}>
                            <Image source={require('../../assets/images/profile.png')} style={[styles.profileImg]} resizeMode={'cover'} />
                        </View>

                        <View style={{justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
                            <Text style={[styles.type ,{color:COLORS.boldgray , fontFamily: I18nManager.isRTL ? 'cairoBold' : 'openSansBold'}]}>اسم المستخدم بالكامل</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')} style={{flexDirection:'row' , justifyContent:'center' , alignItems:'center'}}>
                                <Image source={require('../../assets/images/edit_profile.png')} style={[styles.headerMenu , styles.transform , {marginRight:7}]} resizeMode={'contain'} />
                                <Text style={[styles.type ,{color:COLORS.darkRed , marginVertical:10}]}>تعديل الملف الشخصي</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.line , {borderColor:'#cfcfcf'}]}/>

                        <View style={{flexDirection:'row' , paddingHorizontal:20}}>
                            <Image source={require('../../assets/images/smartphone.png')} style={[styles.headerMenu , {marginRight:10}]} resizeMode={'contain'} />
                            <Text style={[styles.type ,{color:COLORS.mediumgray}]}>12365478945</Text>
                        </View>

                        <View style={{flexDirection:'row' , paddingHorizontal:20 , marginTop:15}}>
                            <Image source={require('../../assets/images/marker_gray.png')} style={[styles.headerMenu , {marginRight:10}]} resizeMode={'contain'} />
                            <Text style={[styles.type ,{color:COLORS.mediumgray}]}>الرياض - جدة</Text>
                        </View>

                        <View style={[styles.line , {borderColor:'#cfcfcf'}]}/>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('changeOldPass')} style={{flexDirection:'row' , justifyContent:'center' , alignItems:'center' ,alignSelf:'center'}}>
                            <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>تغيير كلمة المرور</Text>
                        </TouchableOpacity>

                    </ImageBackground>
                </Content>

                <FooterSection routeName={'profile'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default Profile;